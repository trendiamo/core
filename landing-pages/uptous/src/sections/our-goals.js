import Aos from 'aos'
import Container from '../components/container'
import React, { useEffect } from 'react'
import Section from '../components/section'
import styled from 'styled-components'

const firstSection = [
  {
    index: '01',
    title: 'Sign up for free and save money',
    text:
      'We are a members only shopping club, where you can discover and shop sustainably produced fashion and lifestyle items for better prices.',
  },
  {
    index: '02',
    title: 'New tailored offers every week.',
    text:
      'We frequently launch new discounted collections with a time limited pre-order phase, based on your feedback. Join the pre-order phase to claim your personal items exclusively for the best price.',
  },
  {
    index: '03',
    title: 'You are the center of our good business',
    text:
      'Your needs are our rules. We listen carefully to what you have to say and what you want to do in our club. For instance, you, as part of our community, decide what products and brands you can shop here.',
  },
]

const secondSection = [
  {
    index: '01',
    title: 'Pre-orders and no returns',
    text:
      'We are the new channel for positive impact brands that removes the margin loss classic retailers provoke. We collect bulk orders after a … days sales period and focus on on-demand quality to unlock better prices and margins for everyone involved.',
  },
  {
    index: '02',
    title: 'We work with brands that are committed to sustainability.',
    text:
      'We carefully select and curate our offers and brands with the focus on their positive impact values to shape a new form of shopping and consumption. We enable new sustainable production chains that wouldn’t be actionable without our pre-order model.',
  },
  {
    index: '03',
    title: 'Changing how we consume for the better, forever.',
    text: 'We pledge ourselves to create business that is positive for everyone, including our planet.',
  },
]

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

const OurGoals = () => {
  useEffect(() => {
    Aos.init({})
  }, [])

  return (
    <StyledSection fullWidth>
      <MainContainer>
        <Column>
          <HeaderContainer>
            <Header>{'Become a member'}</Header>
            <Description>{'What is our shopping club?'}</Description>
          </HeaderContainer>
          <StyledContainer>
            <Goals>
              {firstSection.map(goal => (
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
            <Header>{'Our Pledge'}</Header>
            <Description>{'How does it work?'}</Description>
          </HeaderContainer>
          <StyledContainer>
            <Goals>
              {secondSection.map(goal => (
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
}

export default OurGoals
