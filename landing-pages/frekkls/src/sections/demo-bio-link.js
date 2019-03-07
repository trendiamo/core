import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import Container from '../components/container'
import Section from '../components/section'

const StyledSecton = styled(Section)`
  background-color: #f2f4f7;
`

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`

const ImageContainer = styled.div`
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
  }
`

const DetailsContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;

  h1 {
    font-size: 36px;
    margin-bottom: 20px;
    margin-top: 30px;
  }

  h1 b {
    font-weight: bold;
  }

  p {
    font-size: 24px;
  }

  @media (min-width: 900px) {
    width: 100%;
    padding-left: 40px;
    h1 {
      margin-top: 0px;
    }
  }
`

const StyledButton = styled(Button)`
  margin-top: 32px;

  p {
    margin: 0px;
  }

  p b {
    font-weight: bold;
  }
`

const DemoBioLink = ({ demoBioLink }) => (
  <StyledSecton>
    <StyledContainer>
      <ImageContainer>
        <img alt="" src={demoBioLink.card1Image.fluid.src} />
      </ImageContainer>
      <DetailsContainer>
        <div
          dangerouslySetInnerHTML={{
            __html: demoBioLink.card1Heading.childContentfulRichText.html,
          }}
        />
        <p>{demoBioLink.card1Text}</p>
        <a href={demoBioLink.card1DemoEntryUrl}>
          <StyledButton
            dangerouslySetInnerHTML={{
              __html: demoBioLink.card1CtaMd.childContentfulRichText.html,
            }}
          />
        </a>
      </DetailsContainer>
    </StyledContainer>
  </StyledSecton>
)

export default DemoBioLink
