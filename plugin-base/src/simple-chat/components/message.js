import React from 'react'
import snarkdown from 'snarkdown'
import styled from 'styled-components'
import timeout from 'ext/timeout'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { extractYoutubeId, MESSAGE_INTERVAL, MESSAGE_RANDOMIZER, replaceExternalLinks } from 'tools'
import {
  ImgCarouselMessage,
  PictureMessage,
  ProductCarouselMessage,
  ProductMessage,
  TextMessage,
  VideoMessage,
} from './message-types'

const MessageContainer = styled.div`
  max-width: ${({ maxWidth }) => maxWidth};
  & + * {
    margin-top: 5px;
  }
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  ${({ show }) =>
    !show &&
    `
    opacity: 0;
    transform: translate(-20px, 0);
  `}
  ${({ clickable }) => !clickable && 'pointer-events: none;'}
`

const messageMaxWidth = ({ getMessageMaxWidthByType, type }) => {
  const result = getMessageMaxWidthByType && getMessageMaxWidthByType(type)
  return result || ['productCarousel', 'imageCarousel'].includes(type) ? 'none' : '260px'
}

const messageShow = ({ hideAll, getMessageShowByType, show, type }) => {
  const result = getMessageShowByType ? getMessageShowByType(type, show) : null
  return result == null ? !hideAll && show : result
}

const ChatMessage = ({
  data,
  type,
  show,
  hideAll,
  messageFactory,
  getMessageMaxWidthByType,
  getMessageShowByType,
  nothingSelected,
  onClick,
  clickable,
  clickActionsExist,
}) => {
  const customMessage = messageFactory && messageFactory({ data, hideAll, nothingSelected, onClick, type })

  return (
    <MessageContainer
      clickable={clickable}
      maxWidth={messageMaxWidth({ getMessageMaxWidthByType, type })}
      show={messageShow({ hideAll, getMessageShowByType, show, type })}
      type={type}
    >
      {customMessage ? (
        customMessage
      ) : type === 'SimpleChatTextMessage' ? (
        <TextMessage
          clickActionsExist={clickActionsExist}
          dangerouslySetInnerHTML={{
            __html: replaceExternalLinks(snarkdown(data)),
          }}
          onClick={onClick}
        />
      ) : type === 'SimpleChatVideoMessage' ? (
        <VideoMessage onClick={onClick} youtubeId={data} />
      ) : type === 'SimpleChatProductMessage' ? (
        <ProductMessage onClick={onClick} product={data} />
      ) : type === 'SimpleChatPictureMessage' ? (
        <PictureMessage onClick={onClick} picUrl={data} />
      ) : type === 'productCarousel' ? (
        <ProductCarouselMessage carouselType={type} onClick={onClick} productCarousel={data} />
      ) : type === 'imageCarousel' ? (
        <ImgCarouselMessage carouselType={type} imageCarousel={data} onClick={onClick} />
      ) : null}
    </MessageContainer>
  )
}

export default compose(
  withState('show', 'setShow', false),
  withState('clickable', 'setClickable', false),
  withHandlers({
    getDataWithType: ({ log }) => () => {
      const type = log.message.type
      if (!type) return
      const data =
        type === 'SimpleChatTextMessage'
          ? log.message.text
          : type === 'SimpleChatProductMessage'
          ? {
              title: log.message.title,
              picUrl: log.message.picUrl,
              url: log.message.url,
              displayPrice: log.message.displayPrice,
              newTab: log.message.newTab,
            }
          : type === 'SimpleChatVideoMessage'
          ? extractYoutubeId(log.message.videoUrl)
          : type === 'SimpleChatPictureMessage'
          ? log.message.picUrl
          : log.message[type]
      return { type, data }
    },
  }),
  withProps(({ getDataWithType }) => {
    return getDataWithType()
  }),
  lifecycle({
    componentDidMount() {
      const { setShow, index, setClickable, isLastMessage, doneAnimation, setDoneAnimation } = this.props
      const delay = doneAnimation ? 100 : index * MESSAGE_INTERVAL + Math.floor(Math.random() + MESSAGE_RANDOMIZER)
      timeout.set(
        'messageAnimation',
        () => {
          setShow(true)
          isLastMessage && setDoneAnimation(true)
          timeout.set('messageAnimation', () => setClickable(true), 300)
        },
        delay
      )
    },
    componentWillUnmount() {
      timeout.clear('messageAnimation')
    },
  })
)(ChatMessage)
