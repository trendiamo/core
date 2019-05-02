import React from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

const LoadingContainer = styled.div`
  background-color: #f5f5f5;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  margin: 5px 0px;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  z-index: 1000;
`

const LoadingInnerContainer = styled.div`
  bottom: 0;
  display: inline-block;
  position: fixed;
  text-align: center;
  top: 64px;
`

const LoadingMessage = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

const StyledCircularProgress = styled(CircularProgress)`
  height: 80px;
  margin-bottom: 20px;
  width: 80px;
`

const Loading = ({ transparent }) => (
  <LoadingContainer style={transparent && { backgroundColor: 'transparent' }}>
    <LoadingInnerContainer>
      <LoadingMessage>
        <StyledCircularProgress color="primary" size="80" />
      </LoadingMessage>
    </LoadingInnerContainer>
  </LoadingContainer>
)

export default Loading
