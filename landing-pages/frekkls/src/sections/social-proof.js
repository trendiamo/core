import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'
import StakeholderLogos from '../components/stakeholder-logos'

const TestimonialContainer = styled.div`
  flex: 1;
  text-align: center;
  margin-top: 2rem;
  @media (min-width: 900px) {
    margin: 5% 5% 0 5%;
  }
`

const TestimonialText = styled.p`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.7);
  @media (min-width: 900px) {
    font-size: 24px;
  }
`

const TestimonialAuthorName = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
  @media (min-width: 900px) {
    font-size: 22px;
  }
`

const TestimonialAuthorDescription = styled.p`
  font-size: 18;
  color: rgba(0, 0, 0, 0.5);
  @media (min-width: 900px) {
    font-size: 22px;
  }
`

const Testimonial = ({ testimonial }) => (
  <TestimonialContainer>
    <TestimonialText>{testimonial.text.text}</TestimonialText>
    <TestimonialAuthorName>{testimonial.author}</TestimonialAuthorName>
    <TestimonialAuthorDescription>{testimonial.authorDescription}</TestimonialAuthorDescription>
  </TestimonialContainer>
)

const FlexDiv = styled.div`
  display: flex;
  text-align: center;
  align-items: center;

  @media (min-width: 900px) {
    justify-content: space-between;
    text-align: left;
    flex-direction: row;
  }
`

const SocialProof = styled(({ className, clients, testimonial }) => (
  <Section className={className}>
    <Container>
      <StakeholderLogos stakeholders={clients} />
    </Container>
    <Container>
      <FlexDiv>
        <Testimonial testimonial={testimonial} />
      </FlexDiv>
    </Container>
  </Section>
))`
  background-color: #f2f4f7;
`

export default SocialProof
