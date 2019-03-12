import styled from 'styled-components'
import { h } from 'preact'

const Container = styled.div`
  position: relative;
  flex-shrink: 0;
  height: 3px;
  background-color: #d9d9d9;
`

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${({ progress }) => progress}%;
  background: #fe5442;
  transition: width 0.6s ease-out;
`

const ProgressBar = ({ progress }) => (
  <Container>
    <Bar progress={progress} />
  </Container>
)
export default ProgressBar
