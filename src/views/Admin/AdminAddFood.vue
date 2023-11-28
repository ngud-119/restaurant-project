<template>
  <div>
    <h2 class="mb-8 heading-font">Add Food</h2>
    <div class="form-container elevation-5">
      <v-form validate-on="submit lazy" ref="addFoodForm" @submit.prevent="submitAddFood">
        <v-row>
          <v-col cols="12" lg="8" class="order-last order-lg-first">
            <v-text-field
              class="pb-3"
              v-model="addFoodData.name"
              label="Food Name"
              variant="outlined"
              color="#79a33d"
              :rules="foodNameRules"
              required
            ></v-text-field>
            <v-textarea
              class=""
              v-model="addFoodData.description"
              label="Description"
              variant="outlined"
              color="#79a33d"
              :rules="descriptionRules"
              required
            ></v-textarea>
          </v-col>
          <v-col class="image-selection-input order-first order-lg-last" cols="12" lg="4">
            <label for="img">
              <v-container v-if="!previewImg" class="text-center">
                <p>Add Food Image</p>
              </v-container>
              <v-file-input
                class="img-input-field"
                @change="onImageSelect"
                name="img"
                id="img"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an Image"
                prepend-icon="mdi-camera"
                label="Image"
                :rules="imgRules"
                required
              ></v-file-input>
              <img class="preview-img" v-if="previewImg" :src="previewImg" alt="preview_img" />
            </label>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="3">
            <v-text-field
              v-model="addFoodData.price"
              label="Price"
              variant="outlined"
              color="#79a33d"
              :rules="priceRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3">
            <v-select
              :items="discountTypeData"
              v-model="addFoodData.discountType"
              item-title="value"
              item-value="key"
              label="Select Discount Type"
              variant="outlined"
              color="#79a33d"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="3">
            <v-text-field
              @update:modelValue="onChangeDiscount"
              :label="addFoodData.discountType === 1 ? 'Discount in (৳)' : 'Discount in (%)'"
              v-model="addFoodData.discount"
              variant="outlined"
              color="#79a33d"
              :disabled="addFoodData.discountType === 0 && true"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="3">
            <v-text-field
              label="Discounted Price"
              :active="true"
              v-model="addFoodData.discountPrice"
              variant="outlined"
              color="#79a33d"
              :disabled="addFoodData.discountType === 0 && true"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn type="submit" block class="mt-2 px-10 submit-btn" text="Submit"></v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AdminAddFood',
  data() {
    return {
      previewImg: null,
      foodNameRules: [(foodNameRules) => !!foodNameRules || 'Food Name is required'],
      imgRules: [(imgRule) => !!imgRule || 'Image is required'],
      descriptionRules: [(desc) => !!desc || 'Description is required'],
      priceRules: [(price) => !(price <= 0) || 'Price should be greater than 0'],
      discountTypeData: [
        { key: 0, value: 'None' },
        { key: 1, value: 'Flat' },
        { key: 2, value: 'Percentage' }
      ],
      addFoodData: {
        name: '',
        description: '',
        price: parseInt(0),
        discountType: 0,
        discount: parseInt(0),
        discountPrice: parseInt(0),
        image: '',
        base64: ''
      }
    }
  },
  computed: {
    // calculatePricePercentage() {
    // 	return ((parseInt(this.addFoodData.price)) - (parseInt(this.addFoodData.discount) / 100) * parseInt(this.addFoodData.price))
    // }
  },
  watch: {
    'addFoodData.discountType'() {
      this.addFoodData.discount = 0
      this.addFoodData.discountPrice = 0
    }
    // 'addFoodData.discountPrice'(value) {
    // 	if (this.addFoodData.price > 0 && this.addFoodData.discountType == 1) {
    // 		this.addFoodData.discount = this.addFoodData.price - value
    // 	} else if (this.addFoodData.price > 0 && this.addFoodData.discountType == 2) {
    // 		this.addFoodData.discountPrice = this.addFoodData.price - ((this.addFoodData.price * value) / 100)
    // 	}
    // }
  },
  methods: {
    ...mapActions({
      postFoodDetails: 'postFoodDetails'
    }),

    onChangeDiscount($e) {
      if (this.addFoodData.price > 0 && this.addFoodData.discountType == 1) {
        this.addFoodData.discountPrice = this.addFoodData.price - $e
      } else if (this.addFoodData.price > 0 && this.addFoodData.discountType == 2) {
        this.addFoodData.discountPrice =
          this.addFoodData.price - (this.addFoodData.price * $e) / 100
      }
    },
    async submitAddFood() {
      const { valid } = await this.$refs.addFoodForm.validate()
      console.log(valid)
      if (valid) {
        const data = {
          ...this.addFoodData,
          price: parseInt(this.addFoodData.price),
          discount: parseInt(this.addFoodData.discount),
          discountPrice: parseInt(this.addFoodData.discountPrice),
          discountType: parseInt(this.addFoodData.discountType)
        }
        console.log(data)
        this.postFoodDetails(data)
        this.addFoodData = {
          name: '',
          description: '',
          price: parseInt(0),
          discountType: 0,
          discount: parseInt(0),
          discountPrice: parseInt(0),
          image: '',
          base64: ''
        }
        this.previewImg = null
      }
    },

    onImageSelect(e) {
      console.log(e.target.files[0])
      this.previewImg = URL.createObjectURL(e.target.files[0])
      this.addFoodData.image = e.target.files[0].name
      this.createBase64Image(e.target.files[0])
    },
    createBase64Image(fileObject) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.addFoodData.base64 = e.target.result
      }
      reader.readAsDataURL(fileObject)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/config';
@import '../../assets/responsive';

.form-container {
  background-color: white;
  padding: 0px 10px 30px 10px;

  @include lg {
    padding: 40px;
  }
  .image-selection-input {
    label[for='img'] {
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
}
</style>
