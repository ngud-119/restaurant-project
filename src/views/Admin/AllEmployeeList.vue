<template>
	<div>
		<div class="d-flex align-center justify-space-between mb-8">
			<h2>All Employee List</h2>
			<v-btn class="add-btn" @click='addEmployee'>
				Add Employee
			</v-btn>
		</div>
		<div>
			<v-data-table v-model:page="page" :headers="headers" :items="getAllEmployee.data" :items-per-page="itemsPerPage"
				hide-default-footer class="elevation-1">
				<template v-slot:bottom>
					<div class="text-center pt-2">
						<v-pagination v-model="page" :length="pageCount"></v-pagination>
						<v-text-field :model-value="itemsPerPage" class="pa-2" label="Items per page" type="number" min="-1"
							max="15" hide-details @update:model-value="itemsPerPage = parseInt($event, 10)"></v-text-field>
					</div>
				</template>
			</v-data-table>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {
			page: 1,
			itemsPerPage: 5,
			headers: [
				{
					align: 'start',
					key: 'image',
					sortable: false,
					title: 'Image',
				},
				{ title: 'Name', key: 'middleName' },
				{ title: 'Designation', key: 'designation' },
				{ title: 'Gender', key: 'gender' },
				{ title: 'Phone', key: 'phone' },
				{ title: 'Join Date', key: 'joinDate' },
			],
			desserts: [
				{
					name: 'Frozen Yogurt',
					calories: 159,
					fat: 6.0,
					carbs: 24,
					protein: 4.0,
					iron: 1,
				},
				{
					name: 'Ice cream sandwich',
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3,
					iron: 1,
				},
				{
					name: 'Eclair',
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0,
					iron: 7,
				},
				{
					name: 'Cupcake',
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3,
					iron: 8,
				},
				{
					name: 'Gingerbread',
					calories: 356,
					fat: 16.0,
					carbs: 49,
					protein: 3.9,
					iron: 16,
				},
				{
					name: 'Jelly bean',
					calories: 375,
					fat: 0.0,
					carbs: 94,
					protein: 0.0,
					iron: 0,
				},
				{
					name: 'Lollipop',
					calories: 392,
					fat: 0.2,
					carbs: 98,
					protein: 0,
					iron: 2,
				},
				{
					name: 'Honeycomb',
					calories: 408,
					fat: 3.2,
					carbs: 87,
					protein: 6.5,
					iron: 45,
				},
				{
					name: 'Donut',
					calories: 452,
					fat: 25.0,
					carbs: 51,
					protein: 4.9,
					iron: 22,
				},
				{
					name: 'KitKat',
					calories: 518,
					fat: 26.0,
					carbs: 65,
					protein: 7,
					iron: 6,
				},
			],
		}
	},
	computed: {
		...mapGetters({
			getAllEmployee: "getAllEmployee"
		}),
		pageCount() {
			return Math.ceil(this.desserts.length / this.itemsPerPage)
		},
	},
	mounted() {
		this.fetchAllEmployee();
	},
	methods: {
		...mapActions({
			fetchAllEmployee: 'fetchAllEmployee'
		}),

		addEmployee() {
			this.$router.push({ path: "/add-employee" })
		}
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
</style>



