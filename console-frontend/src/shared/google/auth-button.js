import Button from 'shared/button'
import googleLogoImage from 'assets/img/icons/g-logo.png'
import Link from 'shared/link'
import React from 'react'
import styled from 'styled-components'
import { BASE_API_URL } from 'utils/shared'
import { showUpToUsBranding } from 'utils'

const oAuthUrl = `${BASE_API_URL}/users/auth/google_oauth2`

const GoogleLogo = styled.img`
  width: ${showUpToUsBranding() ? '24px' : '18px'};
  margin-right: 16px;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const GoogleAuthButton = ({ text }) => {
  return (
    <Container>
      <Link href={oAuthUrl}>
        <Button color="oAuthPrimary" size="medium" variant="contained">
          <GoogleLogo src={googleLogoImage} />
          {text}
        </Button>
      </Link>
    </Container>
  )
}

export default GoogleAuthButton
