import Img from 'gatsby-image'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const LogoVilladonatello = ({ alt, className }) => (
  <StaticQuery
    query={graphql`
      query {
        file: file(relativePath: { eq: "logo-villadonatello.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `}
    render={data => <Img alt={alt} className={className} fluid={data.file.childImageSharp.fluid} />}
  />
)

export default LogoVilladonatello
