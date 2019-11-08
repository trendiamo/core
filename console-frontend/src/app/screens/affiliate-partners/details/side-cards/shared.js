import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const Title = styled(props => <Typography variant="h6" {...props} />)`
  margin-bottom: 12px;
`

export const TextContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  & + * {
    margin-top: 12px;
  }
`

export const Text = styled(props => <Typography variant="body2" {...props} />)``
