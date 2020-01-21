import React, { useCallback, useEffect, useState } from 'react'
import Section from '../components/section'
import styled from 'styled-components'

const Text = styled.div`
  color: #111;
  font-weight: 700;
  font-size: 22px;
  text-align: center;
  line-height: 1.2;

  @media (min-width: 1000px) {
    font-size: 28px;
    text-align: left;
  }
`

const CounterContainer = styled.div`
  display: flex;
  margin-top: 32px;
  justify-content: space-around;

  @media (min-width: 1000px) {
    justify-content: center;
  }
`

const Indicator = styled.div`
  width: 33%;

  @media (min-width: 1000px) {
    width: auto;
    & + & {
      margin-left: 75px;
    }
  }
`

const Digit = styled.div`
  font-weight: 700;
  text-align: center;
  font-size: 40px;
  color: #111;

  @media (min-width: 1000px) {
    font-size: 64px;
  }
`

const Description = styled.div`
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  color: #111;

  @media (min-width: 1000px) {
    font-size: 24px;
  }
`

const Container = styled.div`
  padding: 40px 0;
  @media (min-width: 1000px) {
    padding: 90px 0 80px;
  }
`

const addZero = digit => ('0' + digit).slice(-2)

const date = '2020-03-01'

const OpeningCounter = ({ data }) => {
  const [remainingTime, setRemainingTime] = useState(null)

  const updateTimer = useCallback(() => {
    const difference = +new Date(date) - +new Date()

    const parts = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }

    parts.days = addZero(parts.days)
    parts.hours = addZero(parts.hours)
    parts.minutes = addZero(parts.minutes)
    parts.seconds = addZero(parts.seconds)

    setRemainingTime(parts)
  }, [])

  useEffect(() => {
    updateTimer()
    const counterInterval = window.setInterval(updateTimer, 1000)
    return () => window.clearInterval(counterInterval)
  }, [updateTimer])

  return (
    <Section>
      <Container>
        <Text>{data.layout.value.timer.heading}</Text>
        {remainingTime && (
          <CounterContainer>
            <Indicator>
              <Digit>{remainingTime.days}</Digit>
              <Description>{data.layout.value.timer.days}</Description>
            </Indicator>
            <Indicator>
              <Digit>{remainingTime.hours}</Digit>
              <Description>{data.layout.value.timer.hours}</Description>
            </Indicator>
            <Indicator>
              <Digit>{remainingTime.minutes}</Digit>
              <Description>{data.layout.value.timer.minutes}</Description>
            </Indicator>
          </CounterContainer>
        )}
      </Container>
    </Section>
  )
}

export default OpeningCounter
