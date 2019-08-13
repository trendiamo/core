import Img from 'gatsby-image'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const HeroImg = ({ alt, className }) => (
  <StaticQuery
    query={graphql`
      query {
        file: file(relativePath: { eq: "hero.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `}
    render={data => (
      <Img
        alt={alt}
        className={className}
        fluid={data.file.childImageSharp.fluid}
        imgStyle={{ objectPosition: '13% 50%' }}
      />
    )}
  />
)

export default HeroImg
