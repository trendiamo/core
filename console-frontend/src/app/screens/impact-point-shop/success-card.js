import Button from 'shared/button'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Callout, CardContent, MainCard } from 'shared/uptous'
import { ReactComponent as CheckMarkIcon } from 'assets/icons/check-mark.svg'
import { Typography } from '@material-ui/core'

const StyledCheckMarkIconIcon = styled(CheckMarkIcon)`
  align-self: center;
  margin-bottom: 20px;
  @media (min-width: 960px) {
    margin-bottom: 40px;
  }
`

const StyledCallout = styled(props => <Callout bordered={false} {...props} />)`
  text-align: center;
`

const SuccessCard = ({ setShowSuccessCard, setProductMessage }) => {
  const onClick = useCallback(
    () => {
      setProductMessage('')
      setShowSuccessCard(false)
    },
    [setProductMessage, setShowSuccessCard]
  )

  return (
    <MainCard>
      <CardContent>
        <StyledCheckMarkIconIcon />
        <Typography variant="h5">{'You successfully requested a sample!'}</Typography>
        <Typography variant="body2">
          {
            'We will check your request shortly and send you status updates per email. Please check your spam folder in case you don’t receive anything from us within the next 24 hours!'
          }
        </Typography>
      </CardContent>
      <StyledCallout>
        <Button color="white" onClick={onClick}>
          {'Request Another Sample'}
        </Button>
      </StyledCallout>
    </MainCard>
  )
}

export default SuccessCard
