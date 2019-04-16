import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

const Flex = styled.div`
  @media (min-width: 900px) {
    display: flex;
    margin-left: -40px;
    margin-right: -40px;
  }
`

const Flex1 = styled.div`
  text-align: left;
  flex: 1;
  h3 {
    color: rgba(242, 244, 247, 0.5);
    font-size: 19px;
    font-weight: bold;
    text-transform: uppercase;
  }
  h2 {
    color: #fff;
    font-size: 32px;
  }
  @media (min-width: 900px) {
    margin-left: 40px;
    margin-right: 40px;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      font-size: 40px;
    }
  }
`

const StyledSection = styled(Section)`
  position: relative;
  background-image: url(${({ mainImage }) => mainImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const BlogHero = ({ blogHero }) => (
  <StyledSection mainImage={blogHero.mainImage.fluid.src}>
    <Container>
      <Flex>
        <Flex1>
          <h3>{blogHero.heading}</h3>
          <h2>{blogHero.mainText}</h2>
        </Flex1>
        <Flex1 />
      </Flex>
    </Container>
  </StyledSection>
)

export default BlogHero
