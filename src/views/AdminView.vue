<template>
  <div class="">
    <v-card>
      <v-layout>
        <v-navigation-drawer
          class="nav-drawer"
          v-model="$store.state.drawerVisibility"
          app       
        >
          <v-list class="pb-3">
            <v-list-item
              class=""
              prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              :title="getCurrentUser.fullName"
              :right="$vuetify.rtl"
              :subtitle="getCurrentUser.email"
            ></v-list-item>
          </v-list>

          <v-divider thickness="2px"></v-divider>

          <div class="sidebar-item-container">
            <div class="sidebar-link-container">
              <v-list density="compact" nav>
                <RouterLink class="side-list-link" to="/admin">
                  <v-list-item
                    class="side-list-item"
                    prepend-icon="mdi-home-account"
                    title="Home"
                    value="adminHome"
                  ></v-list-item>
                </RouterLink>
                <RouterLink class="side-list-link" to="/all-employee">
                  <v-list-item
                    class="side-list-item"
                    prepend-icon="mdi-account-multiple"
                    title="All Employee List"
                    value="allEmployee"
                  ></v-list-item>
                </RouterLink>
                <RouterLink class="side-list-link" to="/all-table">
                  <v-list-item
                    class="side-list-item"
                    prepend-icon="mdi-list-box"
                    title="All Table List"
                    value="allTable"
                  ></v-list-item>
                </RouterLink>
                <RouterLink class="side-list-link" to="/admin-all-food-list">
                  <v-list-item
                    class="side-list-item"
                    prepend-icon="mdi-food"
                    title="All Food List"
                    value="allFood"
                  ></v-list-item>
                </RouterLink>
                <RouterLink class="side-list-link" to="/order">
                  <v-list-item
                    class="side-list-item"
                    prepend-icon="mdi-food-takeout-box"
                    title="Order Food"
                    value="orderFood"
                  ></v-list-item>
                </RouterLink>
                <RouterLink class="side-list-link" to="/all-order">
                  <v-list-item
                    class="side-list-item"
                    prepend-icon="mdi-clipboard-list"
                    title="All Orders"
                    value="allOrder"
                  ></v-list-item>
                </RouterLink>
              </v-list>
            </div>
            <div class="px-3">
              <button
                v-if="getCurrentUser.email"
                @click="logoutUserData"
                class="sidebar-logout-btn"
              >
                <v-icon icon="mdi-login" />
                <p class="mt-1 ms-1">Logout</p>
              </button>
            </div>
          </div>
        </v-navigation-drawer>

        <!--!-------- Dashboard View Field Start---------->
        <v-main class="dashboard-area">
          <!-- <MainNav></MainNav> -->

          <TopNavbar></TopNavbar>

          <div class="box"></div>
          <div class="dashboard-container">
            <div class="overlay"></div>
            <div class="dashboard-view">
              <RouterView />
            </div>
          </div>
        </v-main>
        <!--!-------- Dashboard View Field End---------->

        <FoodCart></FoodCart>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainNav from '../components/MainNav.vue'
import TopNavbar from '../components/TopNavbar.vue'
import FoodCart from '../components/FoodCart.vue'

export default {
  name: 'adminView',
  components: { MainNav, TopNavbar, FoodCart, MainNav },
  data() {
    return {
      drawer: true
    }
  },
  computed: {
    ...mapGetters({
      getCurrentUser: 'getCurrentUser'
    })
  },

  methods: {
    ...mapActions({
      logoutUser: 'logoutUser'
    }),
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

.nav-drawer {
  // background-color: $primary;

  .sidebar-item-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 86%;

    @include lg {
      min-height: 88%;
    }
    .sidebar-logout-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      color: $primary;
      border: 2px solid $primary;
      border-radius: 30px;
      padding: 8px 0px;
      background-color: white;
      font-size: 14px;

      &:hover {
        color: white;
        background-color: $primary;
      }
    }
  }
}

.side-list-link {
  text-decoration: none;
  font-size: 18px;
  color: $primary;
}

.dashboard-area {
  position: relative;
  .dashboard-container {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1)),
      url('../assets/img/dash-bg.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    .dashboard-view {
      min-height: calc(100vh - 65.6px);
      margin: 0 auto;
      padding: 10px 10px;

      @include lg {
        padding: 40px 60px;
      }
    }
  }
}
</style>
