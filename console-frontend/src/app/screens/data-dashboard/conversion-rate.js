import CircularProgress from 'shared/circular-progress'
import ErrorMessage from './error-message'
import React, { useEffect, useState } from 'react'
import { apiEventList, apiRequest } from 'utils'
import { format } from 'date-fns'
import { Line } from 'react-chartjs-2'
import { useSnackbar } from 'notistack'

const config = {
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(255, 102, 65, 0.4)',
  borderColor: '#ff6641',
  pointBorderColor: '#ff6641',
  pointBackgroundColor: '#f5f5f5',
  pointHoverBackgroundColor: '#ff6641',
  pointHoverBorderColor: '#f5f5f5',
}

const options = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          callback: value => `${value}%`,
          min: 0,
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      label: tooltipItem => `${tooltipItem.yLabel}% conversion`,
      title: tooltipItem => format(new Date(tooltipItem[0].xLabel), 'MMMM d'),
    },
  },
}

const ConversionRate = ({ dates }) => {
  const [chartData, setChartData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [hasErrors, setHasErrors] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiEventList, [
          { dates: JSON.stringify(dates), chart: 'conversion_rate' },
        ])
        if (requestError) {
          enqueueSnackbar(requestError, { variant: 'error' })
          setHasErrors(true)
        } else {
          const labels = json.map(record => format(new Date(record.date), 'MMM d'))
          const data = json.map(record => Math.round(record.conversionRate * 100))
          setChartData({ labels, datasets: [{ data, ...config }] })
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

  return <Line data={chartData} options={options} />
}

export default ConversionRate
