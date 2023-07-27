<template>
  <main>
    <MainNav></MainNav>
    <h2>Home View</h2>
  </main>
</template>


<script>
import { mapGetters } from 'vuex';
import MainNav from '../components/MainNav.vue';

export default {
  name: "HomeView",
  components: { MainNav },
  computed: {
    ...mapGetters({
      getCount: "getCount",
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/config";

h2 {
  font-size: 60px;

}
</style>