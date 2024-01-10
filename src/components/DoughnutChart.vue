<template>
  <div class="doughnut-chart">
    <div class="details d-flex justify-space-between">
      <div>
        <h4 class="font-weight-bold">Popular Food</h4>
        <span>On this week</span>
      </div>
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
      <Doughnut :data="data.doughnutData" :options="data.doughnutOptions" />
    </div>
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'doughnutChart',
  props: ['data'],
  components: {
    Doughnut
  },
  data() {
    return {
      selectedYear: { key: 0, value: '01 - 07, Jan' },
      barYearFilter: [
        { key: 0, value: '01 - 07, Jan 2024' },
        { key: 1, value: '08 - 14, Feb 2024' },
        { key: 2, value: '15 - 21, Mar 2024' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/config';
@import '../assets/responsive';
.doughnut-chart {
  background-color: rgba(234, 234, 234, 0.549);
  background-color: white;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;

  .details {
    margin-bottom: 20px;

    h4 {
      font-size: 22px;
    }
    span {
      font-size: 14px;
      color: rgb(130, 130, 130);
    }
  }
}
</style>
