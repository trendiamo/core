import ImageUploader, { ProgressBar } from 'shared/image-uploader'
import React, { useCallback } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'

const ImageMessageForm = ({
  isCropping,
  isFormLoading,
  isNextSameType,
  isPreviousSameType,
  isUploaderLoading,
  progress,
  setIsCropping,
  setIsUploaderLoading,
  setImage,
  simpleChatMessage,
  onFormChange,
}) => (
  <>
    <ImageUploader
      aspectRatio={1}
      disabled={isCropping || isFormLoading || isUploaderLoading}
      label="Image"
      name="imgUrl"
      onChange={setImage}
      required
      setDisabled={setIsCropping}
      setIsUploaderLoading={setIsUploaderLoading}
      value={{ url: simpleChatMessage.img.url, imgRect: simpleChatMessage.imgRect }}
    />
    {progress && <ProgressBar progress={progress} />}
    <FormControlLabel
      control={
        <Checkbox
          checked={(isNextSameType || isPreviousSameType) && simpleChatMessage.groupWithAdjacent}
          color="primary"
          disabled={!(isNextSameType || isPreviousSameType)}
          name="groupWithAdjacent"
          onChange={onFormChange}
        />
      }
      disabled={isFormLoading}
      label="Group with neighbouring images"
    />
  </>
)

const ImageMessageField = ({
  isCropping,
  isNextSameType,
  isPreviousSameType,
  isUploaderLoading,
  onChange,
  setIsCropping,
  setIsUploaderLoading,
  simpleChatMessage,
  simpleChatMessageIndex,
}) => {
  const onFormChange = useCallback(
    event => {
      const isCheckbox = event.target.type === 'checkbox'
      const newSimpleChatMessage = {
        ...simpleChatMessage,
        [event.target.name]: isCheckbox ? event.target.checked : event.target.value,
      }
      onChange(newSimpleChatMessage, simpleChatMessageIndex)
    },
    [onChange, simpleChatMessageIndex, simpleChatMessage]
  )

  const setImg = useCallback(
    img => onChange({ ...simpleChatMessage, img: { url: img.url }, imgRect: img.imgRect }, simpleChatMessageIndex),
    [onChange, simpleChatMessage, simpleChatMessageIndex]
  )

  return (
    <ImageMessageForm
      isCropping={isCropping}
      isNextSameType={isNextSameType}
      isPreviousSameType={isPreviousSameType}
      isUploaderLoading={isUploaderLoading}
      onFormChange={onFormChange}
      setImage={setImg}
      setIsCropping={setIsCropping}
      setIsUploaderLoading={setIsUploaderLoading}
      simpleChatMessage={simpleChatMessage}
    />
  )
}

export default ImageMessageField
