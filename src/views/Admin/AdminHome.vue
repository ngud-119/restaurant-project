<template>
  <!-- <CustomDialog></CustomDialog> -->
  <div>
    <div class="line-chart-container">
      <v-row>
        <v-col cols="12" xs="12" sm="6" lg="4">
          <AreaLineChart
            :data="{
              name: 'orders',
              stat: '1248',
              icon: 'mdi-food-turkey',
              chartData: chartData,
              options: options
            }"
          ></AreaLineChart>
        </v-col>
        <v-col cols="12" xs="12" sm="6" lg="4">
          <AreaLineChart
            :data="{
              name: 'menu',
              stat: '23',
              icon: 'mdi-format-list-bulleted',
              chartData: chartData,
              options: options
            }"
          ></AreaLineChart>
        </v-col>
        <v-col cols="12" xs="12" sm="6" lg="4">
          <AreaLineChart
            :data="{
              name: 'income',
              stat: '1248',
              icon: 'mdi-currency-bdt',
              chartData: chartData,
              options: options
            }"
          ></AreaLineChart>
        </v-col>
      </v-row>
      <div style="margin-top: 12px">
        <v-row>
          <v-col cols="12" lg="7">
            <BarChart></BarChart>
          </v-col>
          <v-col cols="12" lg="5">
            <DoughnutChart :data="{ doughnutData, doughnutOptions }"></DoughnutChart>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import AreaLineChart from '../../components/AreaLineChart.vue'

import BarChart from '../../components/BarChart.vue'
// import CustomDialog from '../../components/CustomDialog.vue'
import DoughnutChart from '../../components/DoughnutChart.vue'
import { doughnutData, doughnutOptions } from '../../components/graph-data/doughnutChart'
import { lineChartOptions, lineData } from '../../components/graph-data/lineChart'

export default {
  components: { AreaLineChart, BarChart, DoughnutChart },
  data() {
    return {
      chartData: lineData,
      options: lineChartOptions,
      doughnutData: doughnutData,
      doughnutOptions: doughnutOptions
    }
  }
}
</script>

<style lang="scss" scoped></style>
