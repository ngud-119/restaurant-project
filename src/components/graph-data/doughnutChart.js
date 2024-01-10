export const doughnutData = {
  labels: ['Nougat', 'Fudge', 'Soup'],
  datasets: [
    {
      backgroundColor: ['#D31F68', '#cc080b', '#F2C8C9'],
      data: [20, 30, 40]
    }
  ]
}

export const doughnutOptions = {
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
        delay = context.dataIndex * 1000
      }
      return delay
    }
  }
}
