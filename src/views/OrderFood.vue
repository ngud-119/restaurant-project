<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <div class="heading-container mb-8">
      <h2 class="heading-font">Order Food</h2>
    </div>
    <div>
      <v-row>
        <v-col cols="12" lg="2">
          <div class="select-table-container">
            <h5 class="text-center text-black font-weight-bold mb-2">SELECT A TABLE</h5>
            <div
              class="table-card mb-4 py-4 text-center border"
              :class="{ 'table-active': table.id == formData.tableId }"
              v-for="(table, index) in tableData"
              @click="
                () => {
                  formData.tableId = table.id
                  formData.items = []
                }
              "
              :key="index"
            >
              <div class="table-card-img-container mt-1">
                <img
                  class="rounded-circle"
                  :src="imageUrl + 'table/' + table.image"
                  alt=""
                  width="70"
                  height="70"
                />
              </div>
              <div class="table-text">
                <p class="">{{ table.tableNumber }}</p>
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="10">
          <div v-if="foodData.length > 0" class="select-food-container">
            <div v-if="formData.tableId === 0" class="select-food-overlay">
              <div
                class="d-flex flex-column justify-center align-center bg-white pa-8 ma-5 overlay-content"
              >
                <v-icon class="d-block warn-icon" icon="mdi-alert-decagram"></v-icon>
                <p>At First Select A Table!</p>
              </div>
            </div>
            <h5 class="text-left text-black font-weight-bold mb-2">SELECT FOODS</h5>
            <div class="food-card border" v-for="(food, index) in foodData" :key="index">
              <div class="food-img-container ma-4">
                <img
                  class="rounded-circle"
                  :src="imageUrl + 'food/' + food.image"
                  :alt="food.name"
                  width="190"
                />
              </div>
              <div class="food-text-container ma-4">
                <h2>{{ food.name }}</h2>
                <p>{{ food.description }}</p>
                <div class="price-btn-container mt-4">
                  <div class="mb-5 mb-lg-0">
                    <p
                      class="me-4 text-h6"
                      :class="{
                        'text-decoration-line-through text-red-darken-2': food.discountPrice > 0
                      }"
                    >
                      Price: <span class="font-weight-bold">{{ food.price }}৳</span>
                    </p>
                    <p class="text-success text-h6" v-if="food.discountPrice > 0">
                      Discounted Price:
                      <span class="font-weight-bold">{{ food.discountPrice }}৳</span>
                    </p>
                  </div>
                  <!-- <div class="cart-control border">
                    <div class="cart-control-btn increase-btn border" @click="removeFromCart(food)">
                      <v-icon class="icon" icon="mdi-minus"></v-icon>
                    </div>
                    <div class="cart-control-text border">
                      <p>
                        {{
                          getMyCart?.items?.find((item) => item.foodId === food.id)?.quantity || 0
                        }}
                      </p>
                    </div>
                    <div class="cart-control-btn decrease-btn border" @click="addToCart(food)">
                      <v-icon class="icon" icon="mdi-plus"></v-icon>
                    </div>
                  </div> -->
                  <div class="add-to-cart-btn">
                    <button
                      :class="{
                        'btn-disabled': getMyCart?.items?.find((item) => item.foodId === food.id)
                      }"
                      :disabled="getMyCart?.items?.find((item) => item.foodId === food.id)"
                      @click="addFoodToCart(food)"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ApiCall from '../api/apiInterface'
import { imageUrl } from '../constants/config'
import store from '../store'

