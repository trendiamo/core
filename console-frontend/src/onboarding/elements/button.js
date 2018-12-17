import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { Button as MuiButton } from '@material-ui/core'
import { withRouter } from 'react-router'

const Icon = styled.img`
  padding-left: 5px;
  user-select: none;
  -webkit-user-drag: none;
`

const StyledButton = styled(({ ...props }) => <MuiButton {...omit(props, ['create'])} />)`
  ${({ create }) =>
    !create &&
    `background: #fff;
    &:hover {
      background: #fff;
    }`}
`

const ButtonTemplate = ({ config, handleClick, create }) => (
  <StyledButton
    aria-label={config['ariaLabel']}
    color={create ? 'primary' : 'default'}
    create={create}
    onClick={handleClick}
    variant="contained"
  >
    {create ? 'Create New' : 'Next'}
    <Icon alt="" src={`/img/icons/${create ? 'ic_emoji_done' : 'ic_emoji_next'}.png`} />
  </StyledButton>
)

const Button = compose(
  withRouter,
  withHandlers({
    handleClick: ({ history, nextRoute, create, config, onboarding, setOnboarding }) => event => {
      history.push(nextRoute)
      if (!create) {
        setOnboarding({ ...onboarding, stepIndex: onboarding.stepIndex + 1 })
        config.onClick(event)
        return false
      }
      setOnboarding({ ...onboarding, run: false, stepIndex: 0 })
    },
  })
)(ButtonTemplate)

export { Button }
