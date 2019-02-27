import snarkdown from 'snarkdown'
import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { emojify } from 'plugin-base'
import { extractJson, extractYoutubeId, MESSAGE_INTERVAL, MESSAGE_RANDOMIZER } from 'app/content/scripted-chat/shared'
import { h } from 'preact'
import { ImgCarouselMessage, ProductCarouselMessage, ProductMessage, TextMessage, VideoMessage } from './message-types'

const MessageContainer = styled.div`
  max-width: ${({ type }) => (['productCarousel', 'imageCarousel'].includes(type) ? 'auto' : '260px')};
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

const ChatMessageTemplate = ({ data, type, show }) => (
  <MessageContainer show={show} type={type}>
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