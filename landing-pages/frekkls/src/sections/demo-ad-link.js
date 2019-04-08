import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import Container from '../components/container'
import Section from '../components/section'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`

const ImageContainer = styled.div`
  order: 1;
  position: relative;
  width: 100%;
  img {
    width: 100%;
  }

  @media (min-width: 600px) {
    width: 70%;
  }

  @media (min-width: 900px) {
    width: 100%;
    order: 2;
  }
`

const DetailsContainer = styled.div`
  width: 90%;
  order: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;

  h1 {
    font-size: 36px;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  h1 b {
    font-weight: bold;
  }

  p {
    font-size: 24px;
  }

  @media (min-width: 900px) {
    width: 100%;
    margin-top: 0px;
    padding-right: 40px;
    order: 1;
  }
`

const StyledButton = styled(Button)`
  margin-top: 32px;
  box-shadow: 0 8px 15px 0 rgba(255, 74, 25, 0.31);
  background-image: linear-gradient(123deg, #2b4275, #516aa3);
  box-shadow: 0 8px 15px 0 rgba(81, 106, 163, 0.43);
  &:hover {
    background-image: linear-gradient(123deg, #2b4275, #516aa3),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
  }

  p {
    margin: 0px;
  }

  p b {
    font-weight: bold;
  }
`

const MobileLink = styled.a`
  display: block;

  @media (min-width: 900px) {
    display: none;
  }
`

const DesktopLink = styled.a`
  display: none;

  @media (min-width: 900px) {
    display: block;
  }
`

const DesktopButton = styled(StyledButton)`
  position: absolute;
  right: -20px;
  bottom: 40px;

  p {
    margin: 0px;
  }

  p b {
    font-weight: bold;
  }
`

const DemoNadLink = ({ demoAdLink }) => (
  <Section>
    <StyledContainer>
      <DetailsContainer>
        <div
          dangerouslySetInnerHTML={{
            __html: demoAdLink.card2Heading.childContentfulRichText.html,
          }}
        />
        <p>{demoAdLink.card2Text}</p>
        <MobileLink href={demoAdLink.card2DemoEntryUrl}>
          <StyledButton
            dangerouslySetInnerHTML={{
              __html: demoAdLink.card2CtaMd.childContentfulRichText.html,
            }}
          />
        </MobileLink>
      </DetailsContainer>
      <ImageContainer>
        <img alt="" src={demoAdLink.card2Image.fluid.src} />
        <DesktopLink href={demoAdLink.card2DemoEntryUrl}>
          <DesktopButton
            dangerouslySetInnerHTML={{
              __html: demoAdLink.card2CtaMd.childContentfulRichText.html,
            }}
          />
        </DesktopLink>
      </ImageContainer>
    </StyledContainer>
  </Section>
)

export default DemoNadLink
