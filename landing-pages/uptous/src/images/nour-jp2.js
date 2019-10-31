import Img from 'gatsby-image'
import React, { forwardRef } from 'react'
import { graphql, StaticQuery } from 'gatsby'

const NourJp2Img = ({ alt, className }, ref) => (
  <StaticQuery
    query={graphql`
      query {
        file: file(relativePath: { eq: "nour-jp2.jpg" }) {
          childImageSharp {
            fluid(quality: 90) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `}
    render={data => <Img alt={alt} className={className} fluid={data.file.childImageSharp.fluid} ref={ref} />}
  />
)

export default forwardRef(NourJp2Img)
