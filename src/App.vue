<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/projects">Projects</RouterLink>
  </div>
  <RouterView />
</template>

<style scoped>

</style>
