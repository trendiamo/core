import React from 'react'
import styled from 'styled-components'

import BgBottom from '../images/bg-bottom.svg'
import Container from '../components/container'
import HomePlugin from '../images/home-plugin@2x.png'
import Section from '../components/section'
import { C50 } from '../components/grid'

const StyledHomePluginImage = styled.img.attrs({
  src: HomePlugin,
})`
  object-fit: contain;
  margin: 0 auto;
  max-width: 100%;

  @media (min-width: 500px) {
    max-width: 500px;
  }

  @media (min-width: 900px) {
    right: 20%;
    bottom: 0;
    position: absolute;
    height: 46vw;
    max-height: 80%;
    min-height: 50%;
    max-width: none;
    margin: 0;
    width: auto;
  }
`

const Bottom = styled(({ className, bottom }) => (
  <div className={className}>
    <Section>
      <Container>
        <C50>
          <h3>{bottom.signup2Heading}</h3>
          <p>{bottom.signup2Text}</p>
          <div className="email-input email-input-2" />
        </C50>
        <C50 />
      </Container>
    </Section>
    <StyledHomePluginImage />
  </div>
))`
  ${Section} {
    text-align: left;
    background-color: #f2f4f7;
  }

  @media (min-width: 900px) {
    position: relative;

    ${Section} {
      background-color: transparent;
      margin-top: -85px;
      padding-top: 200px;
      padding-bottom: 200px;
      background-image: url('${BgBottom}');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top;
    }

    ${Container} {
      z-index: 1;
      display: flex;
    }
  }
`

export default Bottom
