import React from 'react'
import Section from '../../components/section'
import styled from 'styled-components'

const HeaderText = styled.div`
  color: #111;
  font-weight: 900;
  font-size: 26px;
  text-align: left;

  @media (min-width: 1000px) {
    font-size: 36px;
    text-align: left;
  }
`

const MainDescription = styled.div`
  color: #111;
  margin-top: 32px;
  line-height: 1.2;
  width: 100%;
  font-size: 20px;

  @media (min-width: 1000px) {
    font-size: 28px;
    width: 600px;
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
      <HeaderText>{data.aboutUs.heroHeading}</HeaderText>
      <MainDescription>{data.aboutUs.heroSubHeading}</MainDescription>
    </Container>
  </Section>
)

export default AboutUsHero
