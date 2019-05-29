import Chat from './components/chat'
import ChatBackground from './components/chat-background'
import React, { forwardRef, useCallback, useRef, useState } from 'react'

const ChatLogUi = forwardRef(
  ({ chatLogCallbacks, children, contentRef, onScroll, onToggleContent, touch, ...props }, ref) => {
    const backgroundRef = useRef()
    const [minHeight, setMinHeight] = useState(0)

    const configMinHeight = useCallback(
      () => {
        if (backgroundRef.current.clientHeight !== minHeight) {
          setMinHeight(backgroundRef.current.clientHeight)
        }
      },
      [minHeight]
    )

    const resetMinHeight = useCallback(
      () => {
        if (minHeight === 0) return
        setMinHeight(0)
      },
      [minHeight]
    )

    const onStopChat = useCallback(
      () => {
        onToggleContent()
        chatLogCallbacks && chatLogCallbacks.onChatStop && chatLogCallbacks.onChatStop()
      },
      [chatLogCallbacks, onToggleContent]
    )

    return (
      <Chat onScroll={onScroll} ref={ref} touch={touch}>
        <ChatBackground ref={backgroundRef} style={{ minHeight }}>
          {React.cloneElement(children, { ...props, configMinHeight, contentRef, onStopChat, resetMinHeight })}
        </ChatBackground>
      </Chat>
    )
  }
)

export default ChatLogUi
