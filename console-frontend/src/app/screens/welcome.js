import auth from 'auth'
import React from 'react'
import routes from 'app/routes'
import { changeStage } from 'onboarding/scenario-actions'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { Container, Description, Header, Image, OutlinedButton, StyledButton } from 'shared/blank-state/components'
import { withOnboardingConsumer } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const title = `Welcome${auth.getUser().firstName ? `, ${auth.getUser().firstName}` : ''}!`
const description =
  "We're so happy that you're here! We're going to help you improve and engage with your customers, creating great experiences with your brand!"

const WelcomePage = ({ getStarted, skipOnboarding }) => (
  <Container>
    <div style={{ maxWidth: '500px' }}>
      <Image alt="" src="/img/background/img-welcome.png" />
      <Header variant="h4">{title}</Header>
      <Description variant="body1">{description}</Description>
      <StyledButton color="primary" onClick={getStarted} variant="contained">
        {'Get Started'}
      </StyledButton>
      <OutlinedButton onClick={skipOnboarding} variant="text">
        {'Skip Onboarding'}
      </OutlinedButton>
    </div>
  </Container>
)

export default compose(
  withRouter,
  withOnboardingConsumer,
  withState('shouldSkip', 'setShouldSkip', false),
  lifecycle({
    componentWillUnmount() {
      const { onboarding, setOnboarding, shouldSkip, history } = this.props
      setOnboarding({ ...onboarding, run: !shouldSkip })
      history.push(routes.triggersList())
    },
  }),
  withHandlers({
    getStarted: ({ history }) => () => {
      history.push(routes.triggersList())
    },
    skipOnboarding: ({ history, onboarding, setOnboarding, setShouldSkip }) => () => {
      setShouldSkip(true)
      changeStage(1)()
      setOnboarding({ ...onboarding, run: false, stageIndex: 1 })
      setTimeout(() => {
        history.push(routes.triggersList())
      }, 0)
    },
  })
)(WelcomePage)
