import React, { useEffect, useMemo, useRef, useState } from 'react'
import { addDays, format, isPast } from 'date-fns'
import { Line } from 'react-chartjs-2'

const createChartGradient = ctx => {
  const gradient = ctx.createLinearGradient(150, 0, 150, 300)
  gradient.addColorStop(0, '#0f7173')
  gradient.addColorStop(1, 'rgba(15, 113, 115, 0.14)')
  return gradient
}

const config = gradient => ({
  fill: true,
  lineTension: 0.1,
  backgroundColor: gradient,
  borderColor: '#0f7173',
  pointBorderColor: '#ffffff',
  pointBackgroundColor: '#0f7173',
})

const options = {
  legend: {
    display: false,
  },
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    xAxes: [
      {
        gridLines: { color: '#272932', drawOnChartArea: false, drawTicks: false, lineWidth: 2 },
        ticks: {
          fontColor: '#272932',
          padding: 10,
        },
      },
    ],
    yAxes: [
      {
        gridLines: { color: '#272932', drawOnChartArea: false, drawTicks: false, lineWidth: 2 },
        ticks: { display: false },
      },
    ],
  },
  tooltips: {
    backgroundColor: '#272932',
    displayColors: false,
    callbacks: {
      label: record => (record.yLabel > 0 ? `💰 ${record.yLabel}${config.currency}` : 'No earnings'),
      title: records => format(new Date(records[0].xLabel), 'MMMM d'),
    },
  },
}

const getEmptyRevenuesInRange = (startDate, endDate) => {
  const emptyOrders = []
  let date = startDate
  while (date <= endDate) {
    emptyOrders.push({ capturedAt: date, sellerAmount: 0 })
    date = addDays(date, 1)
  }
  return emptyOrders
}

const Activity = ({ dates, orders }) => {
  const chartRef = useRef(null)
  const [chartData, setChartData] = useState({})

  const revenues = useMemo(() => {
    const [startDate, endDate] = [
      new Date(dates.from_date),
      (isPast(new Date(dates.to_date)) && new Date(dates.to_date)) || new Date(),
    ]
    const emptyOrders = getEmptyRevenuesInRange(startDate, endDate)
    return [...orders, ...emptyOrders]
      .reduce((revenues, order) => {
        const date = format(new Date(order.capturedAt), 'MMM d')
        const revenue = revenues.find(revenue => revenue.date === date)
        if (revenue) {
          revenue.value += +order.sellerAmount
        } else {
          revenues.push({ date, value: +order.sellerAmount })
        }
        return revenues
      }, [])
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [dates, orders])

  useEffect(() => {
    config.currency = orders[0].currency
    const data = revenues.map(revenue => revenue.value.toFixed(2))
    const labels = revenues.map(revenue => revenue.date)
    const gradient = createChartGradient(chartRef.current.chartInstance.ctx)
    setChartData({ labels, datasets: [{ data, ...config(gradient) }] })
  }, [orders, revenues])

  return <Line data={chartData} options={options} ref={chartRef} />
}

export default Activity
