import Cover from 'app/content/scripted-chat/components/cover'
import CtaButton from './steps/cta-button'
import ProgressBar from './progress-bar'
import ScrollLock from 'ext/scroll-lock'
import Steps from './steps'
import Store from './store'
import { h } from 'preact'

const Chat = ({
  step,
  currentStep,
  coverMinimized,
  steps,
  contentRef,
  goToNextStep,
  handleScroll,
  setContentRef,
  touch,
  setShowingContent,
  setShowingLauncher,
  endNodeTags,
  progress,
  showingCtaButton,
}) => (
  <ScrollLock>
    <Cover assessment currentStep={currentStep} minimized={coverMinimized} step={step} />
    <ProgressBar hide={currentStep.type === 'store'} progress={progress} />
    {currentStep.type === 'store' ? (
      <Store
        contentRef={contentRef}
        coverMinimized={coverMinimized}
        goToNextStep={goToNextStep}
        onScroll={handleScroll}
        setContentRef={setContentRef}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
        step={step}
        steps={steps}
        tags={endNodeTags}
        touch={touch}
      />
    ) : (
      <Steps
        assessmentOptions={{ step, goToNextStep }}
        contentRef={contentRef}
        coverMinimized={coverMinimized}
        onScroll={handleScroll}
        setContentRef={setContentRef}
        showingCtaButton={showingCtaButton}
        step={step}
        steps={steps}
        touch={touch}
      />
    )}
    <CtaButton goToNextStep={goToNextStep} hide={currentStep.type === 'store' || !showingCtaButton} />
  </ScrollLock>
)

export default Chat
