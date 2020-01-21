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

const OurValues = ({ data }) => {
  useEffect(() => {
    Aos.init({})
  }, [])

  return (
    <Section>
      <Container>
        <HeaderContainer>
          <HeaderText>{data.aboutUs.ourValues.heading}</HeaderText>
          <MainDescription>{data.aboutUs.ourValues.subHeading}</MainDescription>
        </HeaderContainer>
        <ValuesContainer>
          <Values>
            {data.aboutUs.ourValues.items.map(value => (
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
