import Img from 'gatsby-image'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const Card01 = ({ alt, className }) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "step-02.png" }) {
          childImageSharp {
            fixed(width: 245) {
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
        style={{ width: '245px', height: '235px' }}
      />
    )}
  />
)

export default Card01
