import React from 'react'
import Section from '../components/section'
import styled from 'styled-components'

const Text = styled.div`
  font-size: 22px;
  text-align: center;
  color: #111;
  font-weight: 900;
  margin-top: 40px;
  line-height: 1.2;

  @media (min-width: 1000px) {
    font-size: 26px;
    margin: 40px 0 20px;
  }
`

const BottomHeadline = ({ data }) => (
  <Section>
    <Text>{data.home.lastPart}</Text>
  </Section>
)

export default BottomHeadline
