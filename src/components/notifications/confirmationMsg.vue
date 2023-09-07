<template>

  <div class="wrapper" @click="handleClick">
    <div class="confirmationMessage" ref="excludeDiv">
      <h1 >
        {{getConfirmationMsg.msg}}
      </h1>
      <div class="title">
        {{getConfirmationMsg.post.title}}
      </div>
      <div class="author">
        {{ getAuthorNameById(getConfirmationMsg.post.authorId)}}
      </div>
      <div class="btns">
        <button class="yes" @click="confirm">Yes</button>
        <button class="cancel" @click="cancel">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getConfirmationMsg', "getAuthorNameById"])
  },
  methods: {
    ...mapActions(["deletePost", "setConfirmationMsgStatus", "setConfirmationMsg"]),
    
    handleClick(event) {
      if (!this.$refs.excludeDiv.contains(event.target)) {
        this.setConfirmationMsgStatus(false)
      }
    },
    
    async confirm() {
      await this.deletePost(this.getConfirmationMsg.post)
      this.$router.push('/')
    },
    
    cancel() {
      this.setConfirmationMsgStatus(false)
      this.setConfirmationMsg({})
    }
  }
}

</script>

<style scoped>
.wrapper {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: rgb(82, 72, 72, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.confirmationMessage {
  border: 3px solid black;
  background-color: white;
  padding: 1rem;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: rgb(255, 199, 199);
  cursor: default;
}
button {
  font-size: 1rem;
}
.btns {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.yes {
  background-color: rgb(87, 224, 87);
}
.yes:hover {
  background-color: rgb(88, 192, 88);
  cursor: pointer;
}
.cancel {
  background-color: rgb(255, 96, 96);
}
.cancel:hover {
  background-color: rgb(212, 52, 52);
  cursor: pointer;

}

</style>