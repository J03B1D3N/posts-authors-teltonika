<template>
    <div class="form">
        <div class="title">
            <h2 for="title">Title:</h2> 
            <input type="text" name="title" id="title" v-model="title" required>
        </div>
        <div class="author">
          <h2>Author:</h2>
          <h2>{{getAuthorNameById(postDetail.authorId)}}</h2>
        </div>
        <div class="content">
            <h2 for="content">Content:</h2>
            <textarea type="text" name="content" id="body" v-model="body" required/>
        </div>
        <div class="btns">
          <button class="save" @click="handleSave">SAVE</button>
          <button class="cancel" @click="handleCancel">CANCEL</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";


export default {

computed: {
      ...mapGetters(['postDetail', 'getAuthorNameById', "posts"]),
},
data() {
  return {
    title: "",
    body: "",
  }
},
methods: {
    ...mapActions(['updatePosts', "modalToggle", "setPosts", "setPostDetail", "setNotificationStatus","setNotificationColor", "setNotificationMsg"]),
  updated_at () {
       const date = new Date()
       const month = String(date.getMonth() + 1).padStart(2, '0');
       const day = String(date.getDate()).padStart(2, '0');
       const year = date.getFullYear()
    return `${year}-${month}-${day}`
  },
  
  createObj() {
    return {
        title: this.title,
        authorId: this.postDetail.authorId,
        id: this.postDetail.id,
        body: this.body,
        created_at: this.postDetail.created_at,
        updated_at: this.updated_at()
      }
  },
  async handleSave(e) {
     if(this.title.length === 0){
        alert("Please enter a Title")
        return
      }
      if(this.body.length === 0){
        alert("Please write a few sentences in the Post")
                return

      }
      const obj = this.createObj()
      await this.updatePosts(obj)
      this.$router.push(`/`)
    },

    handleCancel() {
      this.modalToggle()
    },
    
},

created() {
    this.title = this.postDetail.title
    this.body = this.postDetail.body
}
}
</script>

<style scoped>
.editWindow {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title input {
  width: 100%;
}
.title {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.btns {
  width: 100%;
}
.cancel:hover {
    cursor: pointer;
    background-color: rgb(255, 35, 35);
}
.cancel {
    background-color: rgb(255, 96, 96);
}
.save {
    background-color: rgb(57, 240, 57);
}
.save:hover {
    background-color: rgb(34, 177, 34);
    cursor: pointer;
}
.form div {
  display: flex;
  flex-direction: column;
}
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
textarea {
  height: 10rem;
}
.content {
  width: 100%;
}
h2 {
  margin: 7px;
}

</style>