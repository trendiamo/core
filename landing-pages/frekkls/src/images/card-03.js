import Img from 'gatsby-image'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const Card01 = ({ alt, className }) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "card-03.png" }) {
          childImageSharp {
            fixed(width: 128) {
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
        style={{ width: '128px', height: '120px' }}
      />
    )}
  />
)

export default Card01
