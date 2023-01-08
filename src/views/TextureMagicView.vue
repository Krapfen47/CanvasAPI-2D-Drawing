<script>

export default {
  name: 'TextureMagicView',
  data() {
      return {
        scene: null
    }
  }
  
}

</script>

<template>
  <div style="height: calc(100% - 48px); width: 100%; position: absolute;">
    <texture-magic-scene/>
  </div>

</template>
