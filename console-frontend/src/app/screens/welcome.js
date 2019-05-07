import auth from 'auth'
import React from 'react'
import routes from 'app/routes'
import { changeStage } from 'onboarding/scenario-actions'
import { compose, lifecycle, withHandlers } from 'recompose'
import { Container, Description, Header, Image, OutlinedButton, StyledButton } from 'shared/blank-state/components'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'
import { withWidth } from '@material-ui/core'

const title = `Welcome${auth.getUser().firstName ? `, ${auth.getUser().firstName}` : ''}!`
const description =
  "We're so happy that you're here! We're going to help you improve and engage with your customers, creating great experiences with your brand!"

const WelcomePage = ({ getStarted, skipOnboarding }) => (
  <Container>
    <div style={{ maxWidth: '500px', textAlign: 'center' }}>
      <Image alt="" src="/img/background/img-welcome.png" />
      <Header variant="h4">{title}</Header>
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

const WelcomePage1 = compose(
  withWidth({ noSSR: true }),
  lifecycle({
    componentDidMount() {
      const { width, history } = this.props
      if (width === 'xs' || width === 'sm') {
        history.push(routes.triggersList())
      }
    },
  }),
  withHandlers({
    getStarted: ({ history, onboarding, setOnboarding }) => () => {
      setOnboarding({ ...onboarding, run: true })
      history.push(routes.triggersList())
    },
    skipOnboarding: ({ history, onboarding, setOnboarding }) => () => {
      changeStage(1)
      setOnboarding({ ...onboarding, run: false, stageIndex: 1 })
      history.push(routes.triggersList())
    },
  })
)(WelcomePage)

const WelcomePage2 = props => {
  const { onboarding, setOnboarding } = useOnboardingConsumer()
  return <WelcomePage1 {...props} onboarding={onboarding} setOnboarding={setOnboarding} />
}

export default compose(withRouter)(WelcomePage2)
