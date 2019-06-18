import Cover from './cover'
import CtaButton from 'special/cta-button'
import ProgressBar from 'special/assessment/progress-bar'
import { AssessmentProducts, AssessmentStepOptions } from 'special/assessment/message-types'
import { ChatLogUi, timeout } from 'plugin-base'
import { Fragment, h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

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
  assessmentOptions,
  backButtonLabel,
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
  setChatDataChanged,
  setCtaButtonClicked,
  setLazyLoadActive,
  showBackButton,
  storeLog,
  touch,
}) => {
  const [hideAll, setHideAll] = useState(false)
  const [countOfRows, setCountOfRows] = useState(6)

  const handleClick = useCallback(
    ({ type, item }) => {
      if (type === 'assessmentOption') {
        assessmentOptions.goToNextStep(item)
        if (!assessmentOptions.step.multiple) setHideAll(true)
        return true
      }
    },
    [assessmentOptions]
  )

  const initChatLog = useCallback(
    ({ chatLog, isAssessmentUpdate, update, updateLogs, setLogs }) => {
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
    [assessment, chatLogCallbacks, countOfRows, data, lazyLoadingCount, products, setChatDataChanged, storeLog]
  )

  const handleLogsUpdate = useCallback(
    ({ chatLog, setLogs, updateLogs }) => {
      timeout.set('updateStore', () => initChatLog({ chatLog, isAssessmentUpdate: true, setLogs, updateLogs }), 100)
    },
    [initChatLog]
  )

  const handleDataUpdate = useCallback(
    ({ chatLog, setLogs, updateLogs }) => {
      if (assessment) setHideAll(true)
      if (data.type === 'store') return
      timeout.set(
        'updateChatLog',
        () => initChatLog({ chatLog, isAssessmentUpdate: assessment, update: true, setLogs, updateLogs }),
        assessment ? 800 : 0
      )
    },
    [assessment, data.type, initChatLog]
  )

  useEffect(() => () => timeout.clear('updateChatLog'), [])

  return (
    <Fragment>
      <Cover
        assessment={assessment}
        backButtonLabel={backButtonLabel}
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
}

export default ChatBase
