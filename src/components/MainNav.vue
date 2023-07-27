<template>
  <nav class="nav-container">
    <div class="d-flex">
      <v-btn class="me-5 menu-btn" icon="mdi-menu" @click.stop="toggleDrawer"></v-btn>
      <h2 class="logo">BSS Restaurant</h2>
    </div>
    <div class="link-container">
      <RouterLink class="nav-link" to="/">Home</RouterLink>
      <RouterLink class="nav-link" to="/admin">Admin</RouterLink>

      <button v-if="getCurrentUser.email" @click="logoutUserData" class="nav-link d-inline">
        <v-icon icon="mdi-login" />
        Logout
      </button>

      <RouterLink v-if="!getCurrentUser.email" class="nav-link" to="/login">
        <v-icon icon="mdi-login" />
        Login
      </RouterLink>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "mainNav",
  computed: {
    ...mapGetters({
      getCurrentUser: "getCurrentUser"
    })
  },
  methods: {
    ...mapActions({
      logoutUser: "logoutUser",
      toggleDrawerVisibility: "toggleDrawerVisibility"
    }),
    toggleDrawer(){
      this.toggleDrawerVisibility()
    },
    logoutUserData() {
      console.log("logout");
      localStorage.clear();
      this.logoutUser();
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/config";
@import "../assets/responsive";

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px;
  background-color: $primary;
  border-radius: 0px;

  .menu-btn{
    background-color: transparent;
    color: white;
    box-shadow: none;
  }
  .logo {
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    color: white;
  }

  .link-container {
    .nav-link {
      color: white;
      text-decoration: none;
      padding: 10px 24px;

      &:hover {
        color: lightgray;
        cursor: pointer;
      }
    }
  }


}
</style>