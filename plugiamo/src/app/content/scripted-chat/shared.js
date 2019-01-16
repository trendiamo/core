import snarkdown from 'snarkdown'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
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
  padding: 1rem;
  flex: 1;
`

const MessageContainer = styled.div`
  width: 70%;
`

const MessageContent = styled.div`
  background-color: #fff;
  overflow: hidden;
  border-radius: 0 12px 12px 12px;
  padding: 1rem;
  font-size: 14px;
  position: relative;

  &&:after {
    content: ' ';
    position: absolute;
    top: 0;
    left: -20px;
    width: 10px;
    height: 15px;
    border-bottom: 15px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid #fff;
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
const ChatMessage = ({ log, isMessageShown }) => (
  <MessageContainer>
    {isMessageShown && <MessageContent dangerouslySetInnerHTML={{ __html: snarkdown(log.message.text) }} />}
    <MessageMetadata>
      {isMessageShown || <AnimatedEllipsis />} <span>{log.from}</span>
    </MessageMetadata>
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

export { ChatBackground, ChatMessage, ChatOptions }
