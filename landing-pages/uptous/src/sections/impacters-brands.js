import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import Button from '../components/button'
import Container from '../components/container'
import Section from '../components/section'

const Heading = styled.h2``
const Subheading = styled.div``

const onStartBrandClick = () => navigate('/signup')

const ImpactersBrands = styled(({ className }) => (
  <Section className={className}>
    <Container>
      <Heading>{'Matching you with brands that stand for changing how we do business, forever.'}</Heading>
      <Subheading>
        {
          'Positive Impact Brands such as Waterhaul, Ocean Bottle or Jumping Pigs are working with #UPTOUS to spread positive impact with our global sales force of #impacters for their sustainable businesses, products and services.'
        }
      </Subheading>
      <Button onClick={onStartBrandClick}>{'Get started as a brand'}</Button>
    </Container>
  </Section>
))`
  padding: 0;
  position: relative;
  overflow: hidden;
  background-color: #007374;
  display: flex;
  height: 680px;
  min-height: 100vh;

  ${Container} {
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
  }
  ${Heading} {
    color: #fff;
    font-weight: 900;
    font-size: calc(30px + 1vw);
    line-height: 0.9;
    text-transform: uppercase;
  }
  ${Subheading} {
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 1.225;
    color: #fff;
  }
  ${Button} {
    margin-bottom: 1rem;
    span {
      padding-left: 12px;
      padding-right: 12px;
    }
    &:before {
      content: '';

      display: inline-block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 19px 0 19px 32.9px;
      border-color: transparent transparent transparent #f05d5d;
    }
  }

  @media (min-width: 1000px) {
    ${Heading} {
      font-size: 50px;
    }
    ${Subheading} {
      margin-top: 2rem;
      margin-bottom: 2rem;
      margin-left: 10rem;
      font-size: calc(0.8rem + 0.8vw);
    }
    ${Button} {
      margin-left: -17vw;
      font-size: 35px;
    }
  }
`

export default ImpactersBrands
