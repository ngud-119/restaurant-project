<template>
	<div>
		<h2 class="mb-8">Add Table</h2>
		<div class="form-container">
			<v-form validate-on="submit lazy" ref="addTableForm" @submit.prevent="submitAddTable">
				<v-row>
					<v-col cols="12" lg="8" class="order-last order-lg-first">
						<v-text-field class="pb-3" v-model="tableData.tableNumber" :rules="tableNumberRules" label="Table Number"
							required></v-text-field>
						<v-select label="Number of seats" v-model="tableData.numberOfSeats" :rules="seatNumberRules"
							:items="['2', '4', '6', '8', '12']">
						</v-select>
					</v-col>
					<v-col class="image-selection-input order-first order-lg-last" cols="12" lg="4">
						<label for="img">
							<v-container v-if="!previewTableImg" class="text-center">
								<p>Add Profile Image</p>
							</v-container>
							<v-file-input class="img-input-field" @change="onImageSelect" name="img" id="img"
								accept="image/png, image/jpeg, image/bmp" placeholder="Pick an Image" prepend-icon="mdi-camera"
								label="Image" required></v-file-input>
							<img class="preview-img" v-if="previewTableImg" :src="previewTableImg" alt="">
						</label>
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
	name: "AddTable",
	data() {
		return {
			tableData: {
				tableNumber: "",
				numberOfSeats: 0,
				image: "",
				base64: ""
			},
			previewTableImg: null,

			tableNumberRules: [
				tableNumber => !!tableNumber || 'Table Number is required',
			],
			seatNumberRules: [
				seatNumber => !!seatNumber || 'Seat Number is required'
			]
		}
	},

	methods: {
		...mapActions({
			postTable: 'postTable',
		}),
		async submitAddTable() {
			const { valid } = await this.$refs.addTableForm.validate()
			if (valid) {
				console.log(this.tableData);
				this.postTable({ ...this.tableData, numberOfSeats: parseInt(this.tableData.numberOfSeats) });
				this.tableData = {
					tableNumber: "",
					numberOfSeats: 0,
					image: "",
					base64: ""
				};
			}
		},

		onImageSelect(e) {
			// console.log(e.target.files[0]);
			this.previewTableImg = URL.createObjectURL(e.target.files[0]);
			this.tableData.image = e.target.files[0].name;
			this.createBase64Image(e.target.files[0]);
		},
		createBase64Image(fileObject) {
			const reader = new FileReader();
			reader.onload = (e) => {
				// console.log("base 64 working", e.target.result);
				this.tableData.base64 = e.target.result;
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