import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { changeStage } from 'onboarding/scenario-actions'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'

const StyledButton = styled(Button)`
  background: #464754;
  position: fixed;
  top: 24px;
  right: 14px;
  width: 125px;
  z-index: 1000;
  &:hover {
    background: #464754;
  }
`

const SkipButton = () => {
  const { onboarding, setOnboarding } = useOnboardingConsumer()

  const handleClick = useCallback(
    () => {
      if (onboarding.help.run) {
        setOnboarding({ ...onboarding, help: { ...onboarding.help, run: false } })
        return false
      }
      setOnboarding({ ...onboarding, stageIndex: 1, stepIndex: 0, run: false })
      changeStage(1)
    },
    [onboarding, setOnboarding]
  )

  return (
    <StyledButton color="primary" onClick={handleClick} variant="contained">
      {'Skip'}
    </StyledButton>
  )
}

export default SkipButton
