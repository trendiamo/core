import Button from 'shared/button'
import Link from 'shared/link'
import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { ReactComponent as DashboardIcon } from 'assets/icons/dashboard.svg'
import { ReactComponent as MagnifierIcon } from 'assets/icons/magnifier.svg'
import { Typography } from '@material-ui/core'

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

const StyledButton = styled(Button)`
  margin-top: 30px;
`

const BlankState = ({ hasErrors, hasAffiliations = true }) => (
  <Container>
    {hasErrors ? (
      <>
        <StyledIcon icon={MagnifierIcon} />
        <Typography variant="caption">{'Oops, there was an error loading your revenues'}</Typography>
        <Typography variant="caption">
          {'You can report the problem '}
          <Link href="mailto:support@trendiamo.com">{'here'}</Link>
          {'.'}
        </Typography>
      </>
    ) : (
      <>
        <StyledIcon icon={DashboardIcon} />
        {hasAffiliations ? (
          <>
            <Typography variant="caption">{"You don't have any revenue in this period."}</Typography>
            <Typography variant="caption">{'Select another month or start working with other brands!'}</Typography>
            <StyledButton
              color="primaryGradient"
              component={Link}
              size="large"
              to={routes.affiliatePartners()}
              variant="contained"
            >
              {'See other brands'}
            </StyledButton>
          </>
        ) : (
          <>
            <Typography variant="caption">{'You are not working with any brands yet.'}</Typography>
            <Typography variant="caption">
              {'Pick an affiliate partner and come back here to monitor your earnings!'}
            </Typography>
            <StyledButton
              color="primaryGradient"
              component={Link}
              size="large"
              to={routes.affiliatePartners()}
              variant="contained"
            >
              {'Start earning'}
            </StyledButton>
          </>
        )}
      </>
    )}
  </Container>
)

export default BlankState
