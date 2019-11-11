import ImageMessageField from './image-message-field'
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
    case 'SimpleChatImageMessage':
      return simpleChatMessage.id ? `Image: ${simpleChatMessage.img.url.split('/').pop()}` : 'New image'
    default:
      return 'New message'
  }
}

const MessageField = ({
  isCropping,
  isFormLoading,
  isNextSameType,
  isPreviousSameType,
  isUploaderLoading,
  onFocus,
  onSimpleChatMessageEdit,
  setIsCropping,
  setIsUploaderLoading,
  simpleChatMessage,
  simpleChatMessageIndex,
  simpleChatSection,
}) => {
  const autoFocus = useMemo(() => simpleChatMessageIndex > 0 && !simpleChatMessage.id, [
    simpleChatMessage.id,
    simpleChatMessageIndex,
  ])

  switch (simpleChatMessage.type) {
    case 'SimpleChatTextMessage':
      return (
        <TextMessageFields
          autoFocus={autoFocus}
          disabled={isFormLoading || isUploaderLoading}
          name="simpleChatMessage_text"
          onChange={onSimpleChatMessageEdit}
          onFocus={onFocus}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={simpleChatMessageIndex}
          simpleChatSection={simpleChatSection}
        />
      )
    case 'SimpleChatProductMessage':
      return (
        <ProductMessageFields
          autoFocus={autoFocus}
          isCropping={isCropping}
          isFormLoading={isFormLoading}
          isNextSameType={isNextSameType}
          isPreviousSameType={isPreviousSameType}
          isUploaderLoading={isUploaderLoading}
          name="simpleChatMessage_product"
          onChange={onSimpleChatMessageEdit}
          onFocus={onFocus}
          setIsCropping={setIsCropping}
          setIsUploaderLoading={setIsUploaderLoading}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={simpleChatMessageIndex}
        />
      )
    case 'SimpleChatVideoMessage':
      return (
        <VideoMessageField
          autoFocus={autoFocus}
          disabled={isFormLoading || isUploaderLoading}
          name="simpleChatMessage_video"
          onChange={onSimpleChatMessageEdit}
          onFocus={onFocus}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={simpleChatMessageIndex}
        />
      )
    case 'SimpleChatImageMessage':
      return (
        <ImageMessageField
          isCropping={isCropping}
          isNextSameType={isNextSameType}
          isPreviousSameType={isPreviousSameType}
          isUploaderLoading={isUploaderLoading}
          name="simpleChatMessage_image"
          onChange={onSimpleChatMessageEdit}
          setIsCropping={setIsCropping}
          setIsUploaderLoading={setIsUploaderLoading}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={simpleChatMessageIndex}
        />
      )
    default:
      return null
  }
}

const SimpleChatMessage = ({
  activeSimpleChatMessages,
  allowDelete,
  isCropping,
  isFormLoading,
  isUploaderLoading,
  onChange,
  onFocus,
  setIsCropping,
  setIsUploaderLoading,
  simpleChatMessage,
  simpleChatMessageIndex,
  simpleChatSection,
}) => {
  const onSimpleChatMessageEdit = useCallback(
    simpleChatMessage => {
      onChange(simpleChatMessage, simpleChatMessageIndex)
    },
    [onChange, simpleChatMessageIndex]
  )

  const deleteSimpleChatMessage = useCallback(() => {
    onChange(
      {
        id: simpleChatMessage.id,
        _destroy: true,
      },
      simpleChatMessageIndex
    )
  }, [onChange, simpleChatMessage.id, simpleChatMessageIndex])

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
        isUploaderLoading={isUploaderLoading}
        onFocus={onFocus}
        onSimpleChatMessageEdit={onSimpleChatMessageEdit}
        setIsCropping={setIsCropping}
        setIsUploaderLoading={setIsUploaderLoading}
        simpleChatMessage={simpleChatMessage}
        simpleChatMessageIndex={simpleChatMessageIndex}
        simpleChatSection={simpleChatSection}
      />
    </FormSection>
  )
}

export default SimpleChatMessage
