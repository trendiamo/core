import React, { useEffect } from 'react'
import styled from 'styled-components'

import Aos from 'aos'
import Container from '../components/container'
import Header from '../components/header'
import Section from '../components/section'

const HeaderContainer = styled.div``
const Goals = styled.div``
const Goal = styled.div``
const IndexAndTitle = styled.div``
const Index = styled.div``
const Title = styled.div``
const Subtitle = styled.div``
const Text = styled.div``

const goals = [
  {
    index: '01',
    title: 'Our mission',
    subtitile: 'Changing how we consume for the better, forever.',
    text:
      "Because the united buying power of all of us consumers, will change how businesses have to act - it's up to us.",
  },
  {
    index: '02',
    title: 'Our vision',
    subtitile: 'A world where an impact-driven business is the best possible business to run.',
    text:
      "Where we team-up together and overcome the shortcomings of a political and 'old world economy' that is ignoring social injustices and the environmental crisis.",
  },
]

const OurGoals = styled(({ className }) => {
  useEffect(() => {
    Aos.init({
      // duration: 2000
    })
  }, [])

  return (
    <Section className={className}>
      <Container>
        <Goals>
          {goals.map(goal => (
            <Goal
              data-aos="fade-up"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              key={goal.index}
            >
              <IndexAndTitle>
                <Index>{goal.index}</Index>
                <Title>{goal.title}</Title>
              </IndexAndTitle>
              <Text>{goal.text}</Text>
            </Goal>
          ))}
        </Goals>
      </Container>
    </Section>
  )
})`
  min-height: 100vh;
  padding-top: 0;
  flex-direction: column;

  ${Header} {
    margin-bottom: 0;
    padding-bottom: 60px;
    padding-top: 60px;
  }
  ${Header} b {
    color: #f05d5e;
  }
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  ${Goals} {
    margin-top: 40px;
  }
  ${Goal} {
    margin-top: 6rem;
    margin-bottom: 6rem;
  }
  ${IndexAndTitle} {
    display: flex;
    margin-bottom: 0.5rem;
  }
  ${Subtitle} {
    font-size: 0.75rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  ${Text} {
    font-size: 0.75rem;
  }
  ${Index}, ${Title} {
    font-weight: 900;
  }
  ${Index} {
    white-space: nowrap;
    margin-right: 0.2rem;
    color: #ef605e;
    &:after {
      content: ' -';
    }
  }
  ${Title} {
    text-transform: uppercase;
  }
  @media (min-width: 1000px) {
    align-items: center;

    ${Container} {
      align-items: center;
    }
    ${HeaderContainer} {
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 1;
      width: 100%;
    }
    ${Header} {
      margin-top: 60px;
      flex-wrap: wrap;
      max-width: calc(100vw - 200px);
    }
    ${Index} {
      margin-right: 0;
      width: 215px;
      &:after {
        content: '';
      }
    }
    ${Subtitle} {
      margin-left: 215px;
      font-size: 1rem;
    }
    ${Text} {
      margin-left: 215px;
      font-size: 1rem;
    }
  }
`

export default OurGoals
