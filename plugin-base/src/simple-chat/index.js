import ChatLogUi from './chat-log-ui'
import Container from './components/base-container'
import Cover from './components/cover'
import omit from 'lodash.omit'
import React, { Fragment, useCallback, useRef, useState } from 'react'
import { ScrollLock } from 'shared'

const finalCoverHeight = 90

const InnerSimpleChat = ({
  data,
  seller,
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
      seller={seller}
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
      products={products}
      ref={contentRef}
      seller={seller}
      setLazyLoadActive={setLazyLoadActive}
      storeLog={storeLog}
      touch={touch}
    />
  </Fragment>
)

const SimpleChat = props => {
  const { animateOpacity, ChatBase, coverIsMinimized, chatBaseProps, Modals, lazyLoadingCount } = props

  const contentRef = useRef()

  const [coverMinimized, setCoverMinimized] = useState(coverIsMinimized)
  const [touch, setTouch] = useState(true)
  const [lazyLoadActive, setLazyLoadActive] = useState(false)

  const handleScroll = useCallback(
    event => {
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
    [coverIsMinimized, coverMinimized, lazyLoadingCount, touch]
  )

  return (
    <Container animateOpacity={animateOpacity} contentRef={contentRef}>
      <ScrollLock>
        {ChatBase ? (
          <ChatBase
            contentRef={contentRef}
            coverMinimized={coverMinimized}
            handleScroll={handleScroll}
            lazyLoadActive={lazyLoadActive}
            setLazyLoadActive={setLazyLoadActive}
            touch={touch}
            {...omit(props, ['ChatBase', 'chatBaseProps', 'Modals'])}
            {...chatBaseProps}
          />
        ) : (
          <InnerSimpleChat
            contentRef={contentRef}
            coverMinimized={coverMinimized}
            handleScroll={handleScroll}
            lazyLoadActive={lazyLoadActive}
            setLazyLoadActive={setLazyLoadActive}
            touch={touch}
            {...omit(props, ['ChatBase', 'chatBaseProps', 'Modals'])}
          />
        )}
        {Modals}
      </ScrollLock>
    </Container>
  )
}

export default SimpleChat
