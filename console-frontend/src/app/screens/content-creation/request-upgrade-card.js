import Button from 'shared/button'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { Callout, CardContent, MainCard } from 'shared/uptous'
import { ReactComponent as ContentIcon } from 'assets/icons/content.svg'
import { Typography } from '@material-ui/core'

const StyledCard = styled(MainCard)`
  overflow: visible;
  position: relative;
`

const BetaBadge = styled(props => <div {...props}>{'BETA'}</div>)`
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 1202;
  padding: 5px 20px;
  background-color: #f05d5e;
  border-radius: 6px;
  color: white;
  font-weight: bold;
`

const StyledContentIcon = styled(ContentIcon)`
  align-self: center;
  width: 100px;
  margin-bottom: 20px;

  @media (min-width: 960px) {
    margin-bottom: 40px;
  }
`

const RequestPending = styled(Typography)`
  align-self: flex-start;
  color: #0f7173;
  margin-top: 14px;
`

const StyledButton = styled(Button)`
  margin: 0 auto;
`

const RequestUpgradeCard = ({ isFormSubmitting, openBioAndPicModal, wasSubmitted }) => {
  const appBarContent = useMemo(() => ({ title: 'Become a product curator on brand websites!' }), [])
  useAppBarContent(appBarContent)

  return (
    <StyledCard>
      <BetaBadge />
      <CardContent>
        <StyledContentIcon />
        <Typography variant="h4">{'Push and monetize your content on brand websites'}</Typography>
        <Typography style={{ marginBottom: '20px' }} variant="body2">
          {
            'Apply to our Curation Programme to share your passion and content directly on brand websites and help them to convert their own traffic with your expertise!'
          }
        </Typography>
        <Typography variant="body2">
          {
            'While the programme is in beta mode, only selected impacters may participate. We’ll notify you per email about the status of your application. Thank you!'
          }
        </Typography>
      </CardContent>
      <Callout>
        {wasSubmitted ? (
          <>
            <Typography variant="body2">
              {'Thank you for your application! We’ll be in touch as soon as we have news!'}
            </Typography>
            <RequestPending>{'Status: Application Pending'}</RequestPending>
          </>
        ) : (
          <StyledButton
            color="primaryGradient"
            disabled={isFormSubmitting}
            isFormSubmitting={isFormSubmitting}
            onClick={openBioAndPicModal}
          >
            {!isFormSubmitting && 'I want in!'}
          </StyledButton>
        )}
      </Callout>
    </StyledCard>
  )
}

export default RequestUpgradeCard
