import auth from 'auth'
import Button from 'shared/button'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import Link from 'shared/link'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import { apiSignOut } from 'utils'
import { IconButton } from 'shared/form-elements'
import { Tooltip } from '@material-ui/core'

const signOutButtonClick = async () => {
  await apiSignOut()
  auth.clear()
}

const LogoutButton = ({ signOutButtonClick }) => (
  <Tooltip placement="top" title="Logout">
    <StyledPowerButton onClick={signOutButtonClick}>
      <ExitIcon />
    </StyledPowerButton>
  </Tooltip>
)

const StyledPowerButton = styled(IconButton)`
  margin-right: 20px;
`

const StyledButton = styled(Button)`
  width: 140px;
`

export const SectionContainer = styled.div`
  max-width: 1200px;
  align-self: center;
  min-width: 100%;
  @media (min-width: 800px) {
    min-width: 800px;
  }
`

export const ButtonsContainer = styled.div`
  margin-bottom: 30px;
`

const Layout = ({ children }) => {
  const isAccountsPage = window.location.pathname === routes.accounts()
  return (
    <SectionContainer>
      <Section>
        <ButtonsContainer>
          <LogoutButton signOutButtonClick={signOutButtonClick} />
          {auth.isAdmin() && (
            <Link to={isAccountsPage ? routes.newAccount() : routes.accounts()}>
              <StyledButton color="primaryGradient" variant="contained">
                {isAccountsPage ? 'New Account' : 'Close Form'}
              </StyledButton>
            </Link>
          )}
        </ButtonsContainer>
        {children}
      </Section>
    </SectionContainer>
  )
}

export default Layout
