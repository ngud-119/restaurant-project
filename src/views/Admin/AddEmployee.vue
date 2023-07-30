<template>
	<div>
		<h2 class="mb-8">Add Employee</h2>

		<div class="form-container">
			<v-form validate-on="submit lazy" ref="addEmployeeForm" @submit.prevent="submitAddEmployee">
				<v-row>
					<v-col cols="12" lg="8" class="order-last order-lg-first">
						<v-text-field class="pb-3" v-model="employee.firstName" :rules="firstNameRules" label="First Name"
							required></v-text-field>
						<v-text-field class="pb-3" v-model="employee.middleName" :rules="middleNameRules"
							label="Middle Name" required></v-text-field>
						<v-text-field class="pb-3" v-model="employee.lastName" :rules="lastNameRules" label="Last Name"
							required></v-text-field>
					</v-col>
					<v-col class="image-selection-input order-first order-lg-last" cols="12" lg="4">
						<label for="img">
							<v-container v-if="!previewImg" class="text-center">
								<p>Add Profile Image</p>
							</v-container>
							<v-file-input class="img-input-field" @change="onImageSelect" name="img" id="img"
								accept="image/png, image/jpeg, image/bmp" placeholder="Pick an Image"
								prepend-icon="mdi-camera" label="Image" required></v-file-input>
							<img class="preview-img" v-if="previewImg" :src="previewImg" alt="">
						</label>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.spouseName" :rules="spouseNameRules" label="Spouse Name"
							required></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.fatherName" :rules="fatherNameRules" label="Father Name"
							required></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.motherName" :rules="motherNameRules" label="Mother Name"
							required></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.designation" :rules="designationRules" label="Designation"
							required></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.email" label="Email" :rules="emailRules" required></v-text-field>
					</v-col>
					<v-col cols="12" lg="4">
						<v-text-field v-model="employee.phoneNumber" :rules="phoneNumberRules" label="Phone Number"
							required></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" lg="3">
						<v-select label="Gender" v-model="genderInfo" :rules="genderRules"
							:items="['Male', 'Female', 'others']">
						</v-select>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field type="date" :rules="dateOfBirthRules" v-model="employee.dob"
							label="Date of Birth"></v-text-field>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field type="date" :rules="joinDateRules" v-model="employee.joinDate"
							label="Date of Join"></v-text-field>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field v-model="employee.nid" :rules="nidRules" label="NID" required></v-text-field>
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
			previewImg: null,

			firstNameRules: [
				firstName => !!firstName || 'First name is required',
				firstName => (firstName && firstName.length <= 10) || 'First name must be less than 10 characters',
				firstName => (!(/\d/.test(firstName))) || 'First name cannot contain any number'
			],

			middleNameRules: [
				middleName => !!middleName || 'Middle name is required',
				middleName => (middleName && middleName.length <= 10) || 'Middle name must be less than 10 characters',
				middleName => (!(/\d/.test(middleName))) || 'Middle name cannot contain any number'
			],

			lastNameRules: [
				lastName => !!lastName || 'Last name is required',
				lastName => (lastName && lastName.length <= 10) || 'Last name must be less than 10 characters',
				lastName => (!(/\d/.test(lastName))) || 'Last name cannot contain any number'
			],

			spouseNameRules: [
				spouseName => !!spouseName || 'Spouse name is required',
				spouseName => (spouseName && spouseName.length <= 10) || 'Spouse Name must be less than 10 characters',
				spouseName => (!(/\d/.test(spouseName))) || 'Spouse name cannot contain any number'
			],

			fatherNameRules: [
				fatherName => !!fatherName || 'Father name is required',
				fatherName => (fatherName && fatherName.length <= 10) || 'Father Name must be less than 10 characters',
				fatherName => (!(/\d/.test(fatherName))) || 'Father name cannot contain any number'
			],

			motherNameRules: [
				motherName => !!motherName || 'Mother name is required',
				motherName => (motherName && motherName.length <= 10) || 'Mother name must be less than 10 characters',
				motherName => (!(/\d/.test(motherName))) || 'Mother name cannot contain any number'
			],

			designationRules: [
				designation => !!designation || 'Designation name is required',
				designation => (!(/\d/.test(designation))) || 'Designation cannot contain any number'
			],

			emailRules: [
				email => !!email || 'Email name is required',
				email => ((/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(email))) || 'Not a valid email'
			],

			phoneNumberRules: [
				phoneNumber => !!phoneNumber || 'Phone number is required',
				phoneNumber => (phoneNumber?.length > 9 && /[0-11-]+/.test(phoneNumber)) || 'Phone number needs to be at least 11 digits'
			],

			genderRules: [
				gender => !!gender || 'Gender is required',
			],

			dateOfBirthRules: [
				dob => !!dob || 'Date of birth is required',
			],

			joinDateRules: [
				date => !!date || 'Date of join is required',
			],

			nidRules: [
				nid => !!nid || 'Nid Number is required',
				nid => (!(/[a-zA-Z]/.test(nid))) || 'NID number cannot contain any letter'
			]


		}
	},
	methods: {
		...mapActions({
			postEmployee: 'postEmployee',
		}),
		async submitAddEmployee() {
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
			const { valid } = await this.$refs.addEmployeeForm.validate()
			console.log(valid);
			if (valid) alert('Form is valid')
			//this.postEmployee(this.employee)

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
		border: 2px dashed lightgray;
		height: 238px;
		padding: 10px;

		.img-input-field {
			display: none;
		}

		.preview-img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}


}

.submit-btn {
	background-color: $primary;
	padding: 25px 0px;
	color: white;
}
</style>