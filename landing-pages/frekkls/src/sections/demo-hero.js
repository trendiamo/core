import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'
import { FeatureButton } from '../components/button'
import { FeatureCard, FeatureCards } from '../components/cards'

import BgTop from '../images/demo/bg-top.svg'

const Cards = ({ demoHero }) => (
  <FeatureCards>
    <FeatureCard>
      <img alt="" src={demoHero.card1Image.fixed.src} />
      <h1 dangerouslySetInnerHTML={{ __html: demoHero.card1Heading.childContentfulRichText.html }} />
      <p>{demoHero.card1Text}</p>
      <a
        href="https://demo.frekkls.com/wetsuits_filtered_intermediate.html#trnd:open:1,path:/showcase/21/spotlight/43"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FeatureButton>{demoHero.card1Cta}</FeatureButton>
      </a>
    </FeatureCard>
    <FeatureCard>
      <img alt="" src={demoHero.card2Image.fixed.src} />
      <h1 dangerouslySetInnerHTML={{ __html: demoHero.card2Heading.childContentfulRichText.html }} />
      <p>{demoHero.card2Text}</p>
      <a
        href="https://demo.frekkls.com/surfboards_filtered_beginner.html#trnd:open:1,path:/showcase/15/spotlight/37"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FeatureButton>{demoHero.card2Cta}</FeatureButton>
      </a>
    </FeatureCard>
    <FeatureCard>
      <img alt="" src={demoHero.card3Image.fixed.src} />
      <h1 dangerouslySetInnerHTML={{ __html: demoHero.card3Heading.childContentfulRichText.html }} />
      <p>{demoHero.card3Text}</p>
      <a href="https://demo.frekkls.com" rel="noopener noreferrer" target="_blank">
        <FeatureButton>{demoHero.card3Cta}</FeatureButton>
      </a>
    </FeatureCard>
  </FeatureCards>
)

const DemoHero = styled(({ className, demoHero }) => (
  <Section className={className}>
    <Container>
      <h3>{demoHero.pageHeading}</h3>
      <div className="description">
        <p>{demoHero.pageSubHeading}</p>
        <Cards demoHero={demoHero} />
      </div>
    </Container>
  </Section>
))`
  position: relative;
  background-image: url('${BgTop}');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 0 140px;
  overflow: hidden;
  padding-top: 0;
  padding-bottom: 40px;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 141px;
    background-color: #ff6d40;
    z-index: -1;
  }

  h3 {
    font-size: 23px;
    padding-top: 40px;
    margin: 0;
    color: #fff;
    padding-bottom: 12px;
    font-weight: 700;
    text-shadow: rgba(0,0,0,.6) 1px 2px 1px;
  }

  .description {
    padding-bottom: 70px;
  }

  p {
    color: #fff;
  }

  @media (min-width: 600px) {
    h3 {
      font-size: 30px;
      padding-top: 60px;
    }
  }
`

export default DemoHero
