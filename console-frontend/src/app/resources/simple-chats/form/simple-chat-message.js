import PictureMessageField from './picture-message-field'
import ProductMessageFields from './product-message-fields'
import React, { useCallback, useMemo } from 'react'
import TextMessageFields from './text-message-fields'
import VideoMessageField from './video-message-field'
import { Cancel, FormSection } from 'shared/form-elements'

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
  simpleChatMessage,
  simpleChatMessageIndex,
}) => {
  const onSimpleChatMessageEdit = useCallback(
    simpleChatMessage => {
      onChange(simpleChatMessage, simpleChatMessageIndex)
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

  const actions = useMemo(
    () =>
      allowDelete && (
        <Cancel
          disabled={isCropping || isFormLoading}
          index={simpleChatMessageIndex}
          onClick={deleteSimpleChatMessage}
        />
      ),
    [allowDelete, deleteSimpleChatMessage, isCropping, isFormLoading, simpleChatMessageIndex]
  )

  const hideTop = useMemo(() => index === 0, [index])

  const title = useMemo(() => setSimpleChatMessageTitle(simpleChatMessage), [simpleChatMessage])

  if (simpleChatMessage._destroy) return null

  return (
    <FormSection
      actions={actions}
      backgroundColor="#fff"
      dragHandle
      ellipsize
      foldable
      hideBottom
      hideTop={hideTop}
      title={title}
    >
      <MessageField
        isCropping={isCropping}
        isFormLoading={isFormLoading}
        onFocus={onFocus}
        onSimpleChatMessageEdit={onSimpleChatMessageEdit}
        setIsCropping={setIsCropping}
        simpleChatMessage={simpleChatMessage}
        simpleChatMessageIndex={simpleChatMessageIndex}
      />
    </FormSection>
  )
}

export default SimpleChatMessage
