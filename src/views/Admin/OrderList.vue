<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-8">
      <h2 class="heading-font">All Orders</h2>
      <v-btn class="add-btn" @click="() => this.$router.push({ path: '/order' })">
        Place an Order
      </v-btn>
    </div>
    <div>
      <v-row class="orderList-container">
        <v-col
          cols="12"
          md="6"
          lg="4"
          @update:options="loadItems"
          v-for="(order, index) in orderData"
          :key="index"
          class="pa-5"
        >
          <div class="orderList-Card">
            <div class="d-flex justify-space-between">
              <div>
                <h3>{{ order.orderNumber }}</h3>
                <p class="date-time mb-4">{{ order.orderTime }}</p>
              </div>
              <div>
                <v-icon
                  class="delete-icon text-h6 pa-4 rounded-circle"
                  icon="mdi-trash-can-outline"
                  @click="removeOrder(order.id)"
                ></v-icon>
              </div>
            </div>

            <div class="order-item-container">
              <div class="order-item-card" v-for="item in order.orderItems" :key="item.id">
                <div>
                  <img
                    :src="imageUrl + 'food/' + item.food.image"
                    :alt="item.food.name"
                    width="80"
                    class="rounded-circle"
                  />
                </div>

                <div class="w-100">
                  <h3 class="mb-2">{{ item.food.name }}</h3>
                  <div class="d-flex justify-space-between">
                    <p class="text-green font-weight-bold">{{ item.totalPrice }}৳</p>
                    <p class="">Qty: {{ item.quantity }}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="mt-3 d-flex align-stretch justify-space-between">
              <div>
                <p>
                  Total Item: <span class="font-weight-bold">{{ order.orderItems.length }}</span>
                </p>
                <p class="text-h6">
                  Total: <strong class="text-green">{{ order.amount }}৳</strong>
                </p>
              </div>
              <div class="order-edit-col">
                <p class="text-end">
                  Table: <span class="font-weight-bold"> {{ order.table.tableNumber }}</span>
                </p>
                <div
                  v-if="orderEditData.id !== order.id"
                  class="d-flex align-center justify-space-between"
                >
                  <p class="font-weight-bold text-end mt-1 text-orange-darken-1">
                    {{ order.orderStatus }}
                  </p>
                  <v-icon
                    class="status-change-icon mt-1"
                    icon="mdi-circle-edit-outline"
                    @click="
                      () => {
                        orderEditData.id = order.id
                        orderEditData.status = order.orderStatus
                      }
                    "
                  ></v-icon>
                </div>
                <v-select
                  :single-line="true"
                  :hide-details="true"
                  class="order-status-select"
                  :items="orderStatusData"
                  v-if="orderEditData.id === order.id"
                  item-title="value"
                  item-value="key"
                  label="Status"
                  variant="underlined"
                  color="#79a33d"
                  v-model="orderEditData.status"
                  @update:modelValue="editStatus(order.id)"
                ></v-select>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ApiCall from '../../api/apiInterface'
import store from '../../store'
import { imageUrl } from '../../constants/config'

export default {
  name: 'OrderList',
  data() {
    return {
      imageUrl: imageUrl,
      statusEdit: false,
      orderStatus: 0,
      orderEditData: {},
      orderStatusData: [
        { key: 0, value: 'Pending' },
        { key: 1, value: 'Confirmed' },
        { key: 2, value: 'Preparing' },
        { key: 3, value: 'Prepared To Serve ' },
        { key: 4, value: 'Served' },
        { key: 5, value: 'Payed' }
      ],
      totalItems: 0,
      itemsPerPage: 10,
      totalPages: 0,
      sortBy: '',
      page: 1,
      orderData: []
    }
  },
  methods: {
    async loadOrder() {
      try {
        store.commit('IS_LOADING', true)
        const response = await ApiCall.get(
          `api/Order/datatable?sort=${this.sortBy}&page=${this.page}&per_page=${this.itemsPerPage}`
        )
        this.orderData = response.data.data
        this.totalPages = response.data.totalPages
        this.totalItems = response.data.total
        store.commit('IS_LOADING', false)
      } catch (error) {
        store.commit('IS_LOADING', false)
        console.log(error)
      }
    },

    async removeOrder(id) {
      console.log('del', id)
      try {
        store.commit('IS_LOADING', true)
        await ApiCall.delete(`api/Order/delete/${id}`)
        await this.loadItems({
          page: this.page,
          itemsPerPage: this.itemsPerPage,
          sortBy: this.sortBy
        })
        store.commit('IS_LOADING', false)
      } catch (error) {
        store.commit('IS_LOADING', false)
        console.log(error)
      }
    },

    displayStatusChange() {
      this.statusEdit = !this.statusEdit
    },

    async editStatus(id) {
      console.log(id)
      console.log(this.orderEditData.status)
      try {
        store.commit('IS_LOADING', true)
        await ApiCall.put(`api/Order/update-status/${id}`, { status: this.orderEditData.status })
        await this.loadItems({
          page: this.page,
          itemsPerPage: this.itemsPerPage,
          sortBy: this.sortBy
        })
        store.commit('IS_LOADING', false)
        this.orderEditData = {}
      } catch (error) {
        console.log(error)
        store.commit('IS_LOADING', false)
      }
    },
    async loadItems({ page, itemsPerPage, sortBy }) {
      try {
        store.commit('IS_LOADING', true)
        this.page = page ??= this.page
        this.itemsPerPage = itemsPerPage ??= this.itemsPerPage
        this.sortBy = sortBy ??= this.sortBy
        const response = await ApiCall.get(
          `api/Order/datatable?sort=${this.sortBy}&page=${this.page}&per_page=${this.itemsPerPage}`
        )
        this.orderData = response.data.data
        this.totalPages = response.data.totalPages
        this.totalItems = response.data.total
        store.commit('IS_LOADING', false)
      } catch (error) {
        console.log(error)
        store.commit('IS_LOADING', false)
      }
    }
  },

  mounted() {
    this.loadOrder()
  }
}
</script>
<style>
.order-status-select .v-input--density-default {
  --v-input-control-height: 56px;
  --v-input-padding-top: 0px;
}
.order-status-select .v-field__input {
  min-height: 0px;
  padding: 0px;
}
.order-status-select .v-field__append-inner {
  padding: 0px !important;
}

.order-status-select .v-field {
  font-size: 14px;
}
</style>

<style lang="scss" scoped>
@import '../../assets/config';
@import '../../assets/responsive';
@import '../../styles/component';

.add-btn {
  @include btn($primary);
}

.orderList-container {
  .orderList-Card {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px;
    .date-time {
      color: rgb(161, 161, 161);
    }

    .delete-icon {
      color: red;
      border: 1px solid red;

      &:hover {
        background-color: red;
        color: white;
      }
    }

    .order-item-container {
      height: 200px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        //display: none;
        width: 4px;
        height: 4px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 20px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: $primary;
      }
      .order-item-card {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 10px;
        margin-right: 15px;
      }
    }
    .order-edit-col {
      height: 65px;
    }
    .status-change-icon {
      color: lightgray;
      font-size: 22px;

      &:hover {
        cursor: pointer;
        color: green;
      }
    }
    .order-status-select {
      width: 160px !important;
      height: 40px !important;
    }
  }
}
</style>
