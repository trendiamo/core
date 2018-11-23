import Button from '@material-ui/core/Button'
import Link from 'shared/link'
import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import theme from 'app/theme'
import Typography from '@material-ui/core/Typography'
import { styles } from 'app/layout/layout-styles'

const Fullscreen = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Container = styled.div`
  position:relative
  text-align: center;
  max-width: 60%;
  flex: none;
  margin: auto;
`

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

const newStyles = styles(theme)

const NotFound = () => (
  <Fullscreen>
    <Container>
      <BackgroundImage src="/img/background/not-found.png" />
      <Typography gutterBottom variant="h4">
        {'Oops! This page is not available'}
      </Typography>
      <Typography variant="body2">
        {'Is something wrong? '}
        <BoldLink href="mailto:support@trendiamo.com">{'Get in touch'}</BoldLink>
      </Typography>
      <Typography variant="body2">{'Or come back to home page:'}</Typography>
      <Link to={routes.root()}>
        <Button size="large" style={newStyles.buttonLarge} variant="outlined">
          {'Go Back'}
        </Button>
      </Link>
    </Container>
  </Fullscreen>
)

export default NotFound
