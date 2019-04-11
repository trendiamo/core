import ChatLogUi from './chat-log-ui'
import Container from 'app/content/scripted-chat/components/base-container'
import Cover from 'app/content/scripted-chat/components/cover'
import ScrollLock from 'ext/scroll-lock'
import { compose, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const Base = ({
  handleScroll,
  setContentRef,
  module,
  coverMinimized,
  touch,
  getContentRef,
  products,
  productsData,
}) => (
  <Container contentRef={getContentRef}>
    <ScrollLock>
      <Cover hackathon header={module.header} minimized={coverMinimized} />
      <ChatLogUi
        contentRef={getContentRef}
        coverMinimized={coverMinimized}
        module={module}
        onScroll={handleScroll}
        products={products}
        productsData={productsData}
        setContentRef={setContentRef}
        touch={touch}
      />
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
    handleScroll: ({ setCoverMinimized, coverMinimized, module, setTouch, touch }) => event => {
      if (module.header.minimized) return
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
  })
)(Base)
