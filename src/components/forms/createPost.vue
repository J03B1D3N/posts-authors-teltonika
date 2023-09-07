<template>
<div class="form" >
    <div>
        <label for="title">Title:</label>
        <input type="text" v-model="title" id="title" name="title" required>
    </div>
    <div>
        <label for="author">Choose the author:</label>
        <select name="author" id="author" v-model="author" required>
            <option :value="author.name"  v-for="author in authors" :key="author.id">{{author.name}}</option>
        </select>
    </div>
    <div>
        <label for="body">What would you like to say:</label>
        <textarea name="body" id="body" cols="30" rows="10" v-model="body" required></textarea>
    </div>
    <div class="btns">
        <button class="submit" @click="handleSubmit">submit</button>
        <button class="cancel" @click="handleCancel">Cancel</button>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import uniqid from "uniqid"
export default {
    data() {
        return {
            title: "",
            author: "",
            body: "",
        }
    },
computed: {
    ...mapGetters(["authors", "getAuthorIdByName", "posts"])
},
methods: {
    ...mapActions(["modalToggle","createNewPost", "getPosts"]),
    created_at() {
                const date = new Date()
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const year = date.getFullYear()
                return `${year}-${month}-${day}`
    },
    
  async handleSubmit() {
      if(this.title.length === 0){
        alert("Please enter a Title")
        return
      }
      if(this.author.length === 0){
        alert("Please select an Author")
                return

      }
      if(this.body.length === 0){
        alert("Please write a few sentences in the Post")
                return

      }
        const obj = {
            id: uniqid(),
            authorId: await this.getAuthorIdByName(this.author),
            title: this.title,
            body: this.body,
            created_at: this.created_at(),
            updated_at: this.created_at()
        }

      await this.createNewPost(obj)
      
    },
    handleCancel(e) {
        e.preventDefault()
        this.modalToggle()
    }
}
}
</script>

<style scoped>
.form {
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: 2px solid black;
  padding: 1rem;
  gap: 0.5rem;
  background-color: whitesmoke;
  cursor: default;
}
.cancel:hover {
    cursor: pointer;
    background-color: rgb(255, 35, 35);
}
.cancel {
    background-color: rgb(255, 96, 96);
}
.submit {
    background-color: rgb(57, 240, 57);
}
.submit:hover {
    background-color: rgb(34, 177, 34);
    cursor: pointer;
}
div {
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>