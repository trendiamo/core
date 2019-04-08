import React from 'react'
import styled from 'styled-components'
import { navigate } from '@reach/router'

import Button from '../components/button'
import Container from '../components/container'
import locales from '../../locales'
import NadsDesktop from '../images/ads-desktop'
import NadsMobile from '../images/ads-mobile'
import Section from '../components/section'

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -40px;
  margin-right: -40px;
  @media (min-width: 900px) {
    flex-direction: row;
  }
`

const Flex1 = styled.div`
  flex: 1;
  margin-left: 40px;
  margin-right: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageContainer = styled.div`
  display: flex;
  position: relative;

  .nads-mobile {
    box-shadow: 0 0 15px 10px rgba(0, 0, 0, 0.2);
    border-radius: 30px 30px 0 0;
  }

  .nads-desktop {
    box-shadow: 3px 9px 26px 0 rgba(0, 0, 0, 0.13);
    border-radius: 3px 3px 0 0;
  }

  button {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 50%);

    @media (min-width: 900px) {
      bottom: 38px;
      right: -28px;
      left: auto;
      transform: translate(0%, 0%);
    }
  }
`

const NadsMobileContainer = styled.div`
  display: block;
  @media (min-width: 900px) {
    display: none;
  }
`

const NadsDesktopContainer = styled.div`
  display: none;
  @media (min-width: 900px) {
    display: block;
  }
`

const ImageAndButton = ({ ads, onClick }) => (
  <ImageContainer>
    <NadsMobileContainer>
      <NadsMobile alt="Ad preview" className="nads-mobile" />
    </NadsMobileContainer>
    <NadsDesktopContainer>
      <NadsDesktop alt="Ad preview" className="nads-desktop" />
    </NadsDesktopContainer>
    <Button onClick={onClick}>{ads.adsCta}</Button>
  </ImageContainer>
)

const Nads = styled(({ ads, className, locale }) => (
  <Section className={className}>
    <Container>
      <Flex>
        <Flex1>
          <h2>{ads.adsHeading}</h2>
          <h3>{ads.adsSubHeading}</h3>
          <p>{ads.adsText.adsText}</p>
        </Flex1>
        <Flex1>
          <ImageAndButton ads={ads} onClick={() => navigate(`${locales[locale].path}/features#our-features`)} />
        </Flex1>
      </Flex>
    </Container>
  </Section>
))`
  background-color: #f2f4f7;
  text-align: left;
  padding-top: 100px;
  padding-bottom: 100px;

  h2 {
    align-self: flex-start;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.5px;
    color: #777;
    text-transform: uppercase;
  }

  h3 {
    font-size: 26px;
    line-height: 1.46;
    color: #171717;

    @media (min-width: 900px) {
      font-size: 32px;
      line-height: 1.69;
    }
  }

  p {
    font-size: 16px;
    line-height: 1.84;
    color: #454545;

    @media (min-width: 900px) {
      font-size: 19px;
    }
  }
`

export default Nads
