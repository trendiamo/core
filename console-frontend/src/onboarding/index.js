import Joyride from 'react-joyride'
import React from 'react'
import steps from './steps/initial-steps'

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

const Onboarding = ({ run, setRun, callback }) => (
  <Joyride
    callback={callback}
    continuous
    floaterProps={floaterProps}
    run={run}
    steps={steps}
    styles={styles}
    tooltipComponent={<DummyContainer setRun={setRun} />}
  />
)

export default Onboarding
