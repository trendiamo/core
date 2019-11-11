import auth from 'auth'
import Joyride from 'react-joyride'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import routes from 'app/routes'
import SkipButton from './elements/skip-button'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Portal } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'
import { stages, stagesArray } from './stages'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const floaterProps = {
  hideArrow: true,
}

const styles = {
  options: {
    overlayColor: showUpToUsBranding() ? 'rgba(39, 41, 50, 0.9)' : 'rgba(37, 42, 54, 1)',
  },
  overlay: {
    background: showUpToUsBranding() ? 'rgba(39, 41, 50, 0.9)' : 'rgba(37, 42, 54, 0.7)',
    transition: '1s all',
    mixBlendMode: showUpToUsBranding() ? 'multiply' : 'hard-light',
  },
  spotlight: {
    borderRadius: showUpToUsBranding() ? '6px' : '10px',
    backgroundColor: showUpToUsBranding() ? '#fff' : 'grey',
    transform: 'scale(0.9, 0.75)',
  },
}

const stepsToArray = stage => stage.order().map(i => stage.steps()[i])

const getOnboardingConfig = onboarding => {
  if (onboarding.help.run && onboarding.help.stageName && onboarding.help.stepName) {
    const stage = stages[onboarding.help.stageName]
    const stageOrder = stage.order()
    return {
      stepIndex: stageOrder.indexOf(stageOrder[stageOrder.indexOf(onboarding.help.stepName)]),
      steps: stepsToArray(stage),
    }
  }
  const steps = stepsToArray(stagesArray[onboarding.stageIndex])
  return { stepIndex: onboarding.stepIndex, steps }
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

const Onboarding = ({ history, width }) => {
  const { onboarding, setOnboarding, setOnboardingHelp } = useOnboardingConsumer()
  const [wasLaunchedInU2U, setWasLaunchedInU2U] = useState(false)

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

  useEffect(
    () => {
      if (wasLaunchedInU2U) return
      if (!auth.isAffiliate() || auth.getUser().onboardingStage !== 0) return
      setTimeout(() => {
        setWasLaunchedInU2U(true)
        setOnboarding({ ...onboarding, run: true })
        history.push(routes.affiliatePartners())
      }, 1000)
    },
    [history, onboarding, setOnboarding, setOnboardingHelp, wasLaunchedInU2U]
  )

  const isEnabled = useMemo(
    () => isWidthUp('md', width) && ((onboarding.run && stagesArray[onboarding.stageIndex]) || onboarding.help.run),
    [onboarding.help.run, onboarding.run, onboarding.stageIndex, width]
  )

  useEffect(
    () => {
      document.body.style.overflow = isEnabled ? 'hidden' : ''
    },
    [isEnabled]
  )

  if (!isEnabled) return null

  return (
    <>
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
    </>
  )
}

export default withRouter(withWidth()(Onboarding))
