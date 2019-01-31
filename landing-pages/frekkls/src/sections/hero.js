import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'

import BgTop from '../images/bg-top.svg'
import Button from '../components/button'
import Container from '../components/container'
import Section from '../components/section'
import { C50 } from '../components/grid'

const HomeTopImgContainer = styled.div`
  margin: 0 auto;
  width: 715px;
  max-width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 500px) {
    max-width: 500px;
  }

  @media (min-width: 900px) {
    position: absolute;
    top: 10px;
    right: -6%;
    margin: 0;

    width: 58%;
    max-width: none;
  }
`

const HomeTopImg = ({ alt }) => (
  <StaticQuery
    query={graphql`
      query {
        top: file(relativePath: { eq: "home-top.png" }) {
          childImageSharp {
            fluid(maxWidth: 715) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => <Img alt={alt} fluid={data.top.childImageSharp.fluid} />}
  />
)

const Hero = styled(({ className, hero }) => (
  <Section className={className}>
    <Container>
      <HomeTopImgContainer>
        <HomeTopImg alt="" />
      </HomeTopImgContainer>
      <C50>
        <h2>{hero.openerHeading}</h2>
        <h3>{hero.openerSubHeading}</h3>
        <Button className="js-request-demo" type="button">
          {hero.openerCta}
        </Button>
      </C50>
      <C50 />
    </Container>
  </Section>
))`
  background-image: url('${BgTop}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 25% bottom;
  background-origin: content-box;

  ${Container} {
    display: flex;
    flex-direction: column;
  }

  h2 {
    font-size: 30px;
    line-height: 1.13;
  }

  h3 {
    font-size: 20px;
    line-height: 1.2;
    color: #565656;
  }

  ${Button} {
    margin-top: 10px;
  }

  @media (min-width: 900px) {
    text-align: left;
    background-repeat: no-repeat;
    background-position: 50%;
    background-origin: border-box;

    ${Container} {
      flex-direction: row;
      padding-top: 130px;
      padding-bottom: 200px;
      position: relative;
    }

    ${C50} {
      z-index: 1;
    }

    h2 {
      font-size: 53px;
    }

    h3 {
      font-size: 26px;
      line-height: 34px;
    }
  }
`

export default Hero
