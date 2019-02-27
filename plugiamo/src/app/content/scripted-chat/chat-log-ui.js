import Chat from './components/chat'
import ConsumerContent from './components/consumer-content'
import getFrekklsConfig from 'frekkls-config'
import { ChatBackground } from 'app/content/scripted-chat/shared'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { Consumer } from 'ext/graphql-context'
import { h } from 'preact'

const ChatLogUiTemplate = ({
  setContentRef,
  contentRef,
  setBackgroundRef,
  minHeight,
  configMinHeight,
  initialChatStep,
  persona,
  title,
  onStopChat,
}) => (
  <Chat ref={setContentRef} touch>
    <ChatBackground ref={setBackgroundRef} style={{ minHeight }}>
      <Consumer>
        {client => (
          <ConsumerContent
            client={client}
            configMinHeight={configMinHeight}
            contentRef={contentRef}
            initialChatStep={initialChatStep}
            onStopChat={onStopChat}
            persona={persona}
            title={title}
          />
        )}
      </Consumer>
    </ChatBackground>
  </Chat>
)

export default compose(
  withState('minHeight', 'setMinHeight', 0),
  withProps(({ data }) => ({
    initialChatStep: data.scriptedChat.chatStep,
    title: data.scriptedChat.title,
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
    onStopChat: ({ onToggleContent }) => () => {
      onToggleContent()
      getFrekklsConfig().onChatStop()
    },
  })
)(ChatLogUiTemplate)
