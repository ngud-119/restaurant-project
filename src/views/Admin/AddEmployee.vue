<template>
	<div>
		<h2 class="py-10">Add Employee</h2>

		<div class="form-container">
			<v-form validate-on="submit lazy" @submit.prevent="submit">
				<v-row>
					<v-col cols="12" lg="4">
						<v-text-field v-model="userName" :rules="rules" label="First Name"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="userName" :rules="rules" label="Middle Name"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="userName" :rules="rules" label="Last Name"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="userName" :rules="rules" label="Father Name"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="userName" :rules="rules" label="Mother Name"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="userName" :rules="rules" label="Spouse Name"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="userName" :rules="rules" label="Email"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="userName" :rules="rules" label="Phone Number"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="userName" :rules="rules" label="Address"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-date-picker></v-date-picker>
					</v-col>
					<v-btn :loading="loading" type="submit" block class="mt-2" text="Submit"></v-btn>
				</v-row>
			</v-form>
		</div>
	</div>
</template>

<script>
export default {
	name: "AddEmployee",
}
</script>

<style lang="scss" scoped></style>