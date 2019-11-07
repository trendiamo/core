import Button from 'shared/button'
import Link from 'shared/link'
import React from 'react'
import styled from 'styled-components'
import { ReactComponent as LevelCrossingIcon } from 'assets/icons/level-crossing.svg'
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
  margin-bottom: 30px;
`

const StyledButton = styled(Button)`
  margin-top: 14px;

  @media (min-width: 960px) {
    margin-top: 30px;
  }
`

const NotFound = ({ navigateToRootPage }) => (
  <Container>
    <StyledIcon icon={LevelCrossingIcon} />
    <Typography variant="caption">{"Oops, we couldn't find a page with that link!"}</Typography>
    <Typography variant="caption">
      {'You can report a problem if you suspect a bug, '}
      <Link href="mailto:support@trendiamo.com">{'here'}</Link>
      {'.'}
    </Typography>
    <StyledButton color="primaryGradient" onClick={navigateToRootPage} size="large" variant="contained">
      {'Return Home'}
    </StyledButton>
  </Container>
)

export default NotFound
