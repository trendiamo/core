import ProductMessage from './product-message'
import snarkdown from 'snarkdown'
import styled from 'styled-components'
import TextMessage from './text-message'
import VideoMessage from './video-message'
import { compose, withHandlers, withProps } from 'recompose'
import { h } from 'preact'
import { TopSlideAnimation } from 'plugin-base'

const ChatBackground = styled.div`
  background-color: #ebeef2;
  padding: 1rem 1rem 0 1rem;
  flex: 1;
`

const MessageContainer = styled.div`
  width: 260px;

  & + & {
    margin-top: 5px;
  }
  &:last-child {
    margin-bottom: 15px;
  }
  animation: _frekkls_message_appear 0.3s ease-out;
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

const extractYoutubeId = message => {
  const regExp = /^\S*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/
  const match = message.match(regExp)
  return match && match[2].length === 11 && match[2]
}

const extractJson = message => {
  if (message[0] !== '{') return
  try {
    return JSON.parse(message)
  } catch (e) {
    return null
  }
}

const Message = compose(
  withProps(({ message }) => {
    const youtubeId = extractYoutubeId(message)
    const product = extractJson(message)
    return {
      youtubeId,
      product,
    }
  })
)(({ message, youtubeId, product }) =>
  youtubeId ? (
    <VideoMessage youtubeId={youtubeId} />
  ) : product ? (
    <ProductMessage product={product} />
  ) : (
    <TextMessage dangerouslySetInnerHTML={{ __html: snarkdown(message) }} />
  )
)

const ChatMessage = ({ log }) => (
  <MessageContainer>
    <Message message={log.message.text} />
  </MessageContainer>
)

const Option = styled.div`
  max-width: 260px;
  align-self: flex-end;
  text-align: right;
  & + * {
    padding-top: 5px;
  }
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
`

const ChatOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 0 16px;
`

const ChatOptionText = styled.div`
  appearance: none;
  outline: 0;
  margin: 0;
  padding: 8px 15px;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  font-weight: ${({ highlighted }) => (highlighted ? 'normal' : '500')};
  background: ${({ highlighted }) => (highlighted ? '#222' : '#fff')};
  color: ${({ highlighted }) => (highlighted ? '#fff' : '#222')};
  cursor: ${({ highlighted }) => (highlighted ? 'default' : 'pointer')};
  font-size: 14px;
  line-height: 1.4;
`

const ChatOption = compose(
  withHandlers({
    onClick: ({ chatOption, onOptionClick }) => () => onOptionClick(chatOption),
  })
)(({ active, chatOption, onClick }) => (
  <Option active={active} key={chatOption.id} onClick={onClick}>
    <ChatOptionText highlighted={chatOption.selected}>{chatOption.text}</ChatOptionText>
  </Option>
))

const ChatOptions = ({ log, onOptionClick }) => (
  <TopSlideAnimation timeout={250}>
    <ChatOptionsContainer>
      {log.options.map(chatOption => (
        <ChatOption active={!log.selected} chatOption={chatOption} key={chatOption.id} onOptionClick={onOptionClick} />
      ))}
    </ChatOptionsContainer>
  </TopSlideAnimation>
)

const scrollAllParents = node => {
  if (!node) return
  if (node.scroll) node.scroll({ top: node.scrollHeight, behavior: 'smooth' })
  scrollAllParents(node.parentNode)
}

const scrollToInPlugin = node => {
  setTimeout(() => {
    // doing a simple `node.scrollIntoView`, Safari would scroll the main page rather than just the plugin.
    // also, in other browsers, the simple `node.scrollIntoView` does not go well with the height-under-500px case.
    // note we don't actually need to scroll all parents, just the right one - but coding it like this is simpler.
    scrollAllParents(node)
  }, 120)
}

export { ChatBackground, ChatMessage, ChatOptions, scrollToInPlugin }
