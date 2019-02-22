import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import Container from '../components/container'
import Section from '../components/section'

const sliderSettings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 5,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        arrows: false,
        slidesToScroll: 3,
        infinite: false,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        arrows: false,
        slidesToScroll: 2,
        infinite: false,
        dots: true,
      },
    },
  ],
}

const LogoContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex: 1;
  height: 3rem;
  margin: 0rem 1rem;
  @media (min-width: 600px) {
    margin: 0rem 3rem;
  }
  @media (min-width: 900px) {
    margin: 0rem 2rem;
  }
`

const Img = styled.img`
  width: 100%;
`

const Logo = ({ file }) => (
  <LogoContainer>
    <Img alt={file.fileName} src={`https:${file.url}`} />
  </LogoContainer>
)

const ClientLogos = ({ clients }) =>
  clients.edges.length > 0 && (
    <Slider {...sliderSettings}>
      {clients.edges.map(client => (
        <Logo file={client.node.logo.file} key={client.node.clientName} />
      ))}
    </Slider>
  )

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
      <ClientLogos clients={clients} />
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
