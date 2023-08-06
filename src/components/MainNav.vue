<template>
  <nav class="nav-container">
    <div class="logo-container">
      <v-btn
        class="order-last menu-btn hidden-lg text-h5"
        icon="mdi-menu"
        @click.stop="toggleDrawer"
      ></v-btn>
      <div class="d-flex align-center order-first">
        <img src="../assets/logo.png" alt="" width="50" />
        <p class="logo-text">BSS RESTAURANT</p>
      </div>
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'mainNav',
  computed: {
    ...mapGetters({
      getCurrentUser: 'getCurrentUser'
    })
  },
  methods: {
    ...mapActions({
      logoutUser: 'logoutUser',
      toggleDrawerVisibility: 'toggleDrawerVisibility'
    }),
    toggleDrawer() {
      this.toggleDrawerVisibility()
    },
    logoutUserData() {
      console.log('logout')
      localStorage.clear()
      this.logoutUser()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/config';
@import '../assets/responsive';
@import '../styles/component';

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px;
  background-color: $primary;
  border-radius: 0px;
  z-index: 50;

  @include lg {
    padding: 0px 40px;
  }

  .logo-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include lg {
      width: fit-content;
    }
  }

  .menu-btn {
    background-color: transparent;
    color: white;
    box-shadow: none;
  }

  .logo-text {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 18px;

    @include logo;

    @include lg {
      font-size: 22px;
    }
  }

  .link-container {
    display: none;

    @include lg {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .active-nav-link {
      color: white;
      background-color: #8f0709;
      cursor: pointer;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      padding: 20px 36px;
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
