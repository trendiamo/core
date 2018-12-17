import Joyride from 'react-joyride'
import Portal from '@material-ui/core/Portal'
import React from 'react'
import SkipButton from './elements/skip-button'
import stages from './stages'
import { branch, compose, renderNothing } from 'recompose'

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

const DummyContainer = ({ content, ...props }) => <div>{content && React.cloneElement(content, props)}</div>

const Onboarding = ({ onboarding, setOnboarding }) => (
  <>
    <Joyride
      continuous
      disableOverlayClose
      floaterProps={floaterProps}
      run={onboarding.run}
      stepIndex={onboarding.stepIndex}
      steps={stages[onboarding.stageIndex].steps}
      styles={styles}
      tooltipComponent={<DummyContainer onboarding={onboarding} setOnboarding={setOnboarding} />}
    />
    <Portal>
      <SkipButton />
    </Portal>
  </>
)

export default compose(branch(({ onboarding }) => !stages[onboarding.stageIndex] || !onboarding.run, renderNothing))(
  Onboarding
)
