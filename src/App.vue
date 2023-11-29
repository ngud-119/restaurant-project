<template>
  <LoadingSpinner v-if="getLoadingState"></LoadingSpinner>
  <RouterView />
</template>

<script>
import { RouterView } from 'vue-router'
import LoadingSpinner from './components/LoadingSpinner.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    LoadingSpinner
  },
  computed: {
    ...mapGetters({
      getLoadingState: 'getLoadingState'
    })
  }
}
</script>

<style scoped></style>
