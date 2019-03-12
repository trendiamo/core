import ChatLogUi from './chat-log-ui'
import Cover from 'app/content/scripted-chat/components/cover'
import ScrollLock from 'ext/scroll-lock'
import StepsProgressBar from 'shared/progress-bar'
import { h } from 'preact'

const Steps = ({
  step,
  currentStep,
  coverMinimized,
  steps,
  getContentRef,
  goToNextStep,
  handleScroll,
  setContentRef,
  touch,
}) => (
  <ScrollLock>
    <Cover hackathon header={currentStep.header} minimized={coverMinimized} progressBar steps={steps} />
    <StepsProgressBar progress={((step.index || 0) / Math.max(steps.length - 1, 1)) * 100} />
    <ChatLogUi
      contentRef={getContentRef}
      coverMinimized={coverMinimized}
      goToNextStep={goToNextStep}
      onScroll={handleScroll}
      setContentRef={setContentRef}
      step={step}
      steps={steps}
      touch={touch}
    />
  </ScrollLock>
)

export default Steps
