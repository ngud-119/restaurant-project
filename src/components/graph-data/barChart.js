export const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: '',
      backgroundColor: '#cc080b',
      data: [4000, 7000, 1200, 5900, 1000, 4000, 6000, 8000, 4000, 2000, 1200, 1100],
      borderWidth: 0,
      barPercentage: 0.4,
      categoryPercentage: 1
    }
  ]
}

export const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    onComplete: () => {
      // eslint-disable-next-line no-unused-labels
      delayed: true
    },
    delay: (context) => {
      let delay = 0
      if (context.type === 'data' && context.mode === 'default') {
        delay = context.dataIndex * 200
      }
      return delay
    }
  },
  layout: {
    padding: 0
  },
  scales: {
    y: {
      min: 0,
      max: 10000,
      ticks: {
        stepSize: 2000
      },
      grid: {
        display: true,
        drawTicks: false,
        drawBorder: false,
        drawOnChartArea: true
      }
    },
    x: {
      grid: {
        display: false,
        drawTicks: false,
        drawBorder: false,
        drawOnChartArea: true
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}
