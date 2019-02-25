import Img from 'gatsby-image'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const Logo = ({ alt, style }) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fixed(width: 135) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
      }
    `}
    render={data => (
      <Img
        alt={alt}
        fixed={data.logo.childImageSharp.fixed}
        style={{ ...style, width: '136px', height: '33px' } || { width: '136px', height: '33px' }}
      />
    )}
  />
)

export default Logo
