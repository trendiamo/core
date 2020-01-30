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
  font-weight: 900;
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
  line-height: 1.36;
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin: 34px auto;

  @media (min-width: 1000px) {
    font-size: 22px;
    width: 1000px;
    text-align: center;
  }
`

const Values = styled.div`
  margin-top: 0;

  @media (min-width: 1000px) {
    padding: 0 245px 0 240px;
  }
`

const Value = styled.div`
  margin-top: 40px;
  display: flex;
`

const ValueColumn = styled.div`
  display: flex;
  margin-left: 0;
  flex-direction: column;
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
    &:after {
      content: '';
    }
  }
`

const ValuesContainer = styled.div`
  text-align: left;
  margin-top: 40px;
`

const Title = styled.div`
  font-weight: 700;

  @media (min-width: 1000px) {
    font-size: 28px;
    margin-left: 60px;
  }
`

const Text = styled.div`
  font-size: 0.75rem;

  @media (min-width: 1000px) {
    font-size: 22px;
    line-height: 1.4;
    margin-left: 60px;
    margin-top: 20px;
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
                <ValueColumn>
                  <Index>{value.index}</Index>
                </ValueColumn>
                <ValueColumn>
                  <Title>{value.title}</Title>
                  <Text>{value.text}</Text>
                </ValueColumn>
              </Value>
            ))}
          </Values>
        </ValuesContainer>
      </Container>
    </Section>
  )
}

export default OurValues
