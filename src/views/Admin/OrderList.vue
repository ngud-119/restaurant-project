<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-8">
      <h2 class="heading-font">All Order</h2>
      <v-btn class="add-btn" @click="() => this.$router.push({ path: '/order' })">
        Place an Order
      </v-btn>
    </div>
    <div>
      <v-row>
        <v-col cols="12" lg="2"></v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ApiCall from '../../api/apiInterface'
import store from '../../store'

export default {
  name: 'OrderList',
  data() {
    return {
      totalItems: 0,
      itemsPerPage: 10,
      totalPages: 0,
      sortBy: '',
      page: 1,
      OrderData: []
    }
  },
  methods: {
    async loadOrder() {
      try {
        store.commit('IS_LOADING', true)
        const response = await ApiCall.get(
          `api/Order/datatable?sort=${this.sortBy}&page=${this.page}&per_page=${this.itemsPerPage}`
        )
        this.OrderData = response.data.OrderData
        this.totalPages = response.data.totalPages
        this.totalItems = response.data.total
        store.commit('IS_LOADING', false)
      } catch (error) {
        store.commit('IS_LOADING', false)
        console.log(error)
      }
    }
  },
  mounted() {
    this.loadOrder()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/config';
@import '../../assets/responsive';
@import '../../styles/component';

.add-btn {
  @include btn($primary);
}
</style>
