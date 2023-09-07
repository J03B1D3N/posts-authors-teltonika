<template>
  <div class="wrapper">
    <div class="postDetail">
      <h1 class="title">
        {{ postDetail.title}}
      </h1>
    
      <h2 class="author">
        {{ getAuthorNameById(postDetail.authorId) }}

      </h2>
      <h3 class="content">
        {{postDetail.body}}
      </h3>
      <h4 class="date">
        <div class="lastUpdatedAt">last updated at {{laterDate(postDetail)}}</div>
        
      </h4>
       <div class="edit-delete">
            <button class="edit" @click="handleEdit">EDIT</button>
            

            <button class="delete" @click="handleDelete">DELETE</button>
        </div>
    </div>
  <ModalVue v-if="modalStatus"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ModalVue from '../components/Modal.vue';

export default {
   beforeRouteLeave(to, from, next) {
    this.setCurrentComponent("")
    next()
  },
  components: {
    ModalVue
  },
  computed: {
    ...mapGetters(['postDetail', 'getAuthorNameById', 'modalStatus']),

  },
  methods: {

    ...mapActions(["modalToggle", "getPost", "setCurrentComponent", "setConfirmationMsg", "setConfirmationMsgStatus"]),

    handleEdit() {
      this.modalToggle();
      this.setCurrentComponent("Edit")
    },
    handleDelete() {
            this.setConfirmationMsg({
                msg: "Do you really want to delete this post?",
                post: this.postDetail
            })
            this.setConfirmationMsgStatus(true)
        },
    
   
    laterDate: function(post) {
            const date1 = new Date(post.created_at).getTime()
            const date2 = new Date(post.updated_at).getTime()
                if (date1 < date2) {
                return post.updated_at
            } else if (date1 > date2) {
                return post.created_at
            } else {
                return post.created_at
            }
        },
  },
  async created() {
    await this.getPost(this.$route.params.id)
  }
}
</script>

<style scoped>
.edit:hover {
    background-color: rgb(199, 199, 199);
    cursor: pointer;
}
.delete:hover {
    cursor: pointer;
    background-color: rgb(255, 35, 35);
}
.delete {
    background-color: rgb(255, 96, 96);
}
.edit, .delete {
    font-size: 1.5rem;
    border: 2px solid black;
}
.edit-delete {
    display: flex;
    justify-content: space-around;
    margin: 1rem;
    gap: 5rem;

}
.content {
  word-break: break-all;
  overflow-y: auto;
  width: 80%;
  height: 20rem;
}
.wrapper {
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.postDetail {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  border: 2px solid black;
  width: 80%;
  height: 80%;
}
.date{
  display: flex;
  flex-direction: column;
}
.lastUpdatedAt {
  font-size: 0.8rem;
}

</style>