import Joyride from 'react-joyride'
import Portal from '@material-ui/core/Portal'
import React from 'react'
import SkipButton from './elements/skip-button'
import { branch, compose, renderNothing } from 'recompose'
import { stages, stagesArray } from './stages'
import { withOnboardingConsumer } from 'ext/recompose/with-onboarding'

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
  <>
    <Joyride
      continuous
      disableOverlayClose
      floaterProps={floaterProps}
      run={onboarding.run || onboarding.help.run}
      stepIndex={getOnboardingConfig(onboarding).stepIndex}
      steps={getOnboardingConfig(onboarding).steps}
      styles={styles}
      tooltipComponent={<DummyContainer onboarding={onboarding} />}
    />
    <Portal>
      <SkipButton />
    </Portal>
  </>
)

export default compose(
  withOnboardingConsumer,
  branch(
    ({ onboarding }) => (!onboarding.run || !stagesArray[onboarding.stageIndex]) && !onboarding.help.run,
    renderNothing
  )
)(Onboarding)
