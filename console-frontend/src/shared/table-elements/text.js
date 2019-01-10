import React from 'react'
import styled from 'styled-components'
import { omit } from 'lodash'
import { Typography } from '@material-ui/core'

const Text = styled(({ ...props }) => <Typography variant="body1" {...omit(props, ['disabled'])} />)`
  opacity: ${({ disabled }) => disabled && 0.8};
  color: ${({ disabled }) => (disabled ? 'rgba(0,0,0,.6)' : 'rgba(0, 0, 0, 0.87)')};
`

export default Text
