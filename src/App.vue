<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div style="height: 48px;">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/textureMagic">Texture Magic</RouterLink>
    <RouterLink to="/projects">Projects</RouterLink>
  </div>
  <RouterView />
</template>

<style scoped>

</style>
