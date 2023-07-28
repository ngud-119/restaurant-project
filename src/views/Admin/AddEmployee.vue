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
							<img class="preview-img" v-if="previewImg" :src="previewImg" alt="">
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
						<v-select label="Gender" v-model="genderInfo" :items="['Male', 'Female', 'others']">
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
import { mapActions } from 'vuex';

export default {
	name: "AddEmployee",
	data() {
		return {
			genderInfo: "",
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
				designation: "",
				image: "",
				base64: "",
			},
			previewImg: null
		}
	},
	methods: {
		...mapActions({
			postEmployee: 'postEmployee',
		}),
		submitAddEmployee() {
			console.log("sub");
			if (this.genderInfo === "Male") {
				this.employee.genderId = 1
			}
			else if (this.genderInfo === "Female") {
				this.employee.genderId = 2
			}
			else {
				this.employee.genderId = 3
			}

			this.postEmployee(this.employee)

			console.log(this.employee);

		},
		openFile() {
			//document.getElementById("img").click()
		},
		onImageSelect(e) {
			console.log(e.target.files[0]);
			this.previewImg = URL.createObjectURL(e.target.files[0]);
			this.employee.image = e.target.files[0].name;
			this.createBase64Image(e.target.files[0]);
		},
		createBase64Image(fileObject) {
			const reader = new FileReader();
			reader.onload = (e) => {
				// console.log("base 64 working", e.target.result);
				this.employee.base64 = e.target.result;
			};
			reader.readAsDataURL(fileObject);
		},
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/config";
@import "../../assets/responsive";

.image-selection-input {
	label[for="img"] {
		display: block;
		border: 1px solid lightgray;
		height: 213px;

		.img-input-field {
			display: none;
		}

		.preview-img {
			width: 100%;
			height: 155px;
			object-fit: cover;
		}
	}


}

.submit-btn {
	background-color: $primary;
	padding: 25px 0px;
	color: white;
}
</style>