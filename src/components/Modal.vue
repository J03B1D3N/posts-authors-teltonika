<template>
  <div class="modal" @click="handleClick">
    <div ref="excludeDiv" :is="currentComponent" class="currentComponent">

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Create from './forms/createPost.vue'
import Edit from './forms/editPost.vue'

export default {
  computed: {
    ...mapGetters(["currentComponent"])
  },
components: {
    Edit,
    Create
},
methods: {
  ...mapActions(["modalToggle"]),

  handleClick(event) {
      if (!this.$refs.excludeDiv.$el.contains(event.target)) {
        this.modalToggle();
      }
    },

}
}
</script>

<style scoped>

.modal {
  position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 3;
    width: 100%;
    height: 100%;
    background-color: rgb(82, 72, 72, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}


</style>