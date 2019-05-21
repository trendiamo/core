import PictureMessageField from './picture-message-field'
import ProductMessageFields from './product-message-fields'
import React, { useCallback, useEffect, useState } from 'react'
import TextMessageFields from './text-message-fields'
import VideoMessageField from './video-message-field'
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
    case 'SimpleChatPictureMessage':
      return simpleChatMessage.id ? `Picture: ${simpleChatMessage.picUrl.split('/').pop()}` : 'New picture'
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
    case 'SimpleChatPictureMessage':
      return (
        <PictureMessageField
          isCropping={isCropping}
          name="simpleChatMessage_picture"
          onChange={onSimpleChatMessageEdit}
          setIsCropping={setIsCropping}
          setSimpleChatMessagePicture={setSimpleChatMessagePicture}
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
  index,
  isCropping,
  isFormLoading,
  onChange,
  onFocus,
  setIsCropping,
  setSimpleChatMessagePicture,
  simpleChatMessage,
  simpleChatMessageIndex,
}) => {
  const [simpleChatMessageObject, setSimpleChatMessageObject] = useState({})

  const onSimpleChatMessageEdit = useCallback(
    simpleChatMessageObject => {
      setSimpleChatMessageObject(simpleChatMessageObject)
      onChange(simpleChatMessageObject, simpleChatMessageIndex)
    },
    [onChange, simpleChatMessageIndex]
  )

  const deleteSimpleChatMessage = useCallback(
    () => {
      onChange(
        {
          id: simpleChatMessage.id,
          _destroy: true,
        },
        simpleChatMessageIndex
      )
    },
    [onChange, simpleChatMessage.id, simpleChatMessageIndex]
  )

  useEffect(
    () => {
      if (simpleChatMessage.type) return setSimpleChatMessageObject(simpleChatMessage)
      const simpleChatProductMessage = extractJson(simpleChatMessage.text)
      if (simpleChatProductMessage) {
        return setSimpleChatMessageObject({
          id: simpleChatMessage.id,
          type: 'SimpleChatProductMessage',
          ...simpleChatProductMessage,
        })
      }
      const videoData = extractYoutubeId(simpleChatMessage.text)
      if (videoData) {
        return setSimpleChatMessageObject({
          id: simpleChatMessage.id,
          type: 'SimpleChatVideoMessage',
          videoUrl: simpleChatMessage.text,
        })
      }
      setSimpleChatMessageObject({
        ...simpleChatMessage,
        type: 'SimpleChatTextMessage',
      })
    },
    [simpleChatMessage]
  )

  if (simpleChatMessage._destroy) return null

  return (
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
}

export default SimpleChatMessage
