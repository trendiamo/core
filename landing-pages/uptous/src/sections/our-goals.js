import Aos from 'aos'
import Container from '../components/container'
import React, { useEffect } from 'react'
import Section from '../components/section'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  background: #f5f5f5;
  padding: 35px 10px;
`

const Goals = styled.div`
  margin-top: 26px;
  padding: 0 20px;

  @media (min-width: 1000px) {
    padding: 0 50px;
  }
`

const Goal = styled.div`
  margin-bottom: 2rem;
`

const IndexAndTitle = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`

const Text = styled.div`
  font-size: 0.75rem;
  margin-top: 20px;
  @media (min-width: 1000px) {
    margin-left: 70px;
    font-size: 18px;
    line-height: 1.4;
  }
`

const MainContainer = styled.div`
  display: flex;

  flex-direction: column;
  @media (min-width: 1000px) {
    margin: 0 -5px;
    flex-direction: row;
  }
`

const Column = styled.div`
  display: block;
  background: #f5f5f5;

  & + & {
    margin: 50px 0 0;
  }

  @media (min-width: 1000px) {
    margin: 0 5px;
    & + & {
      margin: 0 5px;
    }
  }
`

const Header = styled.div`
  margin-top: 5px;
  font-size: 22px;
  text-align: center;
  @media (min-width: 1000px) {
    flex-wrap: wrap;
    max-width: calc(100vw - 200px);
  }
`

const Description = styled.div`
  color: #111;
  font-weight: 700;
  font-size: 30px;
  text-align: center;
  margin-top: 20px;
`

const Index = styled.div`
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
  margin-right: 0.2rem;
  line-height: 1.4;
  &:after {
    content: ' -';
  }
  @media (min-width: 1000px) {
    margin-right: 0;
    width: 70px;
    &:after {
      content: '';
    }
  }
`

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
`

const StyledSection = styled(Section)`
  margin-top: 40px;
  flex-direction: column;

  @media (min-width: 1000px) {
    align-items: center;
  }
`

const OurGoalsDiv = ({ data }) => (
  <StyledSection fullWidth>
    <MainContainer>
      <Column>
        <HeaderContainer>
          <Header>{data.home.firstColumn.heading}</Header>
          <Description>{data.home.firstColumn.subHeading}</Description>
        </HeaderContainer>
        <StyledContainer>
          <Goals>
            {data.home.firstColumn.items.map(goal => (
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
        </StyledContainer>
      </Column>
      <Column>
        <HeaderContainer>
          <Header>{data.home.secondColumn.heading}</Header>
          <Description>{data.home.secondColumn.subHeading}</Description>
        </HeaderContainer>
        <StyledContainer>
          <Goals>
            {data.home.secondColumn.items.map(goal => (
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
        </StyledContainer>
      </Column>
    </MainContainer>
  </StyledSection>
)

const OurGoals = ({ data }) => {
  useEffect(() => {
    Aos.init({})
  }, [])

  return <OurGoalsDiv data={data} />
}

export default OurGoals
