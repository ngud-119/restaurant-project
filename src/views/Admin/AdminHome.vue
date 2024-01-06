<template>
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
    </div>
  </div>
</template>

<script>
import AreaLineChart from '../../components/AreaLineChart.vue'
import { lineChartOptions, lineData } from '../../components/graph-data/lineChart'

export default {
  components: { AreaLineChart },
  data() {
    return {
      chartData: lineData,
      options: lineChartOptions
    }
  }
}
</script>

<style lang="scss" scoped></style>
