import isEqual from 'lodash.isequal'
import omit from 'lodash.omit'
import ProductMessageFields from './product-message-fields'
import React from 'react'
import TextMessageFields from './text-message-fields'
import VideoMessageField from './video-message-field'
import { branch, compose, lifecycle, renderNothing, shouldUpdate, withHandlers, withState } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { extractJson, extractYoutubeId } from 'plugin-base'
import { tryParseJSON } from 'utils/shared'

const whichTitle = (messageType, simpleChatMessage, simpleChatMessageTextObject) => {
  if (messageType === 'product') return simpleChatMessageTextObject.title
  return simpleChatMessage.text
}

const MessageField = ({
  messageType,
  isFormLoading,
  onSimpleChatMessageTextEdit,
  simpleChatMessage,
  simpleChatMessageIndex,
  onFocus,
  textObject,
}) => {
  switch (messageType) {
    case 'text':
      return (
        <TextMessageFields
          disabled={isFormLoading}
          name="simpleChatMessage_text"
          onChange={onSimpleChatMessageTextEdit}
          onFocus={onFocus}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={simpleChatMessageIndex}
        />
      )
    case 'video':
      return (
        <VideoMessageField
          isFormLoading={isFormLoading}
          name="simpleChatMessage_video"
          onChange={onSimpleChatMessageTextEdit}
          onFocus={onFocus}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={simpleChatMessageIndex}
          textObject={textObject}
        />
      )
    case 'product':
      return (
        <ProductMessageFields
          isFormLoading={isFormLoading}
          name="simpleChatMessage_product"
          onChange={onSimpleChatMessageTextEdit}
          onFocus={onFocus}
          simpleChatMessageIndex={simpleChatMessageIndex}
          textObject={textObject}
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
  isFormLoading,
  simpleChatMessage,
  simpleChatMessageIndex,
  messageType,
  onSimpleChatMessageTextEdit,
  simpleChatMessageTextObject,
  onFocus,
}) => (
  <FormSection
    actions={
      allowDelete && (
        <Cancel disabled={isFormLoading} index={simpleChatMessageIndex} onClick={deleteSimpleChatMessage} />
      )
    }
    backgroundColor="#fff"
    dragHandle
    ellipsize
    foldable
    hideBottom
    hideTop={index === 0}
    title={
      simpleChatMessage.id ? whichTitle(messageType, simpleChatMessage, simpleChatMessageTextObject) : 'New Message'
    }
  >
    <MessageField
      isFormLoading={isFormLoading}
      messageType={messageType}
      onFocus={onFocus}
      onSimpleChatMessageTextEdit={onSimpleChatMessageTextEdit}
      simpleChatMessage={simpleChatMessage}
      simpleChatMessageIndex={simpleChatMessageIndex}
      textObject={simpleChatMessageTextObject}
    />
  </FormSection>
)

export default compose(
  withState('messageType', 'setMessageType', null),
  withState('simpleChatMessageTextObject', 'setSimpleChatMessageTextObject', {}),
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onChange']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  }),
  branch(({ simpleChatMessage }) => simpleChatMessage._destroy, renderNothing),
  withHandlers({
    onSimpleChatMessageTextEdit: ({
      onChange,
      simpleChatMessage,
      simpleChatMessageIndex,
      setSimpleChatMessageTextObject,
    }) => simpleChatTextObject => {
      let newSimpleChatMessage = {
        ...simpleChatMessage,
        text: simpleChatTextObject.text || JSON.stringify(simpleChatTextObject),
      }
      setSimpleChatMessageTextObject(simpleChatTextObject)
      onChange(newSimpleChatMessage, simpleChatMessageIndex)
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
      const { simpleChatMessage, simpleChatMessageType, setMessageType, setSimpleChatMessageTextObject } = this.props
      const simpleChatText = tryParseJSON(simpleChatMessage.text)
      setSimpleChatMessageTextObject(typeof simpleChatText === 'object' ? simpleChatText : { text: simpleChatText })
      if (simpleChatMessageType) return setMessageType(simpleChatMessageType)
      const videoData = extractYoutubeId(simpleChatMessage.text)
      const productData = !videoData && extractJson(simpleChatMessage.text)
      setMessageType(videoData ? 'video' : productData ? 'product' : 'text')
    },
  })
)(SimpleChatMessage)
