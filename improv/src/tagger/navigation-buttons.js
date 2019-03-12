import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex: 2;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`

const NavigationButtons = ({ nextScreen, prevScreen }) => (
  <Container>
    <button onClick={prevScreen} type="button">
      {'Previous'}
    </button>
    <button onClick={nextScreen} type="button">
      {'Next'}
    </button>
  </Container>
)
export default NavigationButtons
