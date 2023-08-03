<!-- eslint-disable vue/valid-v-slot -->
<template>
	<div>
		<div class="d-flex align-center justify-space-between mb-8">
			<h2>All Food List</h2>
			<v-btn class="add-btn" @click='() => this.$router.push({ path: "/admin-add-food" })'>
				Add Food
			</v-btn>
		</div>
		<div>
			<v-data-table v-model:page="getAllFoodData.current_page" :headers="headers" :items="getAllFoodData.data"
				:items-per-page="getAllFoodData.per_page" :items-length="getAllFoodData.total" hide-default-footer
				class="elevation-1" :hover="true">
				<template v-slot:item.image="{ item }">
					<!-- <img class="rounded-circle" :src="imageUrl + 'food/' + item.raw.data.image" alt="" width="40" height="40"> -->
				</template>
				<template v-slot:item.action="{ item }">
					<span class="me-4"><v-btn width="36" height="36" variant="outlined" color="success"
							icon="mdi-circle-edit-outline"></v-btn></span>
					<span class=""><v-btn width="36" height="36" variant="outlined" @click="removeFood(item.raw.id)"
							icon="mdi-delete" color="#cc080b"></v-btn></span>
				</template>
				<template v-slot:bottom>
					<div class="text-center pt-2">
						<v-pagination v-model="getAllFoodData.current_page" color="#cc080b" active-color="#cc080b" rounded="circle"
							:length="getAllFoodData.totalPages"></v-pagination>
					</div>
				</template>
			</v-data-table>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { imageUrl } from '../../constants/config'

export default {
	name: 'AllFoodList',
	data() {
		return {
			imageUrl: imageUrl,
			headers: [
			{
					align: 'start',
					key: 'image',
					sortable: false,
					title: 'Food Image',
				},
				{
					align: 'start',
					key: 'name',
					sortable: false,
					title: 'Food Name',
				},
				{ title: 'Price', key: 'price' },
				{ title: 'Discount Type', key: 'discountType' },
				{ title: 'Discount', key: 'discount' },
				{ title: 'Discount Price', key: 'discountPrice' },
				{ title: 'Action', key: 'action' },
			]
		}
	},
	computed: {
		...mapGetters({
			getAllFoodData: "getAllFoodData"
		})
	},
	methods: {
		...mapActions({
			fetchAllFoodData: 'fetchAllFoodData',
			deleteFood: 'deleteFood'
		}),

		removeFood(id) {
			console.log(id);
			this.deleteFood(id)
		}
	},
	mounted() {
		this.fetchAllFoodData()
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/config";
@import "../../assets/responsive";
@import "../../styles/component";

.add-btn {
	@include btn($primary)
}

thead{
	border: 2px solid red !important;
}
</style>