import CircularProgress from 'shared/circular-progress'
import React, { useEffect, useState } from 'react'
import Section from 'shared/section'
import { apiEventList, apiRequest } from 'utils'
import { Line } from 'react-chartjs-2'
import { useSnackbar } from 'notistack'

const config = {
  label: 'Conversion Rate',
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(255, 102, 65, 0.4)',
  borderColor: '#ff6641',
  pointBorderColor: '#ff6641',
  pointBackgroundColor: '#f5f5f5',
  pointHoverBackgroundColor: '#ff6641',
  pointHoverBorderColor: '#f5f5f5',
}

const dates = {
  from_date: '2019-06-01',
  to_date: '2019-07-01',
}

const ConversionRate = () => {
  const [chartData, setChartData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiEventList, [{ dates: JSON.stringify(dates) }])
        if (requestError) {
          enqueueSnackbar(requestError, { variant: 'error' })
        } else {
          const labels = json.map(record => +record.date.split('-').pop())
          const data = json.map(record => Math.round(record.conversionRate * 100) / 100)
          setChartData({ labels, datasets: [{ data, ...config }] })
          setIsLoading(false)
        }
      })()
    },
    [enqueueSnackbar]
  )

  return <Section title="Conversion Rate">{isLoading ? <CircularProgress /> : <Line data={chartData} />}</Section>
}

export default ConversionRate
