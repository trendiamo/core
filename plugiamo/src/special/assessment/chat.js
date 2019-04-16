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
  goToPrevStep,
  nothingSelected,
  ctaButtonClicked,
  setCtaButtonClicked,
}) => (
  <ScrollLock>
    <Cover
      assessment
      currentStep={currentStep}
      goToPrevStep={goToPrevStep}
      minimized={coverMinimized}
      showBackButton
      step={step}
    />
    <ProgressBar hide={currentStep.type === 'store'} progress={progress} />
    {currentStep.type === 'store' ? (
      <Store
        contentRef={contentRef}
        coverMinimized={coverMinimized}
        goToNextStep={goToNextStep}
        goToPrevStep={goToPrevStep}
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
        nothingSelected={nothingSelected}
        onScroll={handleScroll}
        setContentRef={setContentRef}
        showingCtaButton={showingCtaButton}
        step={step}
        steps={steps}
        touch={touch}
      />
    )}
    <CtaButton
      clicked={ctaButtonClicked}
      goToNextStep={goToNextStep}
      hide={currentStep.type === 'store' || !showingCtaButton}
      setClicked={setCtaButtonClicked}
    />
  </ScrollLock>
)

export default Chat
