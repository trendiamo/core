import styled from 'styled-components'
import { compose, lifecycle, withState } from 'recompose'
import { h } from 'preact'
import { timeout } from 'plugin-base'

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

const ProgressBarTemplate = ({ progress, remove, opacity }) => (
  <Container opacity={opacity} remove={remove}>
    <Bar progress={progress} />
  </Container>
)

const ProgressBar = compose(
  withState('remove', 'setRemove', false),
  withState('opacity', 'setOpacity', 1),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { hide, setRemove, setOpacity } = this.props
      if (prevProps.hide !== hide) {
        hide && setOpacity(0)
        timeout.set(
          'progressBarUpdate',
          () => {
            setRemove(hide)
            !hide && timeout.set('progressBarUpdate', () => setOpacity(1), 10)
          },
          400
        )
      }
    },
    componentWillUnmount() {
      timeout.clear('progressBarUpdate')
    },
  })
)(ProgressBarTemplate)

export default ProgressBar
