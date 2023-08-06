<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-8">
      <h2 class="heading-font">All Food List</h2>
      <v-btn class="add-btn" @click="() => this.$router.push({ path: '/admin-add-food' })">
        Add Food
      </v-btn>
    </div>
    <div>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :items="tableData"
        :items-per-page="itemsPerPage"
        @update:options="loadItems"
        hide-default-footer
        class="elevation-1"
        :hover="true"
      >
        <template v-slot:item.image="{ item }">
          <img
            class="rounded-circle"
            :src="imageUrl + 'food/' + item.raw.image"
            alt=""
            width="40"
            height="40"
          />
        </template>
        <template v-slot:item.action="{ item }">
          <span class="me-4"
            ><v-btn
              width="36"
              height="36"
              variant="outlined"
              color="success"
              icon="mdi-circle-edit-outline"
            ></v-btn
          ></span>
          <span class=""
            ><v-btn
              width="36"
              height="36"
              variant="outlined"
              @click="removeFood(item.raw.id)"
              icon="mdi-trash-can"
              color="#cc080b"
            ></v-btn
          ></span>
        </template>
        <!-- <template v-slot:bottom>
					<div class="text-center pt-2">
						<v-pagination v-model="getAllFoodData.current_page" color="#cc080b" active-color="#cc080b" rounded="circle"
							:length="getAllFoodData.totalPages"></v-pagination>
					</div>
				</template> -->
      </v-data-table-server>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { imageUrl } from '../../constants/config'
import ApiCall from '../../api/apiInterface'

export default {
  name: 'AllFoodList',
  data() {
    return {
      imageUrl: imageUrl,
      totalItems: 0,
      itemsPerPage: 10,
      totalPages: 0,
      tableData: [],
      headers: [
        {
          align: 'start',
          key: 'image',
          sortable: false,
          title: 'Image'
        },
        {
          align: 'start',
          key: 'name',
          sortable: false,
          title: 'Name'
        },
        { title: 'Price', key: 'price' },
        { title: 'Discount Type', key: 'discountType' },
        { title: 'Discount', key: 'discount' },
        { title: 'Discount Price', key: 'discountPrice' },
        { title: 'Action', key: 'action' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getAllFoodData: 'getAllFoodData'
    })
  },
  methods: {
    ...mapActions({
      fetchAllFoodData: 'fetchAllFoodData',
      deleteFood: 'deleteFood'
    }),

    removeFood(id) {
      console.log(id)
      this.deleteFood(id)
    },

    async loadItems({ page, itemsPerPage, sortBy }) {
      this.page = page ??= this.page
      this.itemsPerPage = itemsPerPage ??= this.itemsPerPage
      this.sortBy = sortBy ??= this.sortBy
      const response = await ApiCall.get(
        `api/Food/datatable?sort=${sortBy}&page=${page}&per_page=${itemsPerPage}`
      )
      this.tableData = response.data.data
      this.totalPages = response.data.totalPages
      this.totalItems = response.data.total
    }
  },
  mounted() {
    this.fetchAllFoodData()
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

thead {
  border: 2px solid red !important;
}
</style>
