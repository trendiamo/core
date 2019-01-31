import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'

import BgBottom from '../images/bg-bottom.svg'
import Container from '../components/container'
import Section from '../components/section'
import { C50 } from '../components/grid'

const HomePluginImgContainer = styled.div`
  margin: 0 auto;
  width: 715px;
  max-width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 500px) {
    max-width: 320px;
  }

  @media (min-width: 900px) {
    position: absolute;
    right: 20%;
    bottom: 0;
    margin: 0;
    width: 29vw;
  }
`

const HomePluginImg = ({ alt }) => (
  <StaticQuery
    query={graphql`
      query {
        plugin: file(relativePath: { eq: "home-plugin.png" }) {
          childImageSharp {
            fluid(maxWidth: 320) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => <Img alt={alt} fluid={data.plugin.childImageSharp.fluid} />}
  />
)

const Bottom = styled(({ className, bottom }) => (
  <div className={className}>
    <Section>
      <Container>
        <C50>
          <h3>{bottom.signup2Heading}</h3>
          <p>{bottom.signup2Text}</p>
          <div className="email-input email-input-2" />
        </C50>
        <C50 />
      </Container>
    </Section>
    <HomePluginImgContainer>
      <HomePluginImg />
    </HomePluginImgContainer>
  </div>
))`
  ${Section} {
    text-align: left;
    background-color: #f2f4f7;
  }

  @media (min-width: 900px) {
    position: relative;

    ${Section} {
      background-color: transparent;
      margin-top: -85px;
      padding-top: 200px;
      padding-bottom: 200px;
      background-image: url('${BgBottom}');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: top;
    }

    ${Container} {
      z-index: 1;
      display: flex;
    }
  }
`

export default Bottom
