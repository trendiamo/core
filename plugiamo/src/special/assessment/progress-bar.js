import styled from 'styled-components'
import { h } from 'preact'
import { timeout } from 'plugin-base'
import { useEffect, useState } from 'preact/hooks'

const Container = styled.div`
  position: relative;
  flex-shrink: 0;
  height: 3px;
  background-color: #d9d9d9;
  ${({ remove }) => remove && 'display: none;'}
  ${({ opacity }) => `opacity: ${opacity};`}
  transition: opacity 0.4s ease-in-out;
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

const ProgressBar = ({ hide, progress }) => {
  const [remove, setRemove] = useState(false)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => () => timeout.clear('progressBarUpdate'), [])

  useEffect(() => {
    hide && setOpacity(0)
    timeout.set(
      'progressBarUpdate',
      () => {
        setRemove(hide)
        !hide && timeout.set('progressBarUpdate', () => setOpacity(1), 10)
      },
      400
    )
  }, [hide])

  return (
    <Container opacity={opacity} remove={remove}>
      <Bar progress={progress} />
    </Container>
  )
}

export default ProgressBar
