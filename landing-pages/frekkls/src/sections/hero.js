import React from 'react'
import styled from 'styled-components'

import BgTop from '../images/bg-top.svg'
import Button from '../components/button'
import Container from '../components/container'
import HomeTop from '../images/home-top@2x.png'
import Section from '../components/section'
import { C50 } from '../components/grid'

const StyledHomeTopImage = styled.img.attrs({
  src: HomeTop,
})`
  object-fit: contain;
  margin: 0 auto;
  max-width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 500px) {
    max-width: 500px;
  }

  @media (min-width: 900px) {
    position: absolute;
    height: 46vw;
    max-height: 80%;
    min-height: 50%;
    max-width: none;
    margin: 0;
    width: auto;
    right: -6%;
    top: 10px;
  }
`

const Hero = styled(({ className, hero }) => (
  <Section className={className}>
    <Container>
      <StyledHomeTopImage />
      <C50>
        <h2>{hero.openerHeading}</h2>
        <h3>{hero.openerSubHeading}</h3>
        <Button className="js-request-demo" type="button">
          {hero.openerCta}
        </Button>
      </C50>
      <C50 />
    </Container>
  </Section>
))`
  background-image: url('${BgTop}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 25% bottom;
  background-origin: content-box;

  ${Container} {
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: 30px;
    line-height: 1.13;
  }

  h3 {
    font-size: 20px;
    line-height: 1.2;
    color: #565656;
  }

  ${Button} {
    margin-top: 10px;
  }

  @media (min-width: 900px) {
    text-align: left;
    background-repeat: no-repeat;
    background-position: 50%;
    background-origin: border-box;

    ${Container} {
      flex-direction: row;
      padding-top: 130px;
      padding-bottom: 200px;
      position: relative;
    }

    ${C50} {
      z-index: 1;
    }

    h2 {
      font-size: 53px;
    }

    h3 {
      font-size: 26px;
      line-height: 34px;
    }
  }
`

export default Hero
