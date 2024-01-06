<template>
  <div class="line-chart">
    <div class="details">
      <div>
        <v-icon class="icon" size="32" :icon="data.icon"></v-icon>
      </div>
      <div class="content">
        <p>{{ data.name }}</p>
        <h4>{{ data.stat }}</h4>
      </div>
    </div>
    <div class="chart">
      <Line :data="data.chartData" :options="data.options" />
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default {
  name: 'areaLineChart',
  props: ['data'],
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Line
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/config';
@import '../assets/responsive';
.line-chart {
  background-color: rgba(234, 234, 234, 0.549);
  background-color: white;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  .details {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px;
    .icon {
      color: $primary;
      background-color: rgba(204, 8, 11, 0.2);
      padding: 26px;
      border-radius: 100%;
    }

    .content {
      p {
        font-size: 14px;
        color: rgb(130, 130, 130);
        text-transform: capitalize;
      }
      h4 {
        font-size: 28px;
      }
    }
  }

  .chart {
    padding: 0px 0px;
  }
}
</style>
