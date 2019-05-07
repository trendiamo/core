import Chat from './components/chat'
import ChatBackground from './components/chat-background'
import React from 'react'
import withRef from 'ext/with-ref'
import { compose, withHandlers, withState } from 'recompose'

const ChatLogUiTemplate = ({ onScroll, setContentRef, touch, setBackgroundRef, minHeight, children, ...props }) => (
  <Chat onScroll={onScroll} ref={setContentRef} touch={touch}>
    <ChatBackground ref={setBackgroundRef} style={{ minHeight }}>
      {React.cloneElement(children, props)}
    </ChatBackground>
  </Chat>
)

export default compose(
  withState('minHeight', 'setMinHeight', 0),
  withRef('getBackgroundRef', 'setBackgroundRef'),
  withHandlers({
    configMinHeight: ({ setMinHeight, getBackgroundRef, minHeight }) => () => {
      if (getBackgroundRef().clientHeight !== minHeight) {
        setMinHeight(getBackgroundRef().clientHeight)
      }
    },
    onStopChat: ({ onToggleContent, chatLogCallbacks }) => () => {
      onToggleContent()
      chatLogCallbacks && chatLogCallbacks.onChatStop && chatLogCallbacks.onChatStop()
    },
  })
)(ChatLogUiTemplate)
