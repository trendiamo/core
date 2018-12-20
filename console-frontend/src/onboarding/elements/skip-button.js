import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { changeStage } from 'onboarding/scenario-actions'
import { compose, withHandlers } from 'recompose'
import { withOnboardingConsumer } from 'ext/recompose/with-onboarding'

const StyledButton = styled(Button)`
  background: #464754;
  position: fixed;
  top: 14px;
  right: 14px;
  width: 125px;
  z-index: 1000;
  &:hover {
    background: #464754;
  }
`

const SkipButton = ({ handleClick }) => (
  <StyledButton color="primary" onClick={handleClick} variant="contained">
    {'Skip'}
  </StyledButton>
)

export default compose(
  withOnboardingConsumer,
  withHandlers({
    handleClick: ({ onboarding, setOnboarding }) => () => {
      if (onboarding.help.run) {
        setOnboarding({ ...onboarding, help: { ...onboarding.help, run: false } })
        return false
      }
      setOnboarding({ ...onboarding, stageIndex: 1, stepIndex: 0, run: false })
      changeStage(1)()
    },
  })
)(SkipButton)
