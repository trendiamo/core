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
  text-align: center;

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
  text-align: center;
  margin: 30px auto;

  @media (min-width: 1000px) {
    font-size: 22px;
    width: 1000px;
    text-align: center;
  }
`

const StrongVision = ({ data }) => (
  <Section>
    <Container>
      <HeaderText>{data.aboutUs.middleHeading}</HeaderText>
      <MainDescription>{data.aboutUs.middleSubHeading}</MainDescription>
    </Container>
  </Section>
)

export default StrongVision
