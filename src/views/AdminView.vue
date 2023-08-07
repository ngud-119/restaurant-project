<template>
  <div class="">
    <v-card>
      <v-layout>
        <v-navigation-drawer
          class="nav-drawer"
          v-model="$store.state.drawerVisibility"
          app
          mobile-break-point="640"
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

          <v-divider></v-divider>

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
              </v-list>
            </div>
            <div class="px-3">
              <button
                v-if="getCurrentUser.email"
                @click="logoutUserData"
                class="sidebar-logout-btn"
              >
                <v-icon icon="mdi-login" />
                Logout
              </button>
            </div>
          </div>
        </v-navigation-drawer>
        <!--!-------- Dashboard View Field ---------->
        <v-main>
          <MainNav></MainNav>
          <div class="dashboard-container">
            <div class="dashboard-view">
              <RouterView />
            </div>
          </div>
        </v-main>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainNav from '../components/MainNav.vue'

export default {
  name: 'adminView',
  components: { MainNav },
  data() {
    return {
      drawer: true
    }
  },
  computed: {
    ...mapGetters({
      getCurrentUser: 'getCurrentUser',
      getDrawerVisibility: 'getDrawerVisibility',
      getLoadingState: 'getLoadingState'
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
      display: block;
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

  .side-list-item {
    // color: white;
  }
}

.dashboard-container {
  min-height: 90vh;

  .dashboard-view {
    
    min-height: 91vh;
    margin: 0 auto;
    padding: 10px 10px;

    @include lg {
      padding: 40px 60px;
    }
  }
}
</style>
