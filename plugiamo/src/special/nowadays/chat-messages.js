import ProductMessage from './product-message'
import snarkdown from 'snarkdown'
import styled from 'styled-components'
import TextMessage from 'app/content/scripted-chat/text-message'
import VideoMessage from 'app/content/scripted-chat/video-message'
import { ChatBackground } from 'app/content/scripted-chat/shared'
import { h } from 'preact'

const extractYoutubeId = message => {
  const regExp = /^\S*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/
  const match = message.match(regExp)
  return match && match[2].length === 11 && match[2]
}

const MessageContainer = styled.div`
  width: 260px;

  & + & {
    margin-top: 0.3rem;
  }
`

const ChatMessages = ({ chatMessages }) => (
  <ChatBackground>
    {chatMessages.map(chatMessage =>
      chatMessage.type === 'text' ? (
        <MessageContainer>
          <TextMessage dangerouslySetInnerHTML={{ __html: snarkdown(chatMessage.text) }} />
        </MessageContainer>
      ) : chatMessage.type === 'videoUrl' ? (
        <MessageContainer>
          <VideoMessage youtubeId={extractYoutubeId(chatMessage.videoUrl)} />
        </MessageContainer>
      ) : chatMessage.type === 'product' ? (
        <MessageContainer>
          <ProductMessage product={chatMessage.product} />
        </MessageContainer>
      ) : null
    )}
  </ChatBackground>
)

export default ChatMessages
