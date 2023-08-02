<template>
  <nav class="nav-container">
    <div class="d-flex align-center">
      <v-btn class="me-5 menu-btn" icon="mdi-menu" @click.stop="toggleDrawer"></v-btn>
      <h2 class="logo">BSS Restaurant</h2>
    </div>
    <div class="link-container">
      <!-- <RouterLink class="nav-link" to="/home">Home</RouterLink> -->
      <RouterLink class="nav-link" to="/admin">Admin</RouterLink>

      <button v-if="getCurrentUser.email" @click="logoutUserData" class="nav-link">
        <v-icon icon="mdi-login" />
        Logout
      </button>

      <RouterLink v-if="!getCurrentUser.email" class="nav-link" to="/">
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
    toggleDrawer() {
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
@import "../styles/component";

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  background-color: $primary;
  border-radius: 0px;
  z-index: 50;

  @include lg {
    padding: 0px 40px;
  }

  .menu-btn {
    background-color: transparent;
    color: white;
    box-shadow: none;
  }

  .logo {
    text-align: center;
    color: white;
    @include logo;

    @include lg {
      font-size: 32px;
    }
  }

  .link-container {
    display: none;

    @include lg {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      padding: 20px 24px;
      outline: none;
      border: 0px;
      display: block;
      transition: all 0.4s;

      &:hover {
        color: white;
        background-color: #8f0709;
        cursor: pointer;
      }
    }
  }


}
</style>