import Joyride from 'react-joyride'
import React from 'react'
import SkipButton from './elements/skip-button'
import { branch, compose, lifecycle, renderNothing, withHandlers } from 'recompose'
import { Hidden, Portal } from '@material-ui/core'
import { stages, stagesArray } from './stages'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'

const floaterProps = {
  hideArrow: true,
}

const styles = {
  options: {
    overlayColor: 'rgba(37, 42, 54, 1)',
  },
  overlay: {
    background: 'rgba(37, 42, 54, 0.7)',
    transition: '1s all',
  },
  spotlight: {
    borderRadius: '10px',
  },
}

const stepsToArray = stage => stage.order.map(i => stage.steps[i])

const getOnboardingConfig = onboarding => {
  if (onboarding.help.run && onboarding.help.stageName && onboarding.help.stepName) {
    const stage = stages[onboarding.help.stageName]
    return {
      stepIndex: stage.order.indexOf(stage.order[stage.order.indexOf(onboarding.help.stepName)]),
      steps: stepsToArray(stage),
    }
  }
  const stage = stagesArray[onboarding.stageIndex]
  return { stepIndex: onboarding.stepIndex, steps: stepsToArray(stage) }
}

const DummyContainer = ({ content, ...props }) => <div>{content && React.cloneElement(content, props)}</div>

const Onboarding = ({ onboarding }) => (
  <Hidden smDown>
    <Joyride
      continuous
      disableCloseOnEsc
      disableOverlayClose
      floaterProps={floaterProps}
      run={onboarding.run || onboarding.help.run}
      scrollToFirstStep
      stepIndex={getOnboardingConfig(onboarding).stepIndex}
      steps={getOnboardingConfig(onboarding).steps}
      styles={styles}
      tooltipComponent={<DummyContainer onboarding={onboarding} />}
    />
    <Portal>
      <SkipButton />
    </Portal>
  </Hidden>
)

const Onboarding1 = compose(
  branch(
    ({ onboarding }) => (!onboarding.run || !stagesArray[onboarding.stageIndex]) && !onboarding.help.run,
    renderNothing
  ),
  withHandlers({
    handleClose: ({ setOnboarding, onboarding }) => event => {
      if (event.keyCode === 27) {
        setOnboarding({ ...onboarding, run: false, help: { ...onboarding.help, run: false } })
      }
    },
    setStyleToPortal: () => () => {
      // There's currently no other way to fix scrolling bug on elements with position:fixed.
      const portal = document.querySelector("[id^='react-joyride:']")
      if (portal && portal.style) {
        portal.style.position = 'absolute'
        portal.style.top = '0'
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const { handleClose, setStyleToPortal } = this.props
      // Was set to act after the JoyRide's scroll timeout of 100ms. (Joyride src: src/components/Overlay.js line 76)
      setTimeout(() => {
        setStyleToPortal()
        document.addEventListener('keydown', handleClose)
      }, 200)
    },
    componentDidUpdate() {
      const { setStyleToPortal } = this.props
      setTimeout(() => {
        setStyleToPortal()
      }, 200)
    },
    componentWillUnmount() {
      const { handleClose } = this.props
      document.removeEventListener('keydown', handleClose)
    },
  })
)(Onboarding)

const Onboarding2 = props => {
  const { onboarding, setOnboarding } = useOnboardingConsumer()
  return <Onboarding1 {...props} onboarding={onboarding} setOnboarding={setOnboarding} />
}

export default Onboarding2
