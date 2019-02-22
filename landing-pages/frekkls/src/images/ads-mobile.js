import Img from 'gatsby-image'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const AdsMobile = ({ alt, className }) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "ads-mobile.png" }) {
          childImageSharp {
            fixed(width: 680) {
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
        style={{ width: '340px', height: '517px' }}
      />
    )}
  />
)

export default AdsMobile
