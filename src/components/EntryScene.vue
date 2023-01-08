<script lang ="js">
import EntryScene from '../three/EntryScene.js'

  export default {
    name: 'EntryScene',
    data() {
      return {
        msg: 'Hello world!',
        scene: null
      }
    },
    mounted() {
        this.scene = new EntryScene(this.$refs.model)
    }
  }

</script>

<template>
  <div style="height: 100%; width: 100%;" ref="model">

  </div>
</template>
