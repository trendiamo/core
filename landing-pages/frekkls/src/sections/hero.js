import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import HeroImg from '../images/hero'
import Section from '../components/section'

const Hero = styled(({ className }) => (
  <Section className={className}>
    <div className="hero-img-container">
      <HeroImg />
    </div>
    <div className="hero-text-container">
      <div className="left-hero-pad">
        <h2>{'Turn Socials into Sellers.'}</h2>
        <p>{'Integrate people and their content as sellers directly into your shop.'}</p>
        <Button big className="js-request-demo" color="#f75c35">
          {'Get Started'}
        </Button>
      </div>
    </div>
  </Section>
))`
  flex-direction: column;
  @media (min-width: 900px) {
    flex-direction: row-reverse;
    align-items: stretch;
  }

  .hero-text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hero-img-container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(to bottom, #f76040 0%, #f76040 50%, #f45b39 50%, #f45b39 100%);
  }
  @media (min-width: 900px) {
    .hero-img-container {
      width: auto;
    }
  }

  .left-hero-pad {
    padding-left: 4vw;
    padding-right 4vw;
    padding-top: 4vw;
    padding-bottom: 4vw;
  }

  @media (min-width: 900px) {
    .left-hero-pad {
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  h2 {
    width: 100%;
    font-size: 6vw;
    font-weight: bold;
    line-height: 1.25;
    margin-bottom: 1.5vh;
  }

  p {
    font-size: 2.1vw;
    line-height: 1.25;
  }

  & > div {
    flex: 1;
  }

  @media (max-width: 899px) {
    h2 {
      font-size: 10vw;
    }

    p {
      font-size: 6vw;
    }

    button {
      width: 100%;
      font-size: 5vw;
      padding: 10px;
    }
  }

`

export default Hero
