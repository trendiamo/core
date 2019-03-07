import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Spinner = styled.div`
  pointer-events: none;
  width: 2.5em;
  height: 2.5em;
  border: 0.4em solid transparent;
  border-color: #eee;
  border-top-color: #fe5442;
  border-radius: 50%;
  animation: loadingspin 1s linear infinite;

  @keyframes loadingspin {
    100% {
      transform: rotate(360deg);
    }
  }
`
const LoadingSpinner = () => (
  <Box>
    <Spinner />
  </Box>
)

export default LoadingSpinner
