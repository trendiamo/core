import Img from 'gatsby-image'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const LogoVintageForACause = ({ alt, className }) => (
  <StaticQuery
    query={graphql`
      query {
        file: file(relativePath: { eq: "logo-vintage-for-a-cause.jpg" }) {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `}
    render={data => <Img alt={alt} className={className} fluid={data.file.childImageSharp.fluid} />}
  />
)

export default LogoVintageForACause
