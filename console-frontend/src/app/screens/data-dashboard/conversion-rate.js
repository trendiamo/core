import CircularProgress from 'shared/circular-progress'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { apiEventList, apiRequest } from 'utils'
import { Line } from 'react-chartjs-2'
import { useSnackbar } from 'notistack'

const ErrorMessage = styled.p`
  color: #32333d;
  font-size: 15px;
  font-weight: lighter;
  margin-top: 35px;
  text-align: center;
`

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
          max: 100,
        },
      },
    ],
  },
  tooltips: {
    callbacks: {
      label: tooltipItem => `${tooltipItem.yLabel}% conversion`,
      title: tooltipItem => moment(tooltipItem[0].xLabel, 'MMM D').format('MMMM D'),
    },
  },
}

const dates = {
  from_date: '2019-06-01',
  to_date: '2019-07-01',
}

const ConversionRate = () => {
  const [chartData, setChartData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [hasErrors, setHasErrors] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiEventList, [{ dates: JSON.stringify(dates) }])
        if (requestError) {
          enqueueSnackbar(requestError, { variant: 'error' })
          setHasErrors(true)
        } else {
          const labels = json.map(record => moment(record.date).format('MMM D'))
          const data = json.map(record => Math.round(record.conversionRate * 100))
          setChartData({ labels, datasets: [{ data, ...config }] })
        }
        setIsLoading(false)
      })()
    },
    [enqueueSnackbar]
  )

  return (
    <Section title="Conversion Rate">
      {isLoading ? (
        <CircularProgress />
      ) : hasErrors ? (
        <ErrorMessage>{'⚠️ There was a problem loading your data, please try again or contact us.'}</ErrorMessage>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </Section>
  )
}

export default ConversionRate
