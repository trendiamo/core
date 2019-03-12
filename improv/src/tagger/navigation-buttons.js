import Button from 'shared/button'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex: 2;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  width: 200px;
`

const NavigationButtons = ({ nextScreen, prevScreen }) => (
  <Container>
    <Button onClick={prevScreen}>{'Previous'}</Button>
    <Button onClick={nextScreen}>{'Next'}</Button>
  </Container>
)
export default NavigationButtons
