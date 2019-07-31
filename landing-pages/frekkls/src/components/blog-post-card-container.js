import styled from 'styled-components'

const BlogPostCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    justify-content: flex-start;
    > a {
      width: 33%;
    }
  }
`

export default BlogPostCardContainer
