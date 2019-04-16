import Img from 'gatsby-image'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const FeaturesHeader = ({ alt, className }) => (
  <StaticQuery
    query={graphql`
      query {
        featuresHeader: file(relativePath: { eq: "features-header.png" }) {
          childImageSharp {
            fluid(maxWidth: 886) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => (
      <Img
        alt={alt}
        className={className}
        fluid={data.featuresHeader.childImageSharp.fluid}
        imgStyle={{ objectFit: 'contain', bottom: 0, height: 'auto', top: 'unset' }}
      />
    )}
  />
)

export default FeaturesHeader
