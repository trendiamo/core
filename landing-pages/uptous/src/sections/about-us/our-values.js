import Aos from 'aos'
import React, { useEffect } from 'react'
import Section from '../../components/section'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  padding: 35px 0;
  background: #fff;

  @media (min-width: 1000px) {
    padding: 35px 10px;
  }
`

const Container = styled.div`
  width: 100%;
  text-align: center;
`

const HeaderText = styled.div`
  color: #111;
  font-weight: 900;
  font-size: 26px;
  text-align: center;

  @media (min-width: 1000px) {
    font-size: 36px;
    text-align: center;
  }
`

const MainDescription = styled.div`
  color: #111;
  line-height: 1.2;
  width: 100%;
  font-size: 20px;
  margin: 20px auto 0;
  text-align: left;

  @media (min-width: 1000px) {
    font-size: 28px;
    text-align: center;
    width: 1100px;
  }
`

const Values = styled.div`
  margin-top: 26px;

  @media (min-width: 1000px) {
    padding: 0 50px;
  }
`

const Value = styled.div`
  margin-top: 40px;
`

const IndexAndTitle = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  margin-left: 0;

  @media (min-width: 1000px) {
    margin-left: 230px;
  }
`

const Text = styled.div`
  font-size: 0.75rem;
  margin-top: 20px;
  width: 100%;

  @media (min-width: 1000px) {
    width: 600px;
    margin-left: 330px;
    font-size: 20px;
    line-height: 1.4;
  }
`

const Index = styled.div`
  font-size: 20px;
  font-weight: 700;
  white-space: nowrap;
  &:after {
    content: ' -';
  }
  @media (min-width: 1000px) {
    font-size: 28px;
    margin-right: 0;
    &:after {
      content: '';
    }
  }
`

const ValuesContainer = styled.div`
  text-align: left;
  margin-top: 70px;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;

  margin-left: 10px;

  @media (min-width: 1000px) {
    margin-left: 70px;
  }
`

const values = [
  {
    index: '01',
    title: 'Transparency',
    text:
      'No green washing. We believe that being transparent about how products are produced and businesses are run is the key for trustworthy collaborations and customer relationships.',
  },
  {
    index: '02',
    title: 'Authenticity',
    text:
      'We believe authentic and relevant content created with passion and trust is the best way to get across the messages and stories of sustainable businesses.',
  },
  {
    index: '03',
    title: 'Progress through teamwork',
    text:
      'We believe that making sustainable businesses the leading businesses of tomorrow is only achievable through the combined power of individuals supporting it together.',
  },
  {
    index: '04',
    title: 'Inclusiveness',
    text:
      'We believe in open conversations, exchange of knowledge and the discussion of topics between reflective individuals and other parties without excluding anyone.',
  },
  {
    index: '05',
    title: 'Positivity',
    text:
      'We believe in a positive mindset and learning from each other to discuss how we can progress together every day, step by step. There are no barriers, anyone can participate no matter of the individual level of knowledge and sustainability.',
  },
]

const OurValues = () => {
  useEffect(() => {
    Aos.init({})
  }, [])

  return (
    <Section>
      <Container>
        <HeaderContainer>
          <HeaderText>{'Our Values'}</HeaderText>
          <MainDescription>
            {'We believe in a world in which everyone feels empowered to drive positive change.'}
          </MainDescription>
        </HeaderContainer>
        <ValuesContainer>
          <Values>
            {values.map(value => (
              <Value
                data-aos="fade-up"
                data-aos-easing="ease-in-out"
                data-aos-mirror="true"
                data-aos-once="false"
                key={value.index}
              >
                <IndexAndTitle>
                  <Index>{value.index}</Index>
                  <Title>{value.title}</Title>
                </IndexAndTitle>
                <Text>{value.text}</Text>
              </Value>
            ))}
          </Values>
        </ValuesContainer>
      </Container>
    </Section>
  )
}

export default OurValues
