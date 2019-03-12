import snarkdown from 'snarkdown'
import styled from 'styled-components'
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
import { emojify } from 'plugin-base'
import { extractJson, extractYoutubeId, MESSAGE_INTERVAL, MESSAGE_RANDOMIZER } from 'app/content/scripted-chat/shared'
import { h } from 'preact'

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
`

const ChatMessageTemplate = ({ onMessageClick, data, type, show, hideAll, onClick }) => (
  <MessageContainer show={type === 'assessmentStepOptions' ? show : !hideAll && show} type={type}>
    {type === 'text' ? (
      <TextMessage dangerouslySetInnerHTML={{ __html: emojify(snarkdown(data)) }} />
    ) : type === 'videoUrl' ? (
      <VideoMessage youtubeId={data} />
    ) : type === 'product' ? (
      <ProductMessage product={data} />
    ) : type === 'productCarousel' ? (
      <ProductCarouselMessage carouselType={type} productCarousel={data} />
    ) : type === 'imageCarousel' ? (
      <ImgCarouselMessage carouselType={type} imageCarousel={data} />
    ) : type === 'assessmentStepOptions' ? (
      <AssessmentStepOptions hideAll={hideAll} onClick={onMessageClick} options={data} />
    ) : type === 'assessmentProducts' ? (
      <AssessmentProducts data={data} onClick={onClick} />
    ) : null}
  </MessageContainer>
)

const ChatMessage = compose(
  withState('show', 'setShow', false),
  withHandlers({
    getDataWithoutType: ({ log }) => () => {
      const text = log.message.text
      const videoData = extractYoutubeId(text)
      const productData = !videoData && extractJson(text)
      const type = videoData ? 'videoUrl' : productData ? 'product' : 'text'
      return { type, data: videoData || productData || text }
    },
    getDataWithType: ({ log }) => () => {
      const type = log.message.type
      if (!type) return
      const data = log.message[type]
      return { type, data: type === 'videoUrl' ? extractYoutubeId(data) : data }
    },
  }),
  withProps(({ getDataWithType, getDataWithoutType }) => {
    return getDataWithType() || getDataWithoutType()
  }),
  lifecycle({
    componentDidMount() {
      const { setShow, index } = this.props
      setTimeout(() => {
        setShow(true)
      }, index * MESSAGE_INTERVAL + Math.floor(Math.random() + MESSAGE_RANDOMIZER))
    },
  })
)(ChatMessageTemplate)

export default ChatMessage
