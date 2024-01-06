<template>
  <div class="bar-chart">
    <div class="details d-flex justify-space-between">
      <h4 class="font-weight-bold">Sales Figures</h4>
      <div>
        <v-select
          :hide-details="true"
          class="year-filter"
          :items="barYearFilter"
          item-title="value"
          item-value="key"
          v-model="selectedYear"
          variant="outlined"
          color="#79a33d"
          density="compact"
        ></v-select>
      </div>
    </div>
    <div class="chart">
      <Bar style="height: 300px" :data="barData" :options="barChartOptions" />
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { barData, barChartOptions } from './graph-data/barChart'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
  name: 'barChart',
  components: {
    Bar
  },
  data() {
    return {
      barData: barData,
      barChartOptions: barChartOptions,
      selectedYear: { key: 0, value: '2023 - 2024' },
      barYearFilter: [
        { key: 0, value: '2023 - 2024' },
        { key: 1, value: '2022 - 2023' },
        { key: 2, value: '2021 - 2022' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.bar-chart {
  background-color: rgba(234, 234, 234, 0.549);
  background-color: white;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;

  .details {
    margin-bottom: 20px;

    h4 {
      font-size: 28px;
    }

    .year-filter {
      min-width: 140px;
    }
  }
}
</style>
7654    