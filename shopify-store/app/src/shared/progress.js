import styled from 'styled-components'

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
`

const Progress = styled.progress`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  margin-right: 0.5rem;

  &[value]::-webkit-progress-bar {
    background-color: #efefef;
  }
  &[value]::-webkit-progress-value {
    background-color: #bbb;
    transition: all 250ms ease;
  }
`

const ProgressMessage = styled.span`
  font-size: small;
`

export { Progress, ProgressContainer, ProgressMessage }
