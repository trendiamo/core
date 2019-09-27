import notFoundImage from 'assets/img/background/not-found.png'
import React from 'react'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'

const BackgroundImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 30px;
`

const BoldLink = styled.a`
  text-decoration: none;
  color: #777;
  font-weight: 700;
  cursor: pointer;
`

const StyledButton = styled(Button)`
  color: #616161;
  letter-spacing: 1.3px;
  margin-top: 25px;
  padding: 12px 80px;
`

const NotFound = ({ navigateToRootPage }) => (
  <>
    <BackgroundImage src={notFoundImage} />
    <Typography gutterBottom variant="h4">
      {'Oops! This page is not available'}
    </Typography>
    <Typography variant="body2">
      {'Is something wrong? '}
      <BoldLink href="mailto:support@trendiamo.com">{'Get in touch'}</BoldLink>
    </Typography>
    <Typography variant="body2">{'Or come back to home page:'}</Typography>
    <StyledButton onClick={navigateToRootPage} size="large" variant="outlined">
      {'Go Back'}
    </StyledButton>
  </>
)

export default NotFound
