import Img from 'gatsby-image'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const AdsDesktop = ({ alt, className }) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "shoesbrand-desktop.png" }) {
          childImageSharp {
            fixed(width: 1110) {
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
        style={{ width: '555px', height: '350px' }}
      />
    )}
  />
)

export default AdsDesktop
