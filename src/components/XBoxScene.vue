<script lang ="js">
import XBoxScene from '../three/XBoxScene.js'

  export default {
    name: 'XBoxScene',
    data() {
      return {
        scene: null
      }
    },
    mounted() {
        this.scene = new XBoxScene(this.$refs.model)
    }
  }

</script>

<template>
  <div style="height: 100%; width: 100%; position: absolute; z-index: 11;" ref="model">

  </div>
</template>

<style>

.pic {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-size: cover;
}

</style>
