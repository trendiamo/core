import ChatLogUi from './chat-log-ui'
import Container from 'app/content/scripted-chat/components/base-container'
import Cover from 'app/content/scripted-chat/components/cover'
import ScrollLock from 'ext/scroll-lock'
import StepsProgressBar from 'shared/progress-bar'
import { compose, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const Base = ({ handleScroll, setContentRef, step, steps, coverMinimized, touch, getContentRef, goToNextStep }) => (
  <Container contentRef={getContentRef}>
    <ScrollLock>
      <Cover hackathon header={step.header} minimized={coverMinimized} />
      <StepsProgressBar stepIndex={step.index} steps={steps} />
      <ChatLogUi
        contentRef={getContentRef}
        coverMinimized={coverMinimized}
        goToNextStep={goToNextStep}
        onScroll={handleScroll}
        setContentRef={setContentRef}
        step={step}
        touch={touch}
      />
    </ScrollLock>
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
