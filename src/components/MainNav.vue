<template>
  <nav class="nav-container">
    <div class="logo-container">
      <v-btn class="order-last menu-btn text-h5" icon="mdi-menu" @click.stop="toggleDrawer"></v-btn>
      <div class="d-flex align-center order-first">
        <img src="../assets/logo.png" alt="" width="50" />
        <p class="logo-text">BSS RESTAURANT</p>
      </div>
    </div>
    <div class="d-flex">
      <div class="link-container">
        <RouterLink class="nav-link" to="/admin">Admin</RouterLink>
        <RouterLink class="nav-link" to="/services">Our Services</RouterLink>
        <RouterLink class="nav-link" to="/about">About Us</RouterLink>
      </div>
      <div class="cart-icon-container">
        <div v-if="getMyCart?.items?.length>0" class="cart-counter">
          <p>{{ getMyCart.items.length }}</p>
        </div>
        <v-icon class="cart-icon" icon="mdi-basket" @click.stop="toggleCart"></v-icon>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'mainNav',
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
    display: block;

    @include lg {
      display: none;
    }
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

  .cart-icon-container {
    position: relative;
    .cart-counter {
      width: 20px;
      height: 20px;
      border-radius: 40px;
      position: absolute;
      top: 0;
      right: 0;
      transform: translateY(40%) translateX(-30%);
      background-color: #ffffff;
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

      &:hover {
        color: white;
        background-color: #8f0709;
        cursor: pointer;
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
