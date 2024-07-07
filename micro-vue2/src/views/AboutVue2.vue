<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/cor.jpg" />
    <h1 class="first_child">first-child(受基座css影响)</h1>
    <h1 class="first_child">About</h1>
  </div>
</template>

<script>
export default {
  name: 'AboutVue2'
}
</script>

<style scoped>
.home > img {
  width: 300px;
}
</style>
