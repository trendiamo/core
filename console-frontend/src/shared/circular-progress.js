import React from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

const CircularProgressContainer = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`

const StyledCircularProgress = () => (
  <CircularProgressContainer>
    <CircularProgress size={80} />
  </CircularProgressContainer>
)

export default StyledCircularProgress
