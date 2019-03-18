import Cover from 'app/content/scripted-chat/components/cover'
import ScrollLock from 'ext/scroll-lock'
import Steps from './steps'
import StepsProgressBar from 'shared/progress-bar'
import Store from './store'
import { h } from 'preact'

const Chat = ({
  depth,
  step,
  currentStep,
  coverMinimized,
  steps,
  getContentRef,
  goToNextStep,
  handleScroll,
  setContentRef,
  touch,
  setShowingContent,
  setShowingLauncher,
  tags,
  stepIndex,
}) => (
  <ScrollLock>
    <Cover assessment currentStep={currentStep} index={stepIndex} minimized={coverMinimized} step={step} />
    {currentStep.type !== 'store' && <StepsProgressBar progress={((stepIndex || 0) / (depth + 1)) * 100} />}
    {currentStep.type === 'store' ? (
      <Store
        contentRef={getContentRef}
        coverMinimized={coverMinimized}
        goToNextStep={goToNextStep}
        onScroll={handleScroll}
        setContentRef={setContentRef}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
        step={step}
        steps={steps}
        tags={tags}
        touch={touch}
      />
    ) : (
      <Steps
        contentRef={getContentRef}
        coverMinimized={coverMinimized}
        depth={depth}
        goToNextStep={goToNextStep}
        onScroll={handleScroll}
        setContentRef={setContentRef}
        step={step}
        steps={steps}
        touch={touch}
      />
    )}
  </ScrollLock>
)

export default Chat
