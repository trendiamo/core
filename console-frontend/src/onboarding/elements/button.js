import omit from 'lodash.omit'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Button as MuiButton } from '@material-ui/core'
import { useOnboardingConsumer } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const Icon = styled.img`
  padding-left: 5px;
  user-select: none;
  -webkit-user-drag: none;
`

const StyledButton = styled(({ ...props }) => <MuiButton {...omit(props, ['create', 'helpRun'])} />)`
  ${({ create, helpRun }) =>
    (!create || helpRun) &&
    `background: #fff;
    &:hover {
      background: #fff;
    }`}
`

const Button = ({ history, nextRoute, create, buttonConfig }) => {
  const { onboarding, setOnboarding } = useOnboardingConsumer()
  const handleClick = useCallback(event => {
    if (onboarding.help.run && onboarding.help.single) {
      setOnboarding({ ...onboarding, help: { ...onboarding.help, run: false } })
      return false
    }
    history.push(nextRoute)
    if (!create) {
      setOnboarding({ ...onboarding, stepIndex: onboarding.stepIndex + 1 })
      buttonConfig.onClick(event)
      return false
    }
    setOnboarding({ ...onboarding, run: false, stepIndex: 0 })
  })

  return (
    <StyledButton
      aria-label={buttonConfig['ariaLabel']}
      color={create && !onboarding.help.run ? 'primary' : 'default'}
      create={create}
      helpRun={onboarding.help.run}
      onClick={handleClick}
      variant="contained"
    >
      {onboarding.help.run ? 'Ok' : create ? 'Create New' : 'Next'}
      <Icon alt="" src={`/img/icons/${create || onboarding.help.run ? 'ic_emoji_done' : 'ic_emoji_next'}.png`} />
    </StyledButton>
  )
}

export default withRouter(Button)
