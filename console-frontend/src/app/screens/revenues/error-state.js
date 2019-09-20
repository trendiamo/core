import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import { ReactComponent as DashboardIcon } from 'assets/icons/dashboard.svg'
import { Link } from 'react-router-dom'
import { ReactComponent as MagnifierIcon } from 'assets/icons/magnifier.svg'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
  margin: auto;
  padding: 50px;
`

const StyledIcon = styled(({ icon, ...props }) => React.createElement(icon, props))`
  margin-bottom: 44px;
`

const StyledTypography = styled(Typography)`
  color: #8799a4;
  font-size: 20px;
  line-height: 1.2;

  a {
    color: #0f7173;
  }
`

const StyledButton = styled(Button)`
  border-radius: 0;
  margin-top: 22px;
`

const ErrorState = ({ hasErrors, hasAffiliations = true }) => (
  <Container>
    {hasErrors ? (
      <>
        <StyledIcon icon={MagnifierIcon} />
        <StyledTypography variant="body2">{'Oops, there was an error loading your revenues'}</StyledTypography>
        <StyledTypography gutterBottom variant="body2">
          {'You can report the problem '}
          <a href="mailto:support@trendiamo.com">{'here'}</a>
          {'.'}
        </StyledTypography>
      </>
    ) : (
      <>
        <StyledIcon icon={DashboardIcon} />
        {hasAffiliations ? (
          <>
            <StyledTypography variant="body2">{"You don't have any revenue in this period."}</StyledTypography>
            <StyledTypography gutterBottom variant="body2">
              {'Select another month or start working with other brands!'}
            </StyledTypography>
            <StyledButton
              color="primary"
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
            <StyledTypography variant="body2">{'You are not working with any brands yet.'}</StyledTypography>
            <StyledTypography gutterBottom variant="body2">
              {'Pick an affiliate partner and come back here to monitor your earnings!'}
            </StyledTypography>
            <StyledButton
              color="primary"
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

export default ErrorState
