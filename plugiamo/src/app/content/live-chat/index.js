import { h } from 'preact'
import { IconSend } from 'icons'
import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import { TopSlideAnimation } from 'shared/animate'
import { websocketUrl } from 'config'
import withCable from 'ext/recompose/with-cable'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { CoverImg, InfluencerDescription, PaddedCover } from 'shared/cover'
// import { gql, withClient } from 'ext/recompose/graphql'

const ChatBackground = styled.div`
  background-color: #ebeef2;
  padding: 1rem;
  flex: 1;
`

const FlexDiv = styled.div`
  display: flex;
`

const CoverLiveChat = () => (
  <FlexDiv>
    <CoverImg src="https://randomuser.me/api/portraits/men/21.jpg" />
    <PaddedCover>
      <span>{'Live chat'}</span>
      <TopSlideAnimation timeout={250 * 1}>
        <InfluencerDescription>{'Chat live with a person'}</InfluencerDescription>
      </TopSlideAnimation>
    </PaddedCover>
  </FlexDiv>
)

const Textarea = styled.textarea`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  padding: 1rem;
  padding-right: calc(2rem + 20px);
  font-size: 14px;
  line-height: 1.33;
  border: none;
  width: 100%;
  resize: none;
  outline: 0;
  white-space: pre;
  white-space: pre-wrap;
  word-wrap: break-word;
`

const MessageInput = compose(
  withHandlers({
    onChange: ({ setBody }) => event => setBody(event.target.value),
  })
)(({ body, onChange }) => <Textarea onChange={onChange} value={body} />)

const Composer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 56px;
  max-height: 200px;
  border-top: 1px solid #e6e6e6;
`

const StyledIconSend = styled(IconSend)`
  width: 20px;
  height: 20px;
`

const Button = styled.button`
  border: 0;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  height: 100%;
  outline: 0;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`

const ComposerButtons = styled(({ className, onSend }) => (
  <div className={className}>
    <Button aria-label="Send a message…" onClick={onSend} tabIndex="0" type="button">
      <StyledIconSend />
    </Button>
  </div>
))`
  position: absolute;
  top: 0;
  right: 1rem;
  height: 100%;
`

const ContentLiveChat = compose(
  withState('messages', 'setMessages', {}),
  withState('body', 'setBody', ''),
  withProps(() => ({
    visitorRef: mixpanel.get_distinct_id(),
  })),
  withHandlers({
    onMessageReceived: ({ messages, setMessages }) => message => {
      const newMessages = { ...messages, [message.timestamp]: message }
      // console.log('received', { message, messages, newMessages })
      setMessages(newMessages)
    },
  }),
  // withClient(),
  withCable(
    websocketUrl,
    ({ visitorRef }) => ({ channel: 'MessagesChannel', visitor_ref: visitorRef }),
    ({ onMessageReceived }) => ({
      // connected: () => console.log('cable connected'),
      // disconnected: () => console.log('cable disconnected'),
      // initialized: () => console.log('cable initialized'),
      received: onMessageReceived,
      // rejected: () => console.log('cable rejected'),
    })
  ),
  withHandlers({
    onSend: ({ body, cable }) => () => {
      cable.perform('new_message', { body, timestamp: Date.now() })
    },
    // onSend: ({ body, client, visitorRef }) => () => {
    //   const query = gql`
    //     mutation addMessage($body: String!, $visitorRef: String!) {
    //       addMessage(body: $body, visitorRef: $visitorRef) {
    //         id
    //       }
    //     }
    //   `
    //   client
    //     .request(query, { body, visitorRef })
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error))
    // },
  })
)(styled(({ body, className, messages, onSend, setBody }) => (
  <div className={className}>
    <ChatBackground>
      {Object.values(messages).map(message => (
        <p key={message.timestamp}>{message.body}</p>
      ))}
    </ChatBackground>
    <Composer>
      <MessageInput body={body} setBody={setBody} />
      <ComposerButtons onSend={onSend} />
    </Composer>
  </div>
))`
  display: flex;
  flex: 1;
  flex-direction: column;
`)

export { CoverLiveChat, ContentLiveChat }
