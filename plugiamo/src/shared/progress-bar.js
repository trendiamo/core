import styled from 'styled-components'
import { branch, compose, lifecycle, renderNothing, withState } from 'recompose'
import { h } from 'preact'

const Container = styled.div`
  position: relative;
  flex-shrink: 0;
  height: 3px;
  background-color: #d9d9d9;
  ${({ hide }) => hide && 'opacity: 0;'}
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

const ProgressBarTemplate = ({ progress, hide }) => (
  <Container hide={hide}>
    <Bar progress={progress} />
  </Container>
)

const ProgressBar = compose(
  withState('remove', 'setRemove', false),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { hide, setRemove } = this.props
      if (prevProps.hide !== hide) {
        setTimeout(() => {
          setRemove(hide)
        }, 400)
      }
    },
  }),
  branch(({ remove }) => remove, renderNothing)
)(ProgressBarTemplate)

export default ProgressBar
