<template>
  <div>
    <div class="heading-container mb-8">
      <h2 class="heading-font">Order Food</h2>
    </div>
    <!-- <div>
      <v-row>
        <v-col cols="12" lg="6">
          <div>
            <p>Select Table</p>
          </div>
        </v-col>
        <v-col cols="12" lg="6">
          <div>
            <p>Select Food</p>
          </div>
        </v-col>
      </v-row>
    </div> -->
    <div>
      <div>
        <div class="table-select" v-if="currentStep === 1">
          <h4>Select Table</h4>
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div v-if="currentStep === 2"><h1>step 2</h1></div>
      </div>
      <v-btn @click="changeStep">Next...</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'orderFood',
  data() {
    return {
      currentStep: 1
    }
  },
  computed: {
    ...mapGetters({
      getAllEmployee: 'getAllEmployee'
    })
  },
  methods: {
    changeStep() {
      if (this.currentStep >= 3) {
        console.log('as')
      } else {
        this.currentStep += 1
        console.log(this.currentStep)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-select{
    height: 400px;
}
</style>
