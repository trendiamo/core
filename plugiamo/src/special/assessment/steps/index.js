import ChatLogUi from './chat-log-ui'
import Cover from 'app/content/scripted-chat/components/cover'
import ScrollLock from 'ext/scroll-lock'
import StepsProgressBar from 'shared/progress-bar'
import { h } from 'preact'

const Steps = ({ step, coverMinimized, steps, getContentRef, goToNextStep, handleScroll, setContentRef, touch }) => (
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
)

export default Steps
