import ChatLogUi from './chat-log-ui'
import Container from 'app/content/scripted-chat/components/base-container'
import Cover from 'app/content/scripted-chat/components/cover'
import CtaButton from './cta-button'
import ScrollLock from 'ext/scroll-lock'
import { compose, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const Base = ({
  handleScroll,
  setContentRef,
  module,
  onToggleContent,
  coverMinimized,
  setPluginState,
  touch,
  getContentRef,
}) => (
  <Container contentRef={getContentRef}>
    <ScrollLock>
      <Cover hackathon header={module.header} minimized={coverMinimized} />
      <ChatLogUi
        contentRef={getContentRef}
        coverMinimized={coverMinimized}
        module={module}
        onScroll={handleScroll}
        setContentRef={setContentRef}
        touch={touch}
      />
      <CtaButton ctaButton={module.ctaButton} onToggleContent={onToggleContent} setPluginState={setPluginState} />
    </ScrollLock>
  </Container>
)

export default compose(
  withState('coverMinimized', 'setCoverMinimized', ({ module }) => !!module.header.minimized),
  withState('touch', 'setTouch', true),
  withHandlers(() => {
    let contentRef
    return {
      setContentRef: () => ref => (contentRef = ref),
      getContentRef: () => () => contentRef,
    }
  }),
  withHandlers({
    handleScroll: ({ setCoverMinimized, getContentRef, coverMinimized, module, setTouch, touch }) => event => {
      if (module.header.minimized) return
      const scrollTop = event.target.scrollTop
      if (scrollTop <= 0 && coverMinimized) {
        setTouch(false)
        setTimeout(() => {
          setTouch(true)
        }, 50)
        return setCoverMinimized(false)
      }
      if (scrollTop > 0 && !coverMinimized && touch) {
        const windowHeight = window.innerHeight
        const maxHeight = window.innerWidth >= 600 ? Math.min(windowHeight, 500) : windowHeight
        maxHeight - getContentRef().base.scrollHeight <= 90 && setCoverMinimized(true)
      }
    },
  })
)(Base)
