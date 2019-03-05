import styled from 'styled-components'
import { h } from 'preact'

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 0.25rem;
  background-color: #d9d9d9;
`

const Step = styled.div`
  flex: 1;
  background-color: ${({ index, stepIndex }) => (index <= stepIndex ? '#fe5442' : '#d9d9d9')};
`

const ProgressBar = ({ steps, stepIndex }) => (
  <Container>
    {steps.map((step, index) => (
      /* eslint-disable react/no-array-index-key */
      <Step index={index} key={index} stepIndex={stepIndex} />
    ))}
  </Container>
)
export default ProgressBar
