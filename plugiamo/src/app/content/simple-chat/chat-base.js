import Cover from './cover'
import CtaButton from 'special/cta-button'
import ProgressBar from 'special/assessment/progress-bar'
import { AssessmentForm, AssessmentProducts, AssessmentStepOptions } from 'special/assessment/message-types'
import { ChatLogUi, timeout } from 'plugin-base'
import { Fragment, h } from 'preact'
import { isSmall } from 'utils'
import { useCallback, useEffect, useState } from 'preact/hooks'

const messageFactory = ({ data, hideAll, nothingSelected, onClick, type }) => {
  if (type === 'assessmentStepOptions') {
    return (
      <AssessmentStepOptions hideAll={hideAll} nothingSelected={nothingSelected} onClick={onClick} options={data} />
    )
  } else if (type === 'assessmentProducts') {
    return <AssessmentProducts data={data} onClick={onClick} />
  } else if (type === 'assessmentForm') {
    return <AssessmentForm data={data} onChange={onClick} />
  }
}

const getMessageMaxWidthByType = type => {
  return ['assessmentProducts', 'assessmentStepOptions', 'assessmentForm'].includes(type) ? '260px' : null
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
  ctaButtonDisabled,
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
  seller,
  products,
  progress,
  setChatDataChanged,
  setCtaButtonClicked,
  setLazyLoadActive,
  showBackButton,
  storeLog,
  touch,
  isFinalStep,
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
            simpleChatSections: [
              {
                key: 'default',
                simpleChatMessages: [
                  ...data.simpleChat.simpleChatSections[0].simpleChatMessages,
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
      const delay = assessment && !(storeLog.logs && !isSmall()) && data.type !== 'store' ? 800 : isSmall() ? 0 : 100
      timeout.set(
        'updateChatLog',
        () => initChatLog({ chatLog, isAssessmentUpdate: assessment, update: true, setLogs, updateLogs }),
        delay
      )
    },
    [assessment, data.type, initChatLog, storeLog]
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
        isFinalStep={isFinalStep}
        minimized={coverMinimized}
        seller={seller}
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
        products={products}
        ref={contentRef}
        seller={seller}
        setLazyLoadActive={setLazyLoadActive}
        storeLog={storeLog}
        touch={touch}
      />
      {ctaButton && (
        <CtaButton
          clicked={ctaButtonClicked}
          ctaButton={ctaButton}
          disabled={ctaButtonDisabled}
          hide={hideCtaButton}
          onClick={onCtaButtonClick}
          setClicked={setCtaButtonClicked}
        />
      )}
    </Fragment>
  )
}

export default ChatBase
