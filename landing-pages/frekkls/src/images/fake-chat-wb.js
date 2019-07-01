import Img from 'gatsby-image'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const FakeChatWbImg = ({ alt, className }) => (
  <StaticQuery
    query={graphql`
      query {
        file: file(relativePath: { eq: "fake-chat-wb.png" }) {
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

export default FakeChatWbImg
