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
const Text = styled.div``

const goals = [
  {
    index: '01',
    title: 'No poverty',
    text: 'Economic growth must be inclusive to provide sustainable jobs and promote equality.',
  },
  {
    index: '02',
    title: 'Zero hunger',
    text:
      'The food and agriculture sector offers key solutions for development, and is central for hunger and poverty eradication.',
  },
  {
    index: '03',
    title: 'Good health and well-being',
    text:
      'Ensuring healthy lives and promoting the well-being for all at all ages is essential to sustainable development.',
  },
  {
    index: '04',
    title: 'Quality education',
    text: "Obtaining a quality education is the foundation to improving people's lives and sustainable development",
  },
  {
    index: '05',
    title: 'Gender equality',
    text:
      'Gender equality is not only a fundamental human right, but a necessary foundation for a peaceful, prosperous and sustainable world.',
  },
  {
    index: '06',
    title: 'Clean water and sanitation',
    text: 'Clean, accessible water for all is an essential part of the world we want to live in.',
  },
  {
    index: '07',
    title: 'Affordable and clean energy',
    text: 'Energy is central to nearly every major challenge and opportunity.',
  },
  {
    index: '08',
    title: 'Decent work and economic growth',
    text:
      'Sustainable economic growth will require societies to create the conditions that allow people to have quality jobs.',
  },
  {
    index: '09',
    title: 'Industry, innovation and infrastructure',
    text: 'Investments in infrastructure are crucial to achieving sustainable development.',
  },
  {
    index: '10',
    title: 'Reduced inequalities',
    text:
      'To reduce inequalities, policies should be universal in principle, paying attention to the needs of disadvantaged and marginalized populations.',
  },
  {
    index: '11',
    title: 'Sustainable cities and communities',
    text:
      'There needs to be a future in which cities provide opportunities for all, with access to basic services, energy, housing, transportation and more.',
  },
  {
    index: '12',
    title: 'Responsible consumption and production',
    text: 'Responsible Production and Consumption',
  },
  {
    index: '13',
    title: 'Climate action',
    text: 'Climate change is a global challenge that affects everyone, everywhere.',
  },
  {
    index: '14',
    title: 'Life below water',
    text: 'Careful management of this essential global resource is a key feature of a sustainable future.',
  },
  {
    index: '15',
    title: 'Life on land',
    text:
      'Sustainably manage forests, combat desertification, halt and reverse land degradation, halt biodiversity loss',
  },
  {
    index: '16',
    title: 'Peace, justice and strong institutions',
    text: 'Access to justice for all, and building effective, accountable institutions at all levels.',
  },
  {
    index: '17',
    title: 'Partnerships',
    text: 'Revitalize the global partnership for sustainable development.',
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
      <HeaderContainer>
        <Header>
          <span>{'What we '}</span>
          <span>{'are '}</span>
          <span>{'achieving '}</span>
          <b>{'together'}</b>
        </Header>
      </HeaderContainer>
      <Container>
        <p>
          {'We believe that the '}
          <b>{"United Nation's goals for sustainable development"}</b>
          {' are fully achievable by 2030 if we team-up and work together towards them!'}
        </p>
        <Goals>
          {goals.map(goal => (
            <Goal
              data-aos="fade-up"
              // data-aos-anchor-placement="top-center"
              // data-aos-delay="5"
              // data-aos-duration="10"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              // data-aos-offset="20"
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
    ${Text} {
      margin-left: 215px;
      font-size: 1rem;
    }
  }
`

export default OurGoals
