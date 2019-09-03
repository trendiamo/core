import Img from 'gatsby-image'
import React, { forwardRef } from 'react'
import { graphql, StaticQuery } from 'gatsby'

const BelievingImg = ({ alt, className }, ref) => (
  <StaticQuery
    query={graphql`
      query {
        file: file(relativePath: { eq: "believing.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 90) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `}
    render={data => <Img alt={alt} className={className} fluid={data.file.childImageSharp.fluid} ref={ref} />}
  />
)

export default forwardRef(BelievingImg)
