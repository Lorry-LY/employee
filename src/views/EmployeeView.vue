<template>
  <div class="content">
    <BottomBar class="navbar"/>
    <router-view/>
  </div>
</template>

<script>
import BottomBar from '@/components/NavBar/BottomBar.vue'
export default {
  components: {
    BottomBar
  }
}
</script>

<style scoped>
.content {
  position: absolute;
  width: 100%;
  height: 100%;
}

.navbar {
  position: absolute;
  bottom: 0;
  height: 30px;
  left: 0;
  width: 100%;
  z-index: 1;
  border-top: 1px solid;
}
</style>