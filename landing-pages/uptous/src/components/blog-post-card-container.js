import styled from 'styled-components'

const BlogPostCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (min-width: 1000px) {
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
