<!-- eslint-disable vue/valid-v-slot -->
<template>
	<div>
		<div class="d-flex align-center justify-space-between mb-8">
			<h2>All Table List</h2>
			<v-btn class="add-btn" @click='() => this.$router.push({ path: "/add-table" })'>
				Add Table
			</v-btn>
		</div>
		<div>
			<v-data-table v-model:page="getAllTableData.current_page" :headers="headers" :items="getAllTableData.data"
				:items-per-page="getAllTableData.per_page" :items-length="getAllTableData.total" hide-default-footer
				class="elevation-1">
				<template v-slot:item.isOccupied="{ item }">
					{{ item.raw.isOccupied ? "Booked" : "Available" }}
				</template>
				<template v-slot:item.employees="{ item }">
					<p v-for="employee in item.raw.employees" :key="employee.id">{{ employee.name }}</p>
				</template>
				<template v-slot:item.assignEmployees="{ item }">
					<div>
						<v-btn color="green" variant="outlined" icon="mdi-open-in-new" width="36" height="36"
							@click="openDialog(item)"></v-btn>
					</div>
				</template>
				<template v-slot:item.action="{ item }">
					<span class="me-2"><v-btn variant="outlined" width="36" height="36" @click="removeTable(item)" icon="mdi-delete"
							color="#cc080b"></v-btn></span>
				</template>
				<template v-slot:bottom>
					<div class="text-center pt-2">
						<v-pagination v-model="getAllTableData.current_page" color="#cc080b" active-color="#cc080b" rounded="circle"
							:length="getAllTableData.totalPages"></v-pagination>
					</div>
				</template>
			</v-data-table>
		</div>
	</div>
	<div>
		<v-row justify="center">
			<v-dialog v-model="dialog" persistent width="700">
				<v-card>
					<v-card-title>
						<p class="text-h5 text-center pt-5">Assign Employee To a Table</p>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-row>
								<v-col cols="12" sm="6">
									<div>
										<img :src="imageUrl + 'table/' + dialogData.image" alt="" width="200">
									</div>
								</v-col>
								<v-col cols="12" sm="6">
									<div class="text-h5 mb-3">
										<span>Table ID: {{ dialogData.id }}</span>
									</div>
									<div class="text-h5 mb-3">
										<span>Number of seats: {{ dialogData.seats }}</span>
									</div>
									<v-select v-model="dialogData.employeeId" :items=getAllEmployee.data item-title="name" item-value="id" label="Select Employee"
										multiple></v-select>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue-darken-1" variant="text" @click="dialog = false">
							Close
						</v-btn>
						<v-btn color="blue-darken-1" variant="text" @click=" dialogFinal ">
							Save
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-row>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { imageUrl } from '../../constants/config'

export default {
	name: "AllTableList",
	data() {
		return {
			dialog: false,
			imageUrl: imageUrl,
			dialogData: {
				id: null,
				image: "",
				seats: 0,
				employeeId: []
			},
			headers: [
				{
					align: 'start',
					key: 'tableNumber',
					sortable: false,
					title: 'Table Number',
				},
				{ title: 'Number of Seats', key: 'numberOfSeats' },
				{ title: 'Booking Status', key: 'isOccupied', },
				{ title: 'Employees', key: 'employees' },
				{ title: 'Assign Employees', key: 'assignEmployees', align: 'center' },
				{ title: 'Action', key: 'action' },
			]
		}
	},
	computed: {
		...mapGetters({
			getAllTableData: "getAllTableData",
			getAllEmployee: "getAllEmployee"
		}),
	},
	methods: {
		...mapActions({
			fetchAllTable: 'fetchAllTable',
			fetchAllEmployee: 'fetchAllEmployee',
			assignEmployee: 'assignEmployee'
		}),
		removeTable(item) {
			console.log(item.raw.id);
		},
		openDialog(item) {
			this.dialog = true;
			console.log(item.raw.id);
			this.dialogData.id = item.raw.id;
			this.dialogData.image = item.raw.image
			this.dialogData.seats = item.raw.numberOfSeats
		},
		submitAssignEmployee() {
			console.log("submit");
		},
		dialogFinal() {
			this.dialog = false
			const data = [...this.dialogData.employeeId.map(item => {
				return { employeeId: item, tableId: this.dialogData.id }
			})];
			console.log(data);
			this.assignEmployee(data)
			this.dialogData = {
				id: null,
				image: "",
				seats: 0,
				employeeId: []
			}
		}
	},
	mounted() {
		this.fetchAllTable();
		this.fetchAllEmployee();
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