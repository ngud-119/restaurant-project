<template>
	<div>
		<div class="d-flex align-center justify-space-between mb-8">
			<h2>All Employee List</h2>
			<v-btn class="add-btn" @click='addEmployee'>
				Add Table
			</v-btn>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: "AllTableList",
	methods: {
		...mapActions({
			fetchAllTable: 'fetchAllTable'
		}),
	},
	mounted() {
		this.fetchAllTable()
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