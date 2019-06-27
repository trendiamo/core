import PictureMessageField from './picture-message-field'
import ProductMessageFields from './product-message-fields'
import React, { useCallback, useMemo } from 'react'
import TextMessageFields from './text-message-fields'
import VideoMessageField from './video-message-field'
import { Cancel, FormSection } from 'shared/form-elements'

const setSimpleChatMessageTitle = simpleChatMessage => {
  switch (simpleChatMessage.type) {
    case 'SimpleChatTextMessage':
      if (simpleChatMessage.id) {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = simpleChatMessage.html
        return `Message: ${wrapper.firstElementChild ? wrapper.firstElementChild.innerText : wrapper.innerText}`
      } else return 'New message'
    case 'SimpleChatProductMessage':
      return simpleChatMessage.id ? `Product: ${simpleChatMessage.title}` : 'New product'
    case 'SimpleChatVideoMessage':
      return simpleChatMessage.id ? `Video: ${simpleChatMessage.videoUrl}` : 'New video'
    case 'SimpleChatPictureMessage':
      return simpleChatMessage.id ? `Picture: ${simpleChatMessage.picture.url.split('/').pop()}` : 'New picture'
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
  isNextSameType,
  isPreviousSameType,
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
          isNextSameType={isNextSameType}
          isPreviousSameType={isPreviousSameType}
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
          isNextSameType={isNextSameType}
          isPreviousSameType={isPreviousSameType}
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
  isCropping,
  isFormLoading,
  onChange,
  onFocus,
  setIsCropping,
  simpleChatMessage,
  activeSimpleChatMessages,
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

  const hideTop = useMemo(() => simpleChatMessageIndex === 0, [simpleChatMessageIndex])

  const title = useMemo(() => setSimpleChatMessageTitle(simpleChatMessage), [simpleChatMessage])

  const filteredSimpleChatMessageIndex = useMemo(() => activeSimpleChatMessages.indexOf(simpleChatMessage), [
    activeSimpleChatMessages,
    simpleChatMessage,
  ])

  const isNextSameType = useMemo(
    () =>
      filteredSimpleChatMessageIndex + 1 < activeSimpleChatMessages.length &&
      simpleChatMessage.type ===
        (activeSimpleChatMessages[filteredSimpleChatMessageIndex + 1] &&
          activeSimpleChatMessages[filteredSimpleChatMessageIndex + 1].type),
    [filteredSimpleChatMessageIndex, activeSimpleChatMessages, simpleChatMessage.type]
  )

  const isPreviousSameType = useMemo(
    () =>
      0 <= filteredSimpleChatMessageIndex - 1 &&
      simpleChatMessage.type ===
        (activeSimpleChatMessages[filteredSimpleChatMessageIndex - 1] &&
          activeSimpleChatMessages[filteredSimpleChatMessageIndex - 1].type),
    [filteredSimpleChatMessageIndex, activeSimpleChatMessages, simpleChatMessage.type]
  )

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
        isNextSameType={isNextSameType}
        isPreviousSameType={isPreviousSameType}
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
