import Button from 'shared/button'
import React from 'react'
import styled from 'styled-components'
import { Callout } from 'shared/uptous'
import { ReactComponent as CheckMarkIcon } from 'assets/icons/check-mark.svg'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 24px 16px;

  @media (min-width: 960px) {
    padding: 32px 40px 24px;
  }
`

const StyledCheckMarkIconIcon = styled(CheckMarkIcon)`
  align-self: center;
  margin-bottom: 20px;

  @media (min-width: 960px) {
    margin-bottom: 24px;
  }
`

const StyledCallout = styled(props => <Callout bordered={false} {...props} />)`
  padding-bottom: 32px;
  text-align: center;
`

const SuccessMessage = ({ closeModal }) => (
  <Container>
    <MessageContainer>
      <StyledCheckMarkIconIcon />
      <Typography variant="h5">{'You successfully requested a sample!'}</Typography>
      <Typography variant="body2">
        {
          'We will check your request shortly and send you status updates per email. Please check your spam folder in case you don’t receive anything from us within the next 24 hours!'
        }
      </Typography>
    </MessageContainer>
    <StyledCallout>
      <Button color="primaryGradient" onClick={closeModal}>
        {'Close'}
      </Button>
    </StyledCallout>
  </Container>
)

export default SuccessMessage
