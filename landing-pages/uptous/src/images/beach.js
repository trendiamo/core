import Img from 'gatsby-image'
import React, { forwardRef } from 'react'
import { graphql, StaticQuery } from 'gatsby'

const BeachImg = ({ alt, className }, ref) => (
  <StaticQuery
    query={graphql`
      query {
        file: file(relativePath: { eq: "beach.jpg" }) {
          childImageSharp {
            fluid(quality: 85) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `}
    render={data => <Img alt={alt} className={className} fluid={data.file.childImageSharp.fluid} ref={ref} />}
  />
)

export default forwardRef(BeachImg)
