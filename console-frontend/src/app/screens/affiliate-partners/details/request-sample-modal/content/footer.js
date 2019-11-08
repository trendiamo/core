import Button from 'shared/button'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: #e7ecef;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (min-height: 960px) {
    padding: 30px 80px;
  }
`

const StyledButton = styled(props => <Button variant="contained" {...props} />)`
  margin: 0 10px;
`

const Footer = ({ isValidAddress, isValidMessage, onConfirmOrderClick, onGoToSettingsClick }) => (
  <Container>
    <StyledButton color={isValidAddress ? 'whiteBg' : 'primaryGradient'} onClick={onGoToSettingsClick}>
      {'Go To Settings'}
    </StyledButton>
    {isValidAddress && (
      <StyledButton color="primaryGradient" disabled={!isValidAddress || !isValidMessage} onClick={onConfirmOrderClick}>
        {'Confirm Order'}
      </StyledButton>
    )}
  </Container>
)

export default Footer
