import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -40px;
  margin-right: -40px;
  @media (min-width: 900px) {
    flex-direction: row;
  }
`

const Flex1 = styled.div`
  flex: 1;
  margin-left: 40px;
  margin-right: 40px;
  text-align: center;
  min-width: 80%;

  p {
    margin-bottom: 2rem;
  }

  @media (min-width: 900px) {
    min-width: 380px;
    text-align: left;
    p {
      margin-bottom: 1rem;
    }
    .email-input .hs-form {
      margin-right: 0;
    }
  }
`

const Content = ({ layout }) => (
  <Flex>
    <Flex1>
      <h3>{layout.buzzHeading}</h3>
      <p>{layout.buzzText}</p>
    </Flex1>
    <Flex1>
      <div
        className="email-input email-input-2"
        data-email-label={layout.buzzEmailLabel}
        data-submit-text={layout.buzzEmailCta}
      />
    </Flex1>
  </Flex>
)

const StyledSection = styled(Section)`
  background-image: url(${({ BgWaveGrey }) => BgWaveGrey});
  background-repeat: no-repeat;
`

const Buzz = ({ layout, BgWaveGrey }) => (
  <StyledSection BgWaveGrey={BgWaveGrey}>
    <Container>
      <Content layout={layout} />
    </Container>
  </StyledSection>
)

export default Buzz
