import Chat from 'app/content/scripted-chat/components/chat'
import ItemDiv from 'app/content/scripted-chat/components/item-div'
import { ChatBackground, convertLogs } from 'app/content/scripted-chat/shared'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'

const ChatLogUiTemplate = ({ onScroll, setContentRef, contentRef, setBackgroundRef, touch, minHeight, logSection }) => (
  <Chat onScroll={onScroll} ref={setContentRef} touch={touch}>
    <ChatBackground ref={setBackgroundRef} style={{ minHeight }}>
      <ItemDiv animate={false} contentRef={contentRef} dontScroll logSection={logSection} />
    </ChatBackground>
  </Chat>
)

const prepareProductsToChat = results => {
  return [{ message: { assessmentProducts: [...results], type: 'assessmentProducts' }, type: 'message' }]
}

export default compose(
  withState('logs', 'setLogs', []),
  withState('minHeight', 'setMinHeight', 0),
  withProps(({ results }) => ({
    logSection: {
      type: 'message',
      logs: prepareProductsToChat(results),
    },
  })),
  withHandlers(() => {
    let backgroundRef
    return {
      setContentRef: ({ setContentRef }) => ref => {
        setContentRef(ref)
      },
      setBackgroundRef: () => ref => (backgroundRef = ref),
      getBackgroundRef: () => () => backgroundRef,
    }
  }),
  withHandlers({
    configMinHeight: ({ setMinHeight, getBackgroundRef, minHeight }) => () => {
      if (getBackgroundRef().base.clientHeight !== minHeight) {
        setMinHeight(getBackgroundRef().base.clientHeight)
      }
    },
    updateLogs: ({ setLogs }) => ({ data }) => setLogs(convertLogs(data)),
  })
)(ChatLogUiTemplate)
