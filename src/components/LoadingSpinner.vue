<template>
  <div class="loading-container">
    <swapping-squares-spinner :animation-duration="1000" :size="80" color="#cc080b" />
  </div>
</template>

<script>
import { SwappingSquaresSpinner } from 'epic-spinners'
export default {
  name: 'LoadingSpinner',
  components: {
    SwappingSquaresSpinner
  }
}
</script>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}
</style>
