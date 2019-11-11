import auth from 'auth'
import React, { useCallback, useEffect } from 'react'
import routes from 'app/routes'
import welcomeImage from 'assets/img/background/img-welcome.png'
import { changeStage } from 'onboarding/scenario-actions'
import { Container, Description, Header, Image, OutlinedButton, StyledButton } from 'shared/blank-state/components'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'
import { withWidth } from '@material-ui/core'

const title = `Welcome${auth.getUser().firstName ? `, ${auth.getUser().firstName}` : ''}!`
const description =
  "We're so happy that you're here! We're going to help you improve and engage with your customers, creating great experiences with your brand!"

const WelcomePage = ({ history, width }) => {
  const { onboarding, setOnboarding } = useOnboardingConsumer()

  const getStarted = useCallback(() => {
    setOnboarding({ ...onboarding, run: true })
    history.push(routes.triggersList())
  }, [history, onboarding, setOnboarding])

  const skipOnboarding = useCallback(() => {
    changeStage(1)
    setOnboarding({ ...onboarding, run: false, stageIndex: 1 })
    history.push(routes.accountRoot())
  }, [history, onboarding, setOnboarding])

  useEffect(() => {
    if (width === 'xs' || width === 'sm') {
      history.push(routes.triggersList())
    }
  }, [history, width])

  return (
    <Container>
      <div style={{ maxWidth: '500px', textAlign: 'center' }}>
        <Image alt="" src={welcomeImage} />
        <Header variant="h3">{title}</Header>
        <Description variant="body1">{description}</Description>
        <StyledButton centered color="primary" onClick={getStarted} variant="contained">
          {'Get Started'}
        </StyledButton>
        <OutlinedButton onClick={skipOnboarding} variant="text">
          {'Skip Onboarding'}
        </OutlinedButton>
      </div>
    </Container>
  )
}

export default withRouter(withWidth({ noSSR: true })(WelcomePage))
