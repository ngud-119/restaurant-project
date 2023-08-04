<!-- eslint-disable vue/valid-v-slot -->

<template>
	<div>
		<div class="d-flex align-center justify-space-between mb-8">
			<h2>All Employee List</h2>
			<v-btn class="add-btn" @click='addEmployee'>
				Add Employee
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
				class="elevation-1">
				<template v-slot:item.image="{ item }">
					<img class="rounded-circle" :src="imageUrl + 'user/' + item.raw.user.image" alt="" width="40" height="40">
				</template>
				<template v-slot:item.name="{ item }">
					<span>{{ item.raw.user.fullName }}</span>
				</template>
				<template v-slot:item.email="{ item }">
					<span>{{ item.raw.user.email }}</span>
				</template>
				<template v-slot:item.phoneNumber="{ item }">
					<span>{{ item.raw.user.phoneNumber }}</span>
				</template>
				<template v-slot:item.action="{ item }">
					<span class="me-4"><v-btn width="36" height="36" variant="outlined" color="success"
							icon="mdi-account-edit"></v-btn></span>
					<span class=""><v-btn width="36" height="36" variant="outlined" @click="removeEmployee(item)" icon="mdi-delete"
							color="#cc080b"></v-btn></span>
				</template>
			</v-data-table-server>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { imageUrl } from '../../constants/config';
import ApiCall from '../../api/apiInterface';

export default {
	data() {
		return {
			totalItems: 0,
			itemsPerPage: 10,
			totalPages: 0,
			tableData: [],
			imageUrl: imageUrl,
			headers: [
				{
					align: 'start',
					key: 'image',
					sortable: false,
					title: 'Image',
				},
				{
					align: 'start',
					key: 'name',
					sortable: false,
					title: 'Name',
				},
				{ title: 'Email', key: 'email' },
				{ title: 'Designation', key: 'designation' },
				{ title: 'Join Date', key: 'joinDate' },
				{ title: 'Phone Number', key: 'phoneNumber' },
				{ title: 'Action', key: 'action' },
			]
		}
	},
	computed: {
		...mapGetters({
			getAllEmployee: "getAllEmployee"
		}),
	},
	mounted() {
		this.fetchAllEmployee();
	},
	methods: {
		...mapActions({
			fetchAllEmployee: 'fetchAllEmployee',
			deleteEmployee: 'deleteEmployee'
		}),
		addEmployee() {
			this.$router.push({ path: "/add-employee" })
		},
		viewProfile(data) {
			console.log("clo", data.item.value);
		},
		nextPage() {
			console.log("dsdvd");
		},
		removeEmployee(item) {
			this.deleteEmployee(item.raw.id)
		},
		
		async loadItems({ page, itemsPerPage, sortBy }) {
			this.page = page ??= this.page;
			this.itemsPerPage = itemsPerPage ??= this.itemsPerPage;
			this.sortBy = sortBy ??= this.sortBy;
			const response = await ApiCall.get(`api/Employee/datatable?sort=${sortBy}&page=${page}&per_page=${itemsPerPage}`)
			this.tableData = response.data.data
			this.totalPages = response.data.totalPages;
			this.totalItems = response.data.total;
		},
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



