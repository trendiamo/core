import ChatLogUi from './chat-log-ui'
import Container from './components/base-container'
import Cover from './components/cover'
import omit from 'lodash.omit'
import React, { Fragment, useRef } from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { ScrollLock } from 'shared'

const finalCoverHeight = 90

const InnerSimpleChat = ({
  data,
  persona,
  backButtonLabel,
  onToggleContent,
  contentRef,
  handleScroll,
  headerConfig,
  coverMinimized,
  lazyLoadingCount,
  lazyLoadActive,
  setLazyLoadActive,
  products,
  touch,
  storeLog,
  goToPrevStep,
  showBackButton,
  clickActions,
  FlowBackButton,
  chatLogCallbacks,
}) => (
  <Fragment>
    <Cover
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
    <ChatLogUi
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
    />
  </Fragment>
)

const SimpleChat = props => {
  const { animateOpacity, ChatBase, chatBaseProps, contentRef, Modals } = props

  return (
    <Container animateOpacity={animateOpacity} contentRef={contentRef}>
      <ScrollLock>
        {ChatBase ? (
          <ChatBase
            contentRef={contentRef}
            {...omit(props, ['ChatBase', 'chatBaseProps', 'Modals'])}
            {...chatBaseProps}
          />
        ) : (
          <InnerSimpleChat contentRef={contentRef} {...omit(props, ['ChatBase', 'chatBaseProps', 'Modals'])} />
        )}
        {Modals}
      </ScrollLock>
    </Container>
  )
}

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
