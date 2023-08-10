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
        <v-main>
          <MainNav></MainNav>
          <div class="dashboard-container">
            <div class="overlay"></div>
            <div class="dashboard-view">
              <RouterView />
            </div>
          </div>
        </v-main>
        <!--!-------- Dashboard View Field End---------->

        <v-navigation-drawer
          class="cart-drawer"
          v-model="$store.state.cartVisibility"
          temporary
          location="right"
        >
          <div class="cart-container">
            <div class="header pa-4 d-flex align-center justify-space-between">
              <h2>Cart</h2>
              <v-icon icon="mdi-close-circle-outline" @click.stop="toggleCart"></v-icon>
            </div>
            <div v-for="(item, index) in getMyCart.items" :key="index" class="cart-item">
              <div class="d-flex align-center justify-space-between pa-3">
                <div class="d-flex align-center">
                  <div class="cart-image-container me-5 d-flex align-center">
                    <img
                      class="rounded-circle"
                      :src="imageUrl + 'food/' + item.foodImage"
                      :alt="item.name"
                      width="70"
                      height="70"
                    />
                  </div>
                  <div>
                    <h4 class="food-name font-weight-bold mb-2">{{ item.foodName }}</h4>
                    <div class="cart-control border">
                      <div
                        class="cart-control-btn increase-btn border"
                        @click="removeFromCart(item)"
                      >
                        <v-icon class="icon" icon="mdi-minus"></v-icon>
                      </div>
                      <div class="cart-control-text border">
                        <p>
                          {{ item.quantity }}
                        </p>
                      </div>
                      <div class="cart-control-btn decrease-btn border" @click="addToCart(item)">
                        <v-icon class="icon" icon="mdi-plus"></v-icon>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="text-right">
                    <v-icon
                      class="remove-from-cart-icon d-inline-block"
                      icon="mdi-trash-can-outline"
                    ></v-icon>
                  </div>
                  <div class="mt-5">
                    <p>Price: {{ item.totalPrice }}</p>
                  </div>
                </div>
              </div>
              <v-divider thickness="2px"></v-divider>
            </div>
            <div class="pa-4">Subtotal {{ getMyCart.amount }}</div>
          </div>
          <v-divider thickness="2px"></v-divider>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainNav from '../components/MainNav.vue'
import ApiCall from '../api/apiInterface'
import { imageUrl } from '../constants/config'

export default {
  name: 'adminView',
  components: { MainNav },
  data() {
    return {
      drawer: true,
      imageUrl: imageUrl
    }
  },
  computed: {
    ...mapGetters({
      getCurrentUser: 'getCurrentUser',
      getDrawerVisibility: 'getDrawerVisibility',
      getLoadingState: 'getLoadingState',
      getMyCart: 'getMyCart'
    })
  },

  methods: {
    ...mapActions({
      logoutUser: 'logoutUser',
      toggleCartVisibility: 'toggleCartVisibility',
      updateCart: 'updateCart'
    }),
    logoutUserData() {
      localStorage.clear()
      this.logoutUser()
      this.$router.push({ name: 'login' })
    },
    toggleCart() {
      this.toggleCartVisibility()
    },

    addToCart(food) {
      console.log(food)
      let checkDuplicate = this.getMyCart?.items?.find((item) => item.foodId == food.foodId)
      let formData = { ...this.getMyCart }

      if (checkDuplicate) {
        const updateOrder = {
          ...checkDuplicate,
          quantity: checkDuplicate.quantity + 1,
          totalPrice: (checkDuplicate.quantity + 1) * checkDuplicate.unitPrice
        }
        // formData.items.push(updateOrder)
        formData.items = [
          updateOrder,
          ...formData.items.filter((item) => item.foodId !== food.foodId)
        ]
        formData.amount = formData.items
          .map((item) => item.totalPrice)
          .reduce((acc, current) => {
            return acc + current
          }, 0)
        console.log(formData.amount)
        this.updateCart(formData)
      }
      console.log(food)
    }

    // removeFromCart(food) {
    //   let checkDuplicate = this.getMyCart?.items?.find((item) => item.foodId == food.id)
    //   if (checkDuplicate) {
    //     if (checkDuplicate.quantity > 0) {
    //       const updateOrder = {
    //         ...checkDuplicate,
    //         quantity: checkDuplicate.quantity - 1,
    //         totalPrice: (checkDuplicate.quantity - 1) * checkDuplicate.unitPrice
    //       }
    //       this.formData.items.push(updateOrder)
    //       this.formData.items = [
    //         updateOrder,
    //         ...this.formData.items.filter((item) => item.foodId !== food.id)
    //       ]
    //       this.updateCart(this.formData)
    //     }
    //   }
    // }
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

  .side-list-item {
    // color: white;
  }
}

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

.cart-drawer {
  width: 450px;
  .cart-container {
    .header {
      color: white;
      background-color: $primary;
    }
    .cart-item {
      .food-name {
        font-size: 20px;
      }
      .cart-control {
        display: inline-flex;
        height: fit-content;

        .cart-control-btn {
          font-size: 20px;
          cursor: pointer;
          padding: 0px 10px;

          &:hover {
            color: white;
            background-color: $primary;
          }
          .icon {
            font-size: 14px;
          }
        }

        .cart-control-text {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          p {
            font-size: 16px;
          }
        }
      }

      .remove-from-cart-icon {
        color: darken(#ffffff, $amount: 50);
        &:hover {
          cursor: pointer;
          color: $primary;
        }
      }
    }
  }
}
</style>
