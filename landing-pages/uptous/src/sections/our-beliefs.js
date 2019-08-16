import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Header from '../components/header'
import PeopleImg from '../images/people'
import Section from '../components/section'

const AbsContainer = styled.div``
const PeopleImgContainer = styled.div``
const StyledPeopleImg = styled(PeopleImg)``

const OurBeliefs = styled(({ className }) => (
  <Section className={className}>
    <PeopleImgContainer>
      <StyledPeopleImg alt="" />
    </PeopleImgContainer>
    <AbsContainer>
      <Container>
        <Header>
          {'What we '}
          <b>{'believe'}</b>
          {' in'}
        </Header>
        <p>{'We believe in a world in which people drive positive change.'}</p>
        <p>
          {
            "Where an impact-driven business is the best possible business to run. Where we team-up together and overcome the shortcomings of a political and 'old world economy' that is ignoring social injustices and the environmental crisis."
          }
        </p>
        <p>
          {
            "We are working for a world where the United Nation's sustainable development goals are achieved so we can look forward to the future."
          }
        </p>
      </Container>
    </AbsContainer>
  </Section>
))`
  @media (min-width: 1000px) {
    padding: 0;
    position: relative;
    overflow: hidden;
    height: 520px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${PeopleImgContainer} {
      flex: 1;
    }
    ${StyledPeopleImg} {
      height: 100%;
    }
    ${AbsContainer} {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
    }
    ${Container} {
      padding: 100px 20px;
    }
    p {
      max-width: 60%;
    }
  }
`

export default OurBeliefs
