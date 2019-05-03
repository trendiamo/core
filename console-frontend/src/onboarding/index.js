import Joyride from 'react-joyride'
import React, { useCallback, useEffect } from 'react'
import SkipButton from './elements/skip-button'
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

const setStyleToPortal = () => {
  // There's currently no other way to fix scrolling bug on elements with position:fixed.
  const portal = document.querySelector("[id^='react-joyride:']")
  if (portal && portal.style) {
    portal.style.position = 'absolute'
    portal.style.top = '0'
  }
}

const Onboarding = () => {
  const { onboarding, setOnboarding, setOnboardingHelp } = useOnboardingConsumer()

  const handleClose = useCallback(
    event => {
      if (event.keyCode === 27) {
        setOnboarding({ run: false })
        setOnboardingHelp({ run: false })
      }
    },
    [setOnboarding, setOnboardingHelp]
  )

  useEffect(
    () => {
      // Act after the JoyRide's scroll timeout of 100ms. (Joyride src: src/components/Overlay.js line 76)
      const t = setTimeout(() => {
        document.addEventListener('keydown', handleClose)
        setStyleToPortal()
      }, 200)

      return () => {
        clearTimeout(t)
        document.removeEventListener('keydown', handleClose)
      }
    },
    [handleClose]
  )

  if ((!onboarding.run || !stagesArray[onboarding.stageIndex]) && !onboarding.help.run) return null

  return (
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
}

export default Onboarding
