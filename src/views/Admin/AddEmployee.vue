<template>
	<div>
		<h2 class="mb-8">Add Employee</h2>

		<div class="form-container">
			<v-form validate-on="submit lazy" @submit.prevent="submitAddEmployee">
				<v-row>
					<v-col cols="12" lg="8">
						<v-text-field v-model="employee.firstName" label="First Name"></v-text-field>
						<v-text-field v-model="employee.middleName" label="Middle Name"></v-text-field>
						<v-text-field v-model="employee.lastName" label="Last Name"></v-text-field>
					</v-col>
					<v-col class="image-selection-input" cols="12" lg="4">
						<label for="img">
							<v-container class="text-center">
								<p class="">Add Profile Image</p>
							</v-container>
							<v-file-input class="img-input-field" @change="onImageSelect" name="img" id="img"
								accept="image/png, image/jpeg, image/bmp" placeholder="Pick an Image" prepend-icon="mdi-camera"
								label="Image"></v-file-input>
							<img v-if="employee.image" :src={} alt="">
						</label>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.spouseName" label="Spouse Name"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.fatherName" label="Father Name"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.motherName" label="Mother Name"></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.designation" label="Designation"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.email" label="Email"></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.phoneNumber" label="Phone Number"></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" lg="3">
						<v-select label="Gender" v-model="employee.genderId" :items="['Male', 'Female', 'others']">
						</v-select>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field type="date" v-model="employee.dob" label="Date of Birth"></v-text-field>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field type="date" v-model="employee.joinDate" label="Date of Join"></v-text-field>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field v-model="employee.nid" label="NID"></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-btn type="submit" block class="mt-2 submit-btn" text="Submit"></v-btn>
				</v-row>
			</v-form>
		</div>
	</div>
</template>

<script>
export default {
	name: "AddEmployee",
	data() {
		return {
			employee: {
				firstName: "",
				middleName: "",
				lastName: "",
				fatherName: "",
				motherName: "",
				spouseName: "",
				email: "",
				phoneNumber: "",
				genderId: 0,
				dob: "",
				joinDate: "",
				nid: "",
				nidVerifiedDate: "",
				nidVerifiedBy: "",
				designation: "",
				image: [],
				base64: "",
			}
		}
	},
	methods: {
		submitAddEmployee() {
			console.log("sub");
			console.log(this.employee);
		},
		openFile() {
			document.getElementById("img").click()
		},
		onImageSelect(e) {
			console.log(e);
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/config";
@import "../../assets/responsive";

.image-selection-input {
	label[for="img"] {
		display: block;
		padding: 30px;
		border: 1px solid lightgray;
		height: 91%;

		.img-input-field {
			display: none;
		}
	}


}

.submit-btn {
	background-color: $primary;
	padding: 25px 0px;
	color: white;
}
</style>