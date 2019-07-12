import CircularProgress from 'shared/circular-progress'
import ErrorMessage from './error-message'
import React, { useEffect, useState } from 'react'
import { apiEventList, apiRequest } from 'utils'
import { Bar } from 'react-chartjs-2'
import { format } from 'date-fns'
import { useSnackbar } from 'notistack'

const withPluginDatasetConfig = {
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgb(255, 102, 65)',
  borderColor: '#ff6641',
  pointBorderColor: '#ff6641',
  pointBackgroundColor: '#f5f5f5',
  pointHoverBackgroundColor: '#ff6641',
  pointHoverBorderColor: '#f5f5f5',
}

const chartOptions = ({ currency }) => {
  const currencyFormatter = new Intl.NumberFormat('de', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            callback: value => currencyFormatter.format(value),
            min: 0,
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, info) =>
          `${info.datasets[tooltipItem.datasetIndex].label}: ${currencyFormatter.format(tooltipItem.yLabel)}`,
        title: tooltipItem => format(new Date(tooltipItem[0].xLabel), 'MMMM d'),
      },
    },
  }
}

const AvgCartValue = ({ dates }) => {
  const [chartData, setChartData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [hasErrors, setHasErrors] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiEventList, [
          { dates: JSON.stringify(dates), chart: 'avg_cart_value' },
        ])
        if (requestError) {
          enqueueSnackbar(requestError, { variant: 'error' })
          setHasErrors(true)
        } else {
          const labels = json.map(record => format(new Date(record.date), 'MMM d'))
          const withPluginData = json.map(record => record.withPluginTotal)
          const withoutPluginData = json.map(record => record.withoutPluginTotal)
          setChartData({
            labels,
            currency: json[0].currency,
            datasets: [
              { data: withoutPluginData, label: 'Without plugin' },
              { ...withPluginDatasetConfig, data: withPluginData, label: 'With plugin' },
            ],
          })
        }
        setIsLoading(false)
      })()
    },
    [dates, enqueueSnackbar]
  )

  if (isLoading) return <CircularProgress />

  if (hasErrors) {
    return <ErrorMessage>{'⚠️ There was a problem loading your data, please try again or contact us.'}</ErrorMessage>
  }

  return <Bar data={chartData} options={chartOptions(chartData)} />
}

export default AvgCartValue
