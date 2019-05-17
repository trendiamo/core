import emojify from 'ext/emojify'
import React from 'react'
import snarkdown from 'snarkdown'
import styled from 'styled-components'
import timeout from 'ext/timeout'
import {
  AssessmentProducts,
  AssessmentStepOptions,
  ImgCarouselMessage,
  ProductCarouselMessage,
  ProductMessage,
  TextMessage,
  VideoMessage,
} from './message-types'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { extractJson, extractYoutubeId, MESSAGE_INTERVAL, MESSAGE_RANDOMIZER, replaceExternalLinks } from 'tools'

const MessageContainer = styled.div`
  max-width: ${({ type }) =>
    ['productCarousel', 'imageCarousel', 'assessmentStepOptions', 'assessmentProducts'].includes(type)
      ? 'none'
      : '260px'};
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

const ChatMessageTemplate = ({ data, type, show, hideAll, onClick, clickable, nothingSelected, clickActionsExist }) => (
  <MessageContainer clickable={clickable} show={type === 'assessmentStepOptions' ? show : !hideAll && show} type={type}>
    {type === 'SimpleChatTextMessage' ? (
      <TextMessage
        clickActionsExist={clickActionsExist}
        dangerouslySetInnerHTML={{
          __html: emojify(replaceExternalLinks(snarkdown(data))),
        }}
        onClick={onClick}
      />
    ) : type === 'SimpleChatVideoMessage' ? (
      <VideoMessage onClick={onClick} youtubeId={data} />
    ) : type === 'SimpleChatProductMessage' ? (
      <ProductMessage onClick={onClick} product={data} />
    ) : type === 'productCarousel' ? (
      <ProductCarouselMessage carouselType={type} onClick={onClick} productCarousel={data} />
    ) : type === 'imageCarousel' ? (
      <ImgCarouselMessage carouselType={type} imageCarousel={data} onClick={onClick} />
    ) : type === 'assessmentStepOptions' ? (
      <AssessmentStepOptions hideAll={hideAll} nothingSelected={nothingSelected} onClick={onClick} options={data} />
    ) : type === 'assessmentProducts' ? (
      <AssessmentProducts data={data} onClick={onClick} />
    ) : null}
  </MessageContainer>
)

const checkForSpecialImageCarousel = text => {
  const dataArray = text.split('-IMAGECAROUSEL-')
  if (dataArray.length < 2) return
  return dataArray[1]
    .split('- ')
    .slice(1)
    .map(item => ({
      picUrl: item,
    }))
}

const ChatMessage = compose(
  withState('show', 'setShow', false),
  withState('clickable', 'setClickable', false),
  withHandlers({
    getDataWithoutType: ({ log }) => () => {
      const text = log.message.text
      const videoData = extractYoutubeId(text)
      const productData = !videoData && extractJson(text)
      if (!productData && text.startsWith('-IMAGECAROUSEL-')) {
        const data = checkForSpecialImageCarousel(text)
        if (data) return { type: 'imageCarousel', data }
      }
      const type = videoData
        ? 'SimpleChatVideoMessage'
        : productData
        ? 'SimpleChatProductMessage'
        : 'SimpleChatTextMessage'
      return { type, data: videoData || productData || text }
    },
    getDataWithType: ({ log }) => () => {
      const type = log.message.type
      if (!type) return
      if (type === 'SimpleChatTextMessage' && log.message.text.startsWith('-IMAGECAROUSEL-')) {
        const data = checkForSpecialImageCarousel(log.message.text)
        if (data) return { type: 'imageCarousel', data }
      }
      const data =
        type === 'SimpleChatTextMessage'
          ? log.message.text
          : type === 'SimpleChatProductMessage'
          ? {
              title: log.message.title,
              picUrl: (log.message.picture && log.message.picture.url) || log.message.picUrl,
              url: log.message.url,
              displayPrice: log.message.displayPrice,
            }
          : type === 'SimpleChatVideoMessage'
          ? extractYoutubeId(log.message.videoUrl)
          : log.message[type]
      return { type, data }
    },
  }),
  withProps(({ getDataWithType, getDataWithoutType }) => {
    return getDataWithType() || getDataWithoutType()
  }),
  lifecycle({
    componentDidMount() {
      const { setShow, index, setClickable } = this.props
      const delay = index * MESSAGE_INTERVAL + Math.floor(Math.random() + MESSAGE_RANDOMIZER)
      timeout.set(
        'messageAnimation',
        () => setShow(true) || timeout.set('messageAnimation', () => setClickable(true), 300),
        delay
      )
    },
    componentWillUnmount() {
      timeout.clear('messageAnimation')
    },
  })
)(ChatMessageTemplate)

export default ChatMessage
