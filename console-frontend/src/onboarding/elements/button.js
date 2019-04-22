import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { Button as MuiButton } from '@material-ui/core'
import { withOnboardingConsumer } from 'ext/recompose/with-onboarding'

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

const ButtonTemplate = ({ buttonConfig, handleClick, create, onboarding }) => (
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

const Button = compose(
  withOnboardingConsumer,
  withHandlers({
    handleClick: ({ history, nextRoute, create, buttonConfig, onboarding, setOnboarding }) => event => {
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
    },
  })
)(ButtonTemplate)

export { Button }
