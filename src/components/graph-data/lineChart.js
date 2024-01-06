export const lineData = {
  labels: ['', '', '', '', '', ''],
  datasets: [
    {
      label: '',
      data: [20, 32, 50, 34, 60, 60],
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
      animation: {
        onComplete: () => {
          // eslint-disable-next-line no-unused-labels
          delayed: true
        },
        delay: (context) => {
          let delay = 0
          if (context.type === 'data' && context.mode === 'default') {
            delay = context.dataIndex * 400
          }
          return delay
        }
      },
      fill: 'start',
      stepped: true,
      borderColor: 'rgba(204, 8, 11, 1)',
      pointStyle: 'circle',
      pointRadius: 2,
      pointHoverRadius: 10,
      tension: 0
    }
  ]
}

export const lineChartOptions = {
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
