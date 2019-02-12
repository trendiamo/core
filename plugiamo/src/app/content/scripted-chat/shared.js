import ProductMessage from './product-message'
import snarkdown from 'snarkdown'
import styled from 'styled-components'
import TextMessage from './text-message'
import VideoMessage from './video-message'
import { compose, withHandlers, withProps } from 'recompose'
import { h } from 'preact'
import { IconAnimatedEllipsis, IconChevronRight } from 'plugin-base'
import { TopSlideAnimation } from 'plugin-base'

const AnimatedEllipsis = styled(IconAnimatedEllipsis)`
  width: 15px;
  fill: #9b9b9b;
  height: 15px;
`

const ChatBackground = styled.div`
  background-color: #ebeef2;
  padding: 1rem 1rem 0 1rem;
  flex: 1;
`

const MessageContainer = styled.div`
  width: 260px;

  & + & {
    margin-top: 0.3rem;
  }
`

const MessageMetadata = styled.div`
  font-size: 10px;
  font-weight: 500;
  line-height: 2;
  color: #9b9b9b;
  svg,
  span {
    vertical-align: middle;
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

const ChatMessage = ({ log, isMessageShown }) => (
  <MessageContainer>
    {isMessageShown ? (
      <Message message={log.message.text} />
    ) : (
      <MessageMetadata>
        <AnimatedEllipsis />
      </MessageMetadata>
    )}
  </MessageContainer>
)

const Option = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 0.75rem;
  color: ${({ highlighted }) => (highlighted ? 'white' : '#0599ff')};
  background-color: ${({ highlighted }) => (highlighted ? '#0599ff' : 'white')};
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Chevron = styled(IconChevronRight)`
  width: 10px;
  height: 10px;
  fill: ${({ highlighted }) => (highlighted ? 'white' : '#0599ff')};
  margin-left: 0.5rem;
`

const ChatOptionsContainer = styled.div`
  width: 70%;
  align-self: flex-end;
`

const ChatOptionsInner = styled.div`
  background-color: #fff;
  border-radius: 12px;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin-top: 1rem;
  margin-bottom: 1rem;

  ${Option}:last-child {
    border-bottom: 0;
  }
`

const AlignRight = styled.div`
  text-align: right;
`

const ChatOption = compose(
  withHandlers({
    onClick: ({ chatOption, onOptionClick }) => () => onOptionClick(chatOption),
  })
)(({ active, chatOption, onClick }) => (
  <Option active={active} highlighted={chatOption.selected} key={chatOption.id} onClick={onClick}>
    <AlignRight>{chatOption.text}</AlignRight>
    <Chevron highlighted={chatOption.selected} />
  </Option>
))

const ChatOptions = ({ log, onOptionClick }) => (
  <ChatOptionsContainer>
    <TopSlideAnimation timeout={250}>
      <ChatOptionsInner>
        {log.options.map(chatOption => (
          <ChatOption
            active={!log.selected}
            chatOption={chatOption}
            key={chatOption.id}
            onOptionClick={onOptionClick}
          />
        ))}
      </ChatOptionsInner>
    </TopSlideAnimation>
  </ChatOptionsContainer>
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
