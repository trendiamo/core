import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 1160px;
  margin: 100px auto 146px;
`

const Bar = styled.div`
  border: 1px solid #111;
  width: 100%;
  height: 80px;
  padding: 3px;
`

const Progress = styled.div`
  height: 100%;
  background: #111;
  opacity: 0;
  transition: all 1s 0.3s;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;

  &.aos-animate {
    transform: scaleX(0.2);
    opacity: 1;
  }
`

const Text = styled.div`
  color: #111;
  font-weight: 700;
  text-align: center;
  margin-bottom: 50px;
`

const Description = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`

const TickContainer = styled.div`
  width: 20%;
  height: 54px;
  border-left: 1px solid #111;
  transition: all 1s;
  transform: scaleY(0);
  transform-origin: top;
  margin-top: 5px;
  &:first-child {
    margin-left: 20%;
  }

  &.aos-animate {
    transform: scaleY(1);
  }
`

const Ticks = styled.div`
  display: flex;
`

const TickText = styled.div`
  padding: 5px 10px 10px;
  font-size: 18px;
  color: #111;
  opacity: 0;
  line-height: 1.2;

  &.aos-animate {
    opacity: 1;
  }
`

const Tick = ({ children, delay }) => (
  <TickContainer data-aos="progress-tick-animation" data-aos-delay={delay} data-aos-duration="600">
    <TickText data-aos="progress-tick-text-animation" data-aos-delay="1200" data-aos-duration="1000">
      {children}
    </TickText>
  </TickContainer>
)

const ProgressBar = () => {
  return (
    <Container>
      <Text>{'Get inspired and become part of our community'}</Text>
      <Description>{'The more we are, the more we can re-define the system.'}</Description>
      <Bar>
        <Progress data-aos="progress-bar-animation" data-aos-delay="800" data-aos-duration="1000" />
      </Bar>
      <Ticks>
        <Tick delay="200">
          {'Systemized'}
          <br />
          {'Pre-Orders'}
        </Tick>
        <Tick delay="400">
          {'On-Demand'}
          <br />
          {'Production'}
        </Tick>
        <Tick delay="600">
          {'+ Direct to Consumer'}
          <br />
          {'Production and Sales'}
        </Tick>
        <Tick delay="800">
          {'Highly sustainable'}
          <br />
          {'fabrics at scale'}
        </Tick>
      </Ticks>
    </Container>
  )
}

export default ProgressBar
