import Container from 'app/content/scripted-chat/components/base-container'
import Steps from './steps'
import Store from './store'
import { compose, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const Base = ({
  handleScroll,
  setContentRef,
  step,
  steps,
  coverMinimized,
  touch,
  getContentRef,
  goToNextStep,
  setShowingLauncher,
  setShowingContent,
}) => (
  <Container contentRef={getContentRef}>
    {step.type === 'store' ? (
      <Store
        coverMinimized={coverMinimized}
        getContentRef={getContentRef}
        handleScroll={handleScroll}
        setContentRef={setContentRef}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
        step={step}
      />
    ) : (
      <Steps
        coverMinimized={coverMinimized}
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
  })
)(Base)
