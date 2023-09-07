<template>
  <div class="notification" :style="{backgroundColor: notificationMsg.color}">
    {{notificationMsg.text}}
  </div>
</template>

<script>
import {mapGetters} from "vuex"
export default {
  computed: {
    ...mapGetters(["notificationMsg"])
  }
}
</script>

<style scoped> 

  .notification{
  position: absolute;
  top: 1rem;
  width: fit-content;
  height: fit-content;
  padding: 1rem;
  border-radius: 1rem;
  
  }

</style>