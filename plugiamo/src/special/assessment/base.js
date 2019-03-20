import Chat from './chat'
import Container from 'app/content/scripted-chat/components/base-container'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const Base = ({ getContentRef, ...props }) => (
  <Container contentRef={getContentRef}>
    <Chat contentRef={getContentRef} {...props} />
  </Container>
)

export default compose(
  withState('coverMinimized', 'setCoverMinimized', ({ step }) => !!step.header.minimized),
  withState('touch', 'setTouch', true),
  withState('currentStep', 'setCurrentStep', ({ step }) => step),
  withHandlers(() => {
    let contentRef
    return {
      setContentRef: () => ref => (contentRef = ref),
      getContentRef: () => () => contentRef,
    }
  }),
  withHandlers({
    handleScroll: ({ setCoverMinimized, getContentRef, coverMinimized, step, setTouch, touch }) => event => {
      if (step.header.minimized) return
      if (window.innerHeight - getContentRef().base.scrollHeight > 90) return
      const scrollTop = event.target.scrollTop
      if (scrollTop <= 0 && coverMinimized) {
        setTouch(false)
        setTimeout(() => {
          setTouch(true)
        }, 50)
        return setCoverMinimized(false)
      }
      if (scrollTop > 0 && !coverMinimized && touch) return setCoverMinimized(true)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { step, setCurrentStep } = this.props
      setCurrentStep(step)
    },
    componentDidUpdate(prevProps) {
      const { step, setCurrentStep } = this.props
      if (prevProps.step !== step) {
        setTimeout(
          () => {
            setCurrentStep(step)
          },
          prevProps.step ? 750 : 0
        )
      }
    },
  })
)(Base)
