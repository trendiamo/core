import Img from 'gatsby-image'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const Card01 = ({ alt, className }) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "step-03.png" }) {
          childImageSharp {
            fixed(width: 194) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
      }
    `}
    render={data => (
      <Img
        alt={alt}
        className={className}
        fixed={data.logo.childImageSharp.fixed}
        style={{ width: '194px', height: '235px' }}
      />
    )}
  />
)

export default Card01
