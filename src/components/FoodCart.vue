<template>
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
      <div class="cart-item-container">
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
                  <div class="cart-control-btn increase-btn border" @click="decreaseCart(item)">
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
                  @click="removeCart(item)"
                ></v-icon>
              </div>
              <div class="mt-5">
                <p>Price: {{ item.totalPrice }} ৳</p>
              </div>
            </div>
          </div>
          <v-divider thickness="2px" class=""></v-divider>
        </div>
      </div>
      <div class="cart-footer" v-if="getMyCart?.items?.length > 0">
        <div class="pa-4 mt d-flex justify-space-between subtotal">
          <p>Subtotal</p>
          <p>{{ getMyCart.amount }} ৳</p>
        </div>
        <v-divider thickness="2px"></v-divider>
        <div class="text-center pa-4 mt-2">
          <button class="confirm-btn" @click="confirmOrder()">Confirm Order</button>
        </div>
      </div>
      <div class="empty-cart-text" v-if="!getMyCart.items || getMyCart?.items?.length <= 0">
        <p>Cart is Empty</p>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import ApiCall from '../api/apiInterface'
import { imageUrl } from '../constants/config'
import { Store, mapActions, mapGetters, storeKey } from 'vuex'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()

export default {
  name: 'FoodCart',
  data() {
    return {
      imageUrl: imageUrl
    }
  },
  watch: {},
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
      updateCart: 'updateCart',
      decreaseCartItem: 'decreaseCartItem',
      increaseCartItem: 'increaseCartItem',
      removeCartItem: 'removeCartItem',
      setTotalAmount: 'setTotalAmount'
    }),
    toggleCart() {
      this.toggleCartVisibility()
    },
    addToCart(food) {
      this.increaseCartItem(food)
      this.setTotalAmount()
    },

    decreaseCart(food) {
      this.decreaseCartItem(food)
      this.setTotalAmount()
    },

    removeCart(food) {
      this.removeCartItem(food)
      this.setTotalAmount()
    },

    async confirmOrder() {
      //const cartDetails = { ...this.getMyCart }
      // const currentDate = new Date()
      // const isoString = currentDate.toISOString()
      try {
        const cartDetails = JSON.parse(JSON.stringify(this.getMyCart))

        cartDetails.items.map((item) => {
          delete item.foodImage
          delete item.foodName
          item.foodPackageId = null
        })
        cartDetails.orderNumber = new Date().toISOString()
        cartDetails.phoneNumber = null
        //cartDetails.orderStatus = 1

        const response = await ApiCall.post('api/order/create', cartDetails)
        console.log(response)
        $toast.success('Order created successfully')
        this.toggleCartVisibility()
        this.updateCart({
          tableId: 0,
          orderNumber: '',
          amount: 0,
          phoneNumber: '',
          items: []
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/config';
@import '../assets/responsive';

.cart-drawer {
  .cart-container {
    .header {
      color: white;
      background-color: $primary;
      position: sticky;
      top: 0;
      left: 0;
      z-index: 2;
    }

    .cart-footer {
      position: sticky;
      bottom: 0;
      background-color: #ffffff;
      .subtotal {
        font-weight: bold;
        font-size: 16px;
      }
      .confirm-btn {
        display: block;
        width: 100%;
        color: white;
        font-size: 16px;
        background-color: $primary;
        padding: 15px 0px;

        &:hover {
          background-color: darken($primary, 10);
        }
      }
    }

    .empty-cart-text {
      height: 90vh;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        font-size: 24px;
      }
    }

    .cart-item-container {
      .cart-item {
        .food-name {
          font-size: 18px;
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
}
</style>
