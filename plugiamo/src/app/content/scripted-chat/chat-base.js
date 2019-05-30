import CtaButton from 'special/bridge/cta-button'
import ProgressBar from 'special/assessment/progress-bar'
import { ChatContent, ChatLogUi, SimpleChatCover } from 'plugin-base'
import { Fragment, h } from 'preact'

const ChatBase = ({
  assessment,
  assessmentOptions,
  backButtonLabel,
  bridge,
  chatLogCallbacks,
  clickActions,
  contentRef,
  coverMinimized,
  ctaButton,
  ctaButtonClicked,
  data,
  FlowBackButton,
  goToPrevStep,
  handleScroll,
  headerConfig,
  hideCtaButton,
  hideProgressBar,
  lazyLoadingCount,
  lazyLoadActive,
  onToggleContent,
  onCtaButtonClick,
  persona,
  products,
  progress,
  setLazyLoadActive,
  setCtaButtonClicked,
  showBackButton,
  storeLog,
  touch,
}) => (
  <Fragment>
    <SimpleChatCover
      assessment={assessment}
      backButtonLabel={backButtonLabel}
      bridge={bridge}
      clickActions={clickActions}
      FlowBackButton={FlowBackButton}
      goToPrevStep={goToPrevStep}
      header={data.header}
      headerConfig={headerConfig}
      minimized={coverMinimized}
      persona={persona}
      showBackButton={showBackButton}
      step={data}
    />
    {progress >= 0 && <ProgressBar hide={hideProgressBar} progress={progress} />}
    <ChatLogUi
      assessment={assessment}
      assessmentOptions={assessmentOptions}
      bridge={bridge}
      chatLogCallbacks={chatLogCallbacks}
      clickActions={clickActions}
      contentRef={contentRef}
      data={data}
      lazyLoadActive={lazyLoadActive}
      lazyLoadingCount={lazyLoadingCount}
      onScroll={handleScroll}
      onToggleContent={onToggleContent}
      persona={persona}
      products={products}
      ref={contentRef}
      setLazyLoadActive={setLazyLoadActive}
      storeLog={storeLog}
      touch={touch}
    >
      <ChatContent />
    </ChatLogUi>
    {ctaButton && (
      <CtaButton
        clicked={ctaButtonClicked}
        ctaButton={ctaButton}
        hide={hideCtaButton}
        onClick={onCtaButtonClick}
        setClicked={setCtaButtonClicked}
      />
    )}
  </Fragment>
)

export default ChatBase
