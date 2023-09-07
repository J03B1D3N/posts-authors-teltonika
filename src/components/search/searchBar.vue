<template>
  <div class="search">
    <input type="text" id="search" name="search" v-model="input" @input="setSearch(input)" placeholder="Search...">
  </div>
</template>

<script>  
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      input: ''
    }
  },
methods: {
  ...mapActions(["setSearch"])

},
computed: {
  ...mapGetters(["search"])
},
created() {
    if(this.search.length > 0) {
      this.input = this.search
    }
}
}
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  justify-content: center;
}
input {
  width: 95%;
  background-color: transparent;
}

</style>