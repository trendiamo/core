import Button from 'shared/button'
import Link from 'shared/link'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import StripeButton from 'shared/stripe-button'
import styled from 'styled-components'
import { ReactComponent as DashboardIcon } from 'assets/icons/dashboard.svg'
import { ReactComponent as MagnifierIcon } from 'assets/icons/magnifier.svg'
import { Typography } from '@material-ui/core'
import { withRouter } from 'react-router'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
  margin: auto;
  @media (min-width: 960px) {
    padding: 50px;
  }
`

const StyledIcon = styled(({ icon, ...props }) => React.createElement(icon, props))`
  width: 60px;
  height: 60px;
  margin-bottom: 30px;
`

const ButtonsContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  @media (min-width: 480px) {
    display: flex;
    justify-content: center;
  }
`

const StyledButton = styled(Button)`
  width: 100%;
  @media (min-width: 480px) {
    margin: 0 20px;
    width: auto;
  }
`

const BlankStateSection = withRouter(({ buttonText, description, hasStripeAccount, history, icon, title }) => {
  const goToAffiliatePartners = useCallback(
    () => {
      history.push(routes.affiliatePartners())
    },
    [history]
  )

  return (
    <>
      <StyledIcon icon={icon} />
      <Typography variant="caption">{title}</Typography>
      <Typography variant="caption">{description}</Typography>
      {buttonText && (
        <ButtonsContainer>
          <StyledButton color="primaryGradient" onClick={goToAffiliatePartners} size="large" variant="contained">
            {buttonText}
          </StyledButton>
          <StripeButton color="whiteBg" hasStripeAccount={hasStripeAccount} />
        </ButtonsContainer>
      )}
    </>
  )
})

const BlankState = ({ hasAffiliations, hasErrors, hasStripeAccount }) => (
  <Container>
    {hasErrors ? (
      <BlankStateSection
        description={
          <>
            {'You can report the problem '}
            <Link href="mailto:support@trendiamo.com">{'here'}</Link>
            {'.'}
          </>
        }
        icon={MagnifierIcon}
        title="Oops, there was an error loading your revenues"
      />
    ) : hasAffiliations ? (
      <BlankStateSection
        buttonText="See other brands"
        description="Select another month or start working with other brands!"
        hasStripeAccount={hasStripeAccount}
        icon={DashboardIcon}
        title="You don't have any revenue in this period."
      />
    ) : (
      <BlankStateSection
        buttonText="Start earning"
        description="Pick an affiliate partner and come back here to monitor your earnings!"
        hasStripeAccount={hasStripeAccount}
        icon={DashboardIcon}
        title="You are not working with any brands yet."
      />
    )}
  </Container>
)

export default BlankState