export default {
  name: 'orderFood',
  data() {
    return {
      formData: {},

      headers: [
        {
          align: 'start',
          key: 'table',
          sortable: false,
          title: 'Table'
        }
      ],
      imageUrl: imageUrl,
      totalItems: 0,
      itemsPerPage: 10,
      totalPages: 0,
      sortBy: '',
      page: 1,
      tableData: [],

      foodData: [],
      foodTotalItems: 0,
      foodItemsPerPage: 10,
      foodTotalPages: 0,
      foodSortBy: '',
      foodPage: 1
    }
  },
  watch: {
    getMyCart(newValue) {
      this.formData = { ...newValue }
    }
  },
  computed: {
    ...mapGetters({
      getMyCart: 'getMyCart'
    })
  },
  methods: {
    ...mapActions({
      updateCart: 'updateCart'
    }),
    async loadTable() {
      try {
        store.commit('IS_LOADING', true)
        const response = await ApiCall.get(
          `api/Table/datatable?sort=${this.sortBy}&page=${this.page}&per_page=${this.itemsPerPage}`
        )
        this.tableData = response.data.data
        this.totalPages = response.data.totalPages
        this.totalItems = response.data.total
        store.commit('IS_LOADING', false)
      } catch (error) {
        store.commit('IS_LOADING', false)
        console.log(error)
      }
    },

    async loadFood() {
      try {
        store.commit('IS_LOADING', true)
        const response = await ApiCall.get(
          `api/Food/datatable?sort=${this.foodSortBy}&page=${this.foodPage}&per_page=${this.foodItemsPerPage}`
        )
        this.foodData = response.data.data
        this.foodTotalPages = response.data.totalPages
        this.foodTotalItems = response.data.total
        store.commit('IS_LOADING', false)
      } catch (error) {
        store.commit('IS_LOADING', false)
        console.log(error)
      }
    },

    addFoodToCart(food) {
      const foodOrderDetails = {
        foodImage: food.image,
        foodName: food.name,
        foodId: food.id,
        foodPackageId: 0,
        quantity: 1,
        unitPrice: food.discountPrice === 0 ? food.price : food.discountPrice,
        totalPrice: 1 * food.discountPrice === 0 ? food.price : food.discountPrice
      }

      let checkDuplicate = this.getMyCart?.items?.find((item) => item.foodId == food.foodId)
      if (!checkDuplicate) {
        this.formData.items.push(foodOrderDetails)
        this.formData.amount = this.formData.items
          .map((item) => item.totalPrice)
          .reduce((acc, current) => {
            return acc + current
          }, 0)
        this.updateCart(this.formData)
      }
    }
  },
  mounted() {
    this.loadTable()
    this.loadFood()
    this.formData = this.getMyCart
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/config';
@import '../assets/responsive';
.table-active {
  color: white;
  background-color: $primary;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.select-table-container {
  background-color: darken(#ffffff, 5);
  padding: 20px;
  .container-header {
    font-size: 22px;
  }

  .table-card {
    &:hover {
      cursor: pointer;
      color: white;
      background-color: $primary;
    }

    .table-text {
      font-size: 18px;
      font-weight: 600;
    }
  }
}

.select-food-container {
  background-color: darken($color: #ffffff, $amount: 5);
  padding: 20px;
  height: 100%;
  position: relative;

  .select-food-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: darken($color: #ffffffc7, $amount: 5);
    z-index: 2;

    .overlay-content {
      border: 2px dashed $primary;
      .warn-icon {
        color: $primary;
        font-size: 60px;
        margin-top: 20px;
      }

      p {
        text-align: center;
        font-size: 28px;
        font-weight: 700;
        margin-top: 20px;
      }
    }
  }

  .food-card {
    background-color: white;
    margin-bottom: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include lg {
      flex-direction: row;
    }
    .food-img-container {
      img {
        display: block;
        filter: drop-shadow(0px 10px 10px #bcbcbc);
        transform: rotate(0deg);
        animation: spin 30s linear infinite;
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }

        to {
          transform: rotate(360deg);
        }
      }
    }

    .price-btn-container {
      display: block;

      @include lg {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: end;
      }

      .add-to-cart-btn {
        button {
          display: inline-block;
          color: white;
          background-color: $primary;
          padding: 10px 40px;
          transition: background-color 0.2s;
          &:hover {
            background-color: darken($primary, 10);
          }
        }

        .btn-disabled {
          color: lightgray;
          background-color: darken($primary, 20);
        }
      }
      .cart-control {
        display: inline-flex;
        height: fit-content;

        .cart-control-btn {
          font-size: 20px;
          cursor: pointer;
          padding: 5px 15px;

          &:hover {
            color: white;
            background-color: $primary;
          }
          .icon {
            font-size: 20px;
          }
        }

        .cart-control-text {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          p {
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
