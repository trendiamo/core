import Cover from './cover'
import CtaButton from 'special/bridge/cta-button'
import ProgressBar from 'special/assessment/progress-bar'
import { AssessmentProducts, AssessmentStepOptions } from 'special/assessment/message-types'
import { ChatLogUi, timeout } from 'plugin-base'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { Fragment, h } from 'preact'

const messageFactory = ({ data, hideAll, nothingSelected, onClick, type }) => {
  if (type === 'assessmentStepOptions') {
    return (
      <AssessmentStepOptions hideAll={hideAll} nothingSelected={nothingSelected} onClick={onClick} options={data} />
    )
  } else if (type === 'assessmentProducts') {
    return <AssessmentProducts data={data} onClick={onClick} />
  }
}

const getMessageMaxWidthByType = type => {
  return ['assessmentProducts', 'assessmentStepOptions'].includes(type) ? '260px' : null
}

const getMessageShowByType = (type, show) => {
  return type === 'assessmentStepOptions' ? show : null
}

const ChatBase = ({
  assessment,
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
  handleClick,
  handleScroll,
  handleDataUpdate,
  handleLogsUpdate,
  headerConfig,
  hideAll,
  hideCtaButton,
  hideProgressBar,
  initChatLog,
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
    <Cover
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
      chatLogCallbacks={chatLogCallbacks}
      clickActions={clickActions}
      contentRef={contentRef}
      data={data}
      getMessageMaxWidthByType={getMessageMaxWidthByType}
      getMessageShowByType={getMessageShowByType}
      handleClick={handleClick}
      handleDataUpdate={handleDataUpdate}
      handleLogsUpdate={handleLogsUpdate}
      hideAll={hideAll}
      initChatLog={initChatLog}
      lazyLoadActive={lazyLoadActive}
      lazyLoadingCount={lazyLoadingCount}
      messageFactory={messageFactory}
      onScroll={handleScroll}
      onToggleContent={onToggleContent}
      persona={persona}
      products={products}
      ref={contentRef}
      setLazyLoadActive={setLazyLoadActive}
      storeLog={storeLog}
      touch={touch}
    />
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

export default compose(
  withState('hideAll', 'setHideAll', false),
  withState('countOfRows', 'setCountOfRows', 6),
  withProps(({ assessment, bridge }) => ({ specialFlow: assessment || bridge })),
  withHandlers({
    handleClick: ({ assessmentOptions, setHideAll }) => ({ type, item }) => {
      if (type === 'assessmentOption') {
        assessmentOptions.goToNextStep(item)
        if (!assessmentOptions.step.multiple) setHideAll(true)
        return true
      }
    },
    initChatLog: ({
      data,
      products,
      setCountOfRows,
      countOfRows,
      lazyLoadingCount,
      chatLogCallbacks,
      storeLog,
      setHideAll,
      assessment,
      setChatDataChanged,
    }) => ({ chatLog, isAssessmentUpdate, update, updateLogs, setLogs }) => {
      if (isAssessmentUpdate) {
        setHideAll(false)
        setLogs(storeLog && storeLog.logs ? [storeLog] : [])
      }
      let compiledData = data
      if (lazyLoadingCount) {
        setCountOfRows(countOfRows + lazyLoadingCount)
        let assessmentProducts = [...products.assessmentProducts]
        assessmentProducts.splice(countOfRows)
        compiledData = {
          ...data,
          simpleChat: {
            simpleChatSteps: [
              {
                key: 'default',
                simpleChatMessages: [
                  ...data.simpleChat.simpleChatSteps[0].simpleChatMessages,
                  { type: 'assessmentProducts', assessmentProducts },
                ],
              },
            ],
          },
        }
      }
      const chatLogProps = {
        data: compiledData,
        listeners: [updateLogs],
        callbacks: chatLogCallbacks,
        setChatDataChanged,
      }
      if (!isAssessmentUpdate && update) {
        chatLog.update(chatLogProps)
      } else if (!assessment || data.simpleChat) {
        chatLog.init(chatLogProps)
      }
    },
  }),
  withHandlers({
    handleLogsUpdate: ({ initChatLog }) => ({ chatLog, setLogs, updateLogs }) => {
      timeout.set('updateStore', () => initChatLog({ chatLog, isAssessmentUpdate: true, setLogs, updateLogs }), 100)
    },
    handleDataUpdate: ({ data, initChatLog, setHideAll, specialFlow }) => ({ chatLog, setLogs, updateLogs }) => {
      if (specialFlow) setHideAll(true)
      if (data.type === 'store') return
      timeout.set(
        'updateChatLog',
        () => initChatLog({ chatLog, isAssessmentUpdate: specialFlow, update: true, setLogs, updateLogs }),
        specialFlow ? 800 : 0
      )
    },
  }),
  lifecycle({
    componentWillUnmount() {
      timeout.clear('updateChatLog')
    },
  })
)(ChatBase)
