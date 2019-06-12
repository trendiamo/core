import React, { useEffect, useMemo, useState } from 'react'
import snarkdown from 'snarkdown'
import styled from 'styled-components'
import timeout from 'ext/timeout'
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
  clickActionsExist,
  doneAnimation,
  getMessageMaxWidthByType,
  getMessageShowByType,
  hideAll,
  index,
  isLastMessage,
  log,
  messageFactory,
  nothingSelected,
  onClick,
  setDoneAnimation,
}) => {
  const [show, setShow] = useState(false)
  const [clickable, setClickable] = useState(false)

  const type = useMemo(() => log.message.type, [log.message.type])

  const data = useMemo(
    () => {
      if (!type) return
      return type === 'SimpleChatTextMessage'
        ? log.message.text
        : type === 'SimpleChatProductMessage'
        ? {
            title: log.message.title,
            picUrl: log.message.picUrl,
            picRect: log.message.picRect,
            url: log.message.url,
            displayPrice: log.message.displayPrice,
            newTab: log.message.newTab,
          }
        : type === 'SimpleChatVideoMessage'
        ? extractYoutubeId(log.message.videoUrl)
        : type === 'SimpleChatPictureMessage'
        ? {
            picUrl: log.message.picUrl,
            picRect: log.message.picRect,
          }
        : log.message[type]
    },
    [log.message, type]
  )

  const customMessage = messageFactory && messageFactory({ data, hideAll, nothingSelected, onClick, type })

  useEffect(
    () => () => {
      timeout.clear('messageAnimation')
    },
    []
  )

  useEffect(
    () => {
      if (!hideAll) return
      setDoneAnimation(false)
    },
    [hideAll, setDoneAnimation]
  )

  useEffect(
    () => {
      if (show) return
      const delay = doneAnimation ? 100 : index * MESSAGE_INTERVAL + Math.floor(Math.random() * MESSAGE_RANDOMIZER)
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
    [doneAnimation, index, isLastMessage, setDoneAnimation, show]
  )

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
        <PictureMessage onClick={onClick} picture={data} />
      ) : type === 'productCarousel' ? (
        <ProductCarouselMessage carouselType={type} onClick={onClick} productCarousel={data} />
      ) : type === 'imageCarousel' ? (
        <ImgCarouselMessage carouselType={type} imageCarousel={data} onClick={onClick} />
      ) : null}
    </MessageContainer>
  )
}

export default ChatMessage
