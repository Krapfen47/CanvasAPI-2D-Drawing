<script lang ="js">
import EntryScene from '../three/EntryScene.js'

  export default {
    name: 'EntryScene',
    data() {
      return {
        scene: null
      }
    },
    mounted() {
        this.scene = new EntryScene(this.$refs.model)
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
