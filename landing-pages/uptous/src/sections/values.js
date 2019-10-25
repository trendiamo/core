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
    index: '03',
    title: 'Our values',
    text:
      'We believe in a world in which everyone feels empowered to drive positive change and where sharing improves results exponentially. We are working for a world where the United Nations Sustainable Development Goals are achieved together, so that we can look forward to a bright future.',
  },
  {
    title: 'Transparency',
    text:
      'No green washing. We believe that being transparent about how products are produced and businesses are run is the key for trustworthy collaborations and customer relationships.',
  },
  {
    title: 'Authenticity',
    text:
      'We believe authentic and relevant content created with passion and trust is the best way to get across the messages and stories of sustainable businesses.',
  },
  {
    title: 'Progress through teamwork',
    text:
      'We believe that making sustainable businesses the leading businesses of tomorrow is only achievable through the combined power of individuals supporting it together.',
  },
  {
    title: 'Inclusiveness',
    text:
      'We believe in open conversations, exchange of knowledge and the discussion of topics between reflective individuals and other parties without excluding anyone.',
  },
  {
    title: 'Positivity',
    text:
      'We believe in a positive mindset and learning from each other to discuss how we can progress together every day, step by step. There are no barriers, anyone can participate no matter of the individual level of knowledge and sustainability.',
  },
]

const Values = styled(({ className }) => {
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
              key={goal.title}
            >
              <IndexAndTitle>
                {goal.index && <Index>{goal.index}</Index>}
                <Title>{goal.title}</Title>
              </IndexAndTitle>
              <Subtitle>{goal.subtitle}</Subtitle>
              <Text>{goal.text}</Text>
            </Goal>
          ))}
        </Goals>
      </Container>
    </Section>
  )
})`
  min-height: 100vh;
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
  }
  ${Goals} {
    margin-top: 40px;
  }
  ${Goal} {
    margin-bottom: 2rem;
  }
  ${IndexAndTitle} {
    display: flex;
    margin-bottom: 0.5rem;
    ${Index} + ${Title} {
      color: #272a32;
    }
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
    color: #ef605e;
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
    ${IndexAndTitle} {
      ${Index} + ${Title} {
        margin-left: 0;
      }
    }
    ${Index} {
      margin-right: 0;
      width: 215px;
      &:after {
        content: '';
      }
    }
    ${Title} {
      margin-left: 215px;
    }
    ${Text} {
      margin-left: 215px;
      font-size: 1rem;
    }
  }
`

export default Values
