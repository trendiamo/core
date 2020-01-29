import React from 'react'
import Section from '../../components/section'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  margin: 120px 0;
  text-align: center;
`

const HeaderText = styled.div`
  color: #111;
  font-weight: 900;
  font-size: 26px;
  text-align: left;
  line-height: 1.36;

  @media (min-width: 1000px) {
    font-size: 36px;
    text-align: center;
  }
`

const MainDescription = styled.div`
  color: #111;
  line-height: 1.36;
  width: 100%;
  font-size: 20px;
  margin: 24px auto 0;
  text-align: left;

  @media (min-width: 1000px) {
    font-size: 28px;
    width: 1025px;
  }
`

const StrongVision = ({ data }) => (
  <Section>
    <Container>
      <HeaderText>{data.jobs.value.middleHeading}</HeaderText>
      <MainDescription>{data.jobs.value.middleDescription}</MainDescription>
    </Container>
  </Section>
)

export default StrongVision
