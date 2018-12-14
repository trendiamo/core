import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { compose, withHandlers } from 'recompose'
import { withRouter } from 'react-router'

const Icon = styled.img`
  padding-left: 5px;
`

const WhiteButton = styled(Button)`
  background: #fff;
  &:hover {
    background: #fff;
  }
`

const ButtonNextTemplate = ({ config, handleClick }) => (
  <WhiteButton aria-label={config['ariaLabel']} color="default" onClick={handleClick} variant="contained">
    {'Next'}
    <Icon alt="" src="/img/icons/ic_emoji_next.png" />
  </WhiteButton>
)

const ButtonCreateTemplate = ({ config, handleClick }) => (
  <Button aria-label={config['ariaLabel']} color="primary" onClick={handleClick} variant="contained">
    {'Create New'}
    <Icon alt="" src="/img/icons/ic_emoji_done.png" />
  </Button>
)

const ButtonNext = compose(
  withRouter,
  withHandlers({
    handleClick: ({ config, history, nextRoute }) => event => {
      config.onClick(event)
      history.push(nextRoute)
    },
  })
)(ButtonNextTemplate)
const ButtonCreate = compose(
  withRouter,
  withHandlers({
    handleClick: ({ setRun, history, nextRoute }) => () => {
      history.push(nextRoute)
      setRun(false)
    },
  })
)(ButtonCreateTemplate)

export { ButtonCreate, ButtonNext }
