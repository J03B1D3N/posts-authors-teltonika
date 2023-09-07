<template>
  <h1 class="noPosts">
    {{ message }}
  </h1>
</template>

<script>
export default {
    props: ["message"]
}
</script>

<style scoped>
.noPosts{
    height: fit-content;
    width: 100%;
}
</style>