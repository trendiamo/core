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
        critical
        fadeIn={false}
        fixed={data.logo.childImageSharp.fixed}
        style={{ ...style, width: '135px', height: '47px' }}
      />
    )}
  />
)

export default Logo
