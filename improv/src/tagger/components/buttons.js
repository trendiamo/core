import Button from 'shared/button'
import React from 'react'
import styled from 'styled-components'

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`

const Buttons = ({ onCopyResult }) => (
  <ButtonsContainer>
    <Button onClick={onCopyResult} type="button">
      {'Update Products'}
    </Button>
  </ButtonsContainer>
)

export default Buttons
