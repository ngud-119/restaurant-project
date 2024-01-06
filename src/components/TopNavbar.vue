<template>
  <v-app-bar class="navbar-container px-lg-10">
    <template v-slot:prepend>
      <div class="logo-container">
        <div class="d-flex align-center order-first">
          <img src="../assets/logo.png" alt="" width="50" />
          <p class="logo-text">BSS RESTAURANT</p>
        </div>
      </div>
    </template>
    <template v-slot:append>
      <div class="d-flex align-center">
        <div class="link-container">
          <RouterLink class="nav-link" to="/admin">Admin</RouterLink>
          <!-- <RouterLink class="nav-link" to="/services">Our Services</RouterLink>
          <RouterLink class="nav-link" to="/about">About Us</RouterLink> -->
        </div>
        <div class="cart-icon-container">
          <div v-if="getMyCart?.items?.length > 0" class="cart-counter">
            <p>{{ getMyCart.items.length }}</p>
          </div>
          <v-icon class="cart-icon" icon="mdi-basket" @click.stop="toggleCart"></v-icon>
        </div>
        <v-icon class="menu-btn" icon="mdi-menu" @click.stop="toggleDrawer"></v-icon>
      </div>
    </template>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TopNavbar',
  computed: {
    ...mapGetters({
      getCurrentUser: 'getCurrentUser',
      getMyCart: 'getMyCart'
    })
  },
  methods: {
    ...mapActions({
      logoutUser: 'logoutUser',
      toggleDrawerVisibility: 'toggleDrawerVisibility',
      toggleCartVisibility: 'toggleCartVisibility'
    }),
    toggleDrawer() {
      this.toggleDrawerVisibility()
    },
    toggleCart() {
      this.toggleCartVisibility()
    },
    logoutUserData() {
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

.navbar-container {
  color: white;
  background-color: $primary;
  .logo-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include lg {
      width: fit-content;
    }
    .logo-text {
      margin-top: 10px;
      margin-left: 0px;
      font-size: 16px;

      @include logo;

      @include lg {
        margin-left: 10px;
        font-size: 22px;
      }
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
      padding: 21px 36px;
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

  .cart-icon-container {
    position: relative;
    margin-right: -10px;

    @include lg {
      margin-right: 0px;
    }
    .cart-counter {
      width: 20px;
      height: 20px;
      border-radius: 40px;
      position: absolute;
      top: 0;
      right: 0;
      transform: translateY(40%) translateX(-30%);
      background-color: #ffffff;
      color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;

      p {
        margin-top: 3px;
        font-size: 14px;
        font-weight: 800;
      }
    }

    .cart-icon {
      color: white;
      height: 100%;
      padding: 20px 36px;
      transition: all 0.4s;
      font-size: 20px;

      @include lg {
        font-size: 24px;
        padding: 20px 36px;
      }
    }
  }

  .menu-btn {
    background-color: transparent;
    color: white;
    box-shadow: none;
    display: block;
    font-size: 25px;
    margin-left: 12px;

    @include xl {
      display: none;
    }
  }
}
</style>
