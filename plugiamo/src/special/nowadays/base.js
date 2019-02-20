import ChatLogUi from './chat-log-ui'
import CtaButton from './cta-button'
import ScrollLock from 'ext/scroll-lock'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'
import { Cover } from './cover'
import { h } from 'preact'

const ColFlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background-color: #ebeef2;
  @keyframes _frekkls_message_appear {
    0% {
      opacity: 0;
      transform: translate(-20px, 0);
    }
    100% {
      opacity: 1;
    }
  }
`

const Base = ({
  handleScroll,
  setContentRef,
  handleWheel,
  module,
  onToggleContent,
  coverMinimized,
  setPluginState,
  touch,
  contentRef,
}) => (
  <ColFlexDiv onWheel={handleWheel}>
    <ScrollLock>
      <Cover header={module.header} minimized={coverMinimized} />
      <ChatLogUi
        contentRef={contentRef}
        coverMinimized={coverMinimized}
        module={module}
        onScroll={handleScroll}
        setContentRef={setContentRef}
        touch={touch}
      />
      <CtaButton ctaButton={module.ctaButton} onToggleContent={onToggleContent} setPluginState={setPluginState} />
    </ScrollLock>
  </ColFlexDiv>
)

export default compose(
  withState('coverMinimized', 'setCoverMinimized', ({ module }) => !!module.header.minimized),
  withState('touch', 'setTouch', true),
  withState('contentRef', 'setContentRef', null),
  withHandlers({
    handleScroll: ({ setCoverMinimized, coverMinimized, setTouch, touch }) => event => {
      const scrollTop = event.target.scrollTop
      if (scrollTop <= 0 && coverMinimized) {
        setTouch(false)
        setTimeout(() => {
          setTouch(true)
        }, 50)
        return setCoverMinimized(false)
      }
      if (scrollTop > 0 && !coverMinimized && touch) return setCoverMinimized(true)
    },
  }),
  withHandlers({
    handleWheel: ({ contentRef }) => event => {
      let delta = event.deltaY || event.detail || event.wheelDelta

      if (delta < 0 && contentRef.scrollTop == 0) {
        event.preventDefault()
      }

      if (delta > 0 && contentRef.scrollHeight - contentRef.clientHeight - contentRef.scrollTop <= 1) {
        event.preventDefault()
      }
    },
  })
)(Base)
