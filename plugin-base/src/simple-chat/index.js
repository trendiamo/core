import ChatContent from './components/chat-content'
import ChatLogUi from './chat-log-ui'
import Container from './components/base-container'
import Cover from './components/cover'
import ProgressBar from './components/progress-bar'
import React, { useRef } from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { CtaButton, ScrollLock } from 'shared'

const finalCoverHeight = 90

const SimpleChat = ({
  animateOpacity,
  assessment,
  assessmentOptions,
  bridge,
  data,
  persona,
  ChatBase,
  backButtonLabel,
  onToggleContent,
  contentRef,
  handleScroll,
  headerConfig,
  ctaButton,
  onCtaButtonClick,
  coverMinimized,
  lazyLoadingCount,
  lazyLoadActive,
  setLazyLoadActive,
  products,
  progress,
  hideProgressBar,
  ctaButtonClicked,
  setCtaButtonClicked,
  hideCtaButton,
  touch,
  storeLog,
  goToPrevStep,
  showBackButton,
  clickActions,
  Modals,
  FlowBackButton,
  chatLogCallbacks,
}) => (
  <Container animateOpacity={animateOpacity} contentRef={contentRef}>
    <ScrollLock>
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
        {ChatBase || <ChatContent />}
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
      {Modals}
    </ScrollLock>
  </Container>
)

const SimpleChat1 = compose(
  withState('coverMinimized', 'setCoverMinimized', ({ coverIsMinimized }) => coverIsMinimized),
  withState('touch', 'setTouch', true),
  withState('lazyLoadActive', 'setLazyLoadActive', false),
  withHandlers({
    handleScroll: ({
      setCoverMinimized,
      contentRef,
      coverMinimized,
      coverIsMinimized,
      setTouch,
      touch,
      setLazyLoadActive,
      lazyLoadingCount,
    }) => event => {
      if (coverIsMinimized !== undefined) return
      const scrollTop = event.target.scrollTop
      if (lazyLoadingCount && event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight) {
        setLazyLoadActive(true)
      }
      if (scrollTop <= 0 && coverMinimized) {
        setTouch(false)
        setTimeout(() => setTouch(true), 50)
        return setCoverMinimized(false)
      }
      if (scrollTop > 0 && !coverMinimized && touch) {
        const pluginWindowHeight = window.innerWidth >= 600 ? Math.min(window.innerHeight, 500) : window.innerHeight
        const pluginFullHeight = contentRef.current.scrollHeight
        if (pluginWindowHeight - pluginFullHeight <= finalCoverHeight) {
          setCoverMinimized(true)
        }
      }
    },
  })
)(SimpleChat)

const SimpleChat2 = props => {
  const contentRef = useRef()

  return <SimpleChat1 {...props} contentRef={contentRef} />
}

export default SimpleChat2
