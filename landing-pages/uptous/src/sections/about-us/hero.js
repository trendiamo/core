import React from 'react'
import Section from '../../components/section'
import styled from 'styled-components'

const HeaderText = styled.h2`
  color: white;
  font-weight: 900;
  font-size: 26px;
  text-align: left;

  @media (min-width: 1000px) {
    font-size: 36px;
    text-align: left;
  }
`

const MainDescription = styled.div`
  color: white;
  margin-top: 32px;
  line-height: 1.36;
  width: 100%;
  font-size: 20px;

  @media (min-width: 1000px) {
    font-size: 22px;
    width: 564px;
  }
`

const Container = styled.div`
  width: 100%;
  margin: 60px 0;

  @media (min-width: 1000px) {
    margin: 180px 0 150px;
  }
`

const AboutUsHero = ({ data }) => (
  <Section>
    <Container>
      <HeaderText>Unlocking the best prices for the best, sustainable products</HeaderText>
      <MainDescription>in order to unleash a fashion industry that is affordable and good for everyone - including our planet</MainDescription>
    </Container>
  </Section>
)

export default AboutUsHero
