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

export default {
  components: { AreaLineChart },
  data() {
    return {
      chartData: {
        labels: ['', '', '', '', '', '', '', ''],
        datasets: [
          {
            label: '',
            data: [20, 20, 32, 32, 50, 50, 34, 34],
            //backgroundColor: 'rgba(204, 8, 11, 0.2)',
            backgroundColor: (context) => {
              const bgColor = ['rgba(204, 8, 11, 0.2)', 'rgba(234, 234, 234, 0.549)']
              if (!context.chart.chartArea) {
                return
              }
              const {
                ctx,
                chartArea: { top, bottom }
              } = context.chart
              const gradBG = ctx.createLinearGradient(0, top, 0, bottom)
              gradBG.addColorStop(0, bgColor[0])
              gradBG.addColorStop(1, bgColor[1])
              return gradBG
            },
            fill: 'start',
            borderColor: 'rgba(204, 8, 11, 1)',
            pointStyle: 'circle',
            pointRadius: 2,
            pointHoverRadius: 10,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 0
        },
        scales: {
          y: {
            min: 0,
            ticks: {
              display: false
            },
            grid: {
              display: false,
              drawTicks: false,
              drawBorder: false,
              drawOnChartArea: false
            }
          },
          x: {
            ticks: {
              display: false
            },
            grid: {
              display: false,
              drawTicks: false,
              drawBorder: false,
              drawOnChartArea: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
