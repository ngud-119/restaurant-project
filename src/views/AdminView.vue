<template>
  <div class="">
    <v-card>
      <v-layout>
        <v-navigation-drawer v-model="$store.state.drawerVisibility" app mobile-break-point="1440">
          <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
              :title="getCurrentUser.fullName" :right="$vuetify.rtl" :subtitle="getCurrentUser.email"></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <RouterLink class="side-list-link" to="/admin">
              <v-list-item class="side-list-item" prepend-icon="mdi-home-account" title="Home"
                value="adminHome"></v-list-item>
            </RouterLink>
            <RouterLink class="side-list-link" to="/all-employee">
              <v-list-item class="side-list-item" prepend-icon="mdi-account-multiple" title="All Employee List"
                value="allEmployee"></v-list-item>
            </RouterLink>
            <RouterLink class="side-list-link" to="/all-table">
              <v-list-item class="side-list-item" prepend-icon="mdi-list-box" title="All Table List"
                value="allTable"></v-list-item>
            </RouterLink>
          </v-list>
        </v-navigation-drawer>
        <!--!-------- Dashboard View Field ---------->
        <v-main>
          <div class="dashboard-container">
            <MainNav></MainNav>
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
import { mapGetters } from 'vuex';
import MainNav from '../components/MainNav.vue';

export default {
  name: "adminView",
  components: { MainNav },
  data() {
    return {
      drawer: true
    }
  },

  computed: {
    ...mapGetters({
      getCurrentUser: "getCurrentUser",
      getDrawerVisibility: "getDrawerVisibility"
    })
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/config";
@import "../assets/responsive";

.side-list-link {
  text-decoration: none;
  font-size: 18px;
  color: $primary;

  .side-list-item {}
}



.dashboard-container {
  min-height: 100vh;

  .dashboard-view {
    max-width: 1280px;
    margin: 0 auto;
    padding: 10px;

    @include lg {
      padding: 60px;
    }
  }
}
</style>























