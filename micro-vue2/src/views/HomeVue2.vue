<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/user.jpg" />
    <h1 class="first_child">first-child(受基座css影响)</h1>
    <h1 class="first_child">Home</h1>
  </div>
</template>

<script>
export default {
  name: 'HomeVue2'
}
</script>

<style scoped>
.home > img {
  width: 300px;
}
</style>
