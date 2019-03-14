import Container from 'app/content/scripted-chat/components/base-container'
import Steps from './steps'
import Store from './store'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const Base = ({
  depth,
  handleScroll,
  setContentRef,
  step,
  currentStep,
  steps,
  coverMinimized,
  touch,
  getContentRef,
  goToNextStep,
  setShowingLauncher,
  setShowingContent,
  tags,
}) => (
  <Container contentRef={getContentRef}>
    {currentStep.type === 'store' ? (
      <Store
        coverMinimized={coverMinimized}
        getContentRef={getContentRef}
        handleScroll={handleScroll}
        setContentRef={setContentRef}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
        step={step}
        tags={tags}
      />
    ) : (
      <Steps
        coverMinimized={coverMinimized}
        currentStep={currentStep}
        depth={depth}
        getContentRef={getContentRef}
        goToNextStep={goToNextStep}
        handleScroll={handleScroll}
        setContentRef={setContentRef}
        step={step}
        steps={steps}
        touch={touch}
      />
    )}
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
    handleScroll: ({ setCoverMinimized, coverMinimized, step, setTouch, touch }) => event => {
      if (step.header.minimized) return
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
