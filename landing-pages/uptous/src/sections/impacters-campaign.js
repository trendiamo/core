import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import Container from '../components/container'
import NourJp1Img from '../images/nour-jp1'
import NourJp2Img from '../images/nour-jp2'
import Section from '../components/section'

const Heading = styled.h2``
const PicturesContainer = styled.div``
const PicturesSubContainer = styled.div``
const Pic1 = styled.div``
const Pic2 = styled.div``

const onCampaignClick = () => (window.location.href = 'https://www.instagram.com/p/B37NWsPpG-M/')

const ImpactersCampaign = styled(({ className }) => (
  <Section className={className}>
    <PicturesContainer>
      <PicturesSubContainer>
        <Pic1>
          <NourJp2Img />
        </Pic1>
        <Pic2>
          <NourJp1Img />
        </Pic2>
      </PicturesSubContainer>
    </PicturesContainer>
    <Container>
      <Heading>{'Nour matches perfectly with Jumping Pigs, a sustainable clothing brand from Lisbon.'}</Heading>
      <p>
        {
          'Jumping Pigs is using the positive impact sales force of UPTOUS to connect with impacters like Nour to promote their clothing.'
        }
      </p>
      <Button color="#272a32" onClick={onCampaignClick} wrap>
        {'See her campaign'}
      </Button>
    </Container>
  </Section>
))`
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
  min-height: 666px;
  display: flex;
  flex-direction: column;

  ${PicturesContainer} {
    padding: 20px;
    padding-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ${PicturesSubContainer} {
    flex: 1;
    max-width: 640px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }
  ${Pic1} {
    width: 53%;
    bottom: -3%;
    right: 0;
    position: absolute;
  }
  ${Pic2} {
    width: 60%;
  }
  ${Container} {
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
  ${Heading} {
    font-size: 30px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }
  ${Button} {
    color: #f05d5d;
    span {
      padding-left: 12px;
      padding-right: 12px;
    }
    &:before {
      content: '';

      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 19px 0 19px 32.9px;
      border-color: transparent transparent transparent #f05d5d;
    }
  }
  @media (min-width: 1000px) {
    flex-direction: row;
    min-height: 100vh;
    ${PicturesContainer} {
      flex: 3;
    }
    ${Container} {
      flex: 4;
    }
    ${Heading} {
      font-size: calc(20px + 1vw);
    }
    ${Heading} + p {
      margin-left: 5rem;
    }
    ${Container} {
      min-height: 50vw;
    }
    ${Button} {
      margin-bottom: 6vw;
      min-height: 100px;
      font-size: 35px;
    }
  }
`

export default ImpactersCampaign
