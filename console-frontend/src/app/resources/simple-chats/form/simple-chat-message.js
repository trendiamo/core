import isEqual from 'lodash.isequal'
import omit from 'lodash.omit'
import ProductMessageFields from './product-message-fields'
import React from 'react'
import TextMessageFields from './text-message-fields'
import VideoMessageField from './video-message-field'
import { branch, compose, lifecycle, renderNothing, shouldUpdate, withHandlers, withState } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { extractJson, extractYoutubeId } from 'plugin-base'

const setSimpleChatMessageTitle = simpleChatMessage => {
  switch (simpleChatMessage.type) {
    case 'SimpleChatTextMessage':
      return simpleChatMessage.id ? `Text message: ${simpleChatMessage.text}` : 'New text message'
    case 'SimpleChatProductMessage':
      return simpleChatMessage.id ? `Product: ${simpleChatMessage.title}` : 'New product'
    case 'SimpleChatVideoMessage':
      return simpleChatMessage.id ? `Video: ${simpleChatMessage.videoUrl}` : 'New video'
    default:
      return 'New message'
  }
}

const MessageField = ({
  isCropping,
  isFormLoading,
  onFocus,
  onSimpleChatMessageEdit,
  setIsCropping,
  setSimpleChatMessagePicture,
  simpleChatMessage,
  simpleChatMessageIndex,
}) => {
  switch (simpleChatMessage.type) {
    case 'SimpleChatTextMessage':
      return (
        <TextMessageFields
          disabled={isFormLoading}
          name="simpleChatMessage_text"
          onChange={onSimpleChatMessageEdit}
          onFocus={onFocus}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={simpleChatMessageIndex}
        />
      )
    case 'SimpleChatProductMessage':
      return (
        <ProductMessageFields
          isCropping={isCropping}
          isFormLoading={isFormLoading}
          name="simpleChatMessage_product"
          onChange={onSimpleChatMessageEdit}
          onFocus={onFocus}
          setIsCropping={setIsCropping}
          setSimpleChatMessagePicture={setSimpleChatMessagePicture}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={simpleChatMessageIndex}
        />
      )
    case 'SimpleChatVideoMessage':
      return (
        <VideoMessageField
          isFormLoading={isFormLoading}
          name="simpleChatMessage_video"
          onChange={onSimpleChatMessageEdit}
          onFocus={onFocus}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={simpleChatMessageIndex}
        />
      )
    default:
      return null
  }
}

const SimpleChatMessage = ({
  allowDelete,
  deleteSimpleChatMessage,
  index,
  isCropping,
  isFormLoading,
  onFocus,
  onSimpleChatMessageEdit,
  setIsCropping,
  setSimpleChatMessagePicture,
  simpleChatMessageIndex,
  simpleChatMessageObject,
}) => (
  <FormSection
    actions={
      allowDelete && (
        <Cancel
          disabled={isCropping || isFormLoading}
          index={simpleChatMessageIndex}
          onClick={deleteSimpleChatMessage}
        />
      )
    }
    backgroundColor="#fff"
    dragHandle
    ellipsize
    foldable
    hideBottom
    hideTop={index === 0}
    title={setSimpleChatMessageTitle(simpleChatMessageObject)}
  >
    <MessageField
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      onFocus={onFocus}
      onSimpleChatMessageEdit={onSimpleChatMessageEdit}
      setIsCropping={setIsCropping}
      setSimpleChatMessagePicture={setSimpleChatMessagePicture}
      simpleChatMessage={simpleChatMessageObject}
      simpleChatMessageIndex={simpleChatMessageIndex}
    />
  </FormSection>
)

export default compose(
  withState('simpleChatMessageObject', 'setSimpleChatMessageObject', {}),
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onChange']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  }),
  branch(({ simpleChatMessage }) => simpleChatMessage._destroy, renderNothing),
  withHandlers({
    onSimpleChatMessageEdit: ({
      onChange,
      simpleChatMessageIndex,
      setSimpleChatMessageObject,
    }) => simpleChatMessageObject => {
      setSimpleChatMessageObject(simpleChatMessageObject)
      onChange(simpleChatMessageObject, simpleChatMessageIndex)
    },
    deleteSimpleChatMessage: ({ simpleChatMessage, simpleChatMessageIndex, onChange }) => () => {
      onChange(
        {
          id: simpleChatMessage.id,
          _destroy: true,
        },
        simpleChatMessageIndex
      )
    },
  }),
  lifecycle({
    componentDidMount() {
      const { setSimpleChatMessageObject, simpleChatMessage } = this.props
      if (simpleChatMessage.type) return setSimpleChatMessageObject(simpleChatMessage)
      const simpleChatProductMessage = extractJson(simpleChatMessage.text)
      if (simpleChatProductMessage)
        return setSimpleChatMessageObject({
          id: simpleChatMessage.id,
          type: 'SimpleChatProductMessage',
          ...simpleChatProductMessage,
        })
      const videoData = extractYoutubeId(simpleChatMessage.text)
      if (videoData)
        return setSimpleChatMessageObject({
          id: simpleChatMessage.id,
          type: 'SimpleChatVideoMessage',
          videoUrl: simpleChatMessage.text,
        })
      setSimpleChatMessageObject({
        ...simpleChatMessage,
        type: 'SimpleChatTextMessage',
      })
    },
  })
)(SimpleChatMessage)
