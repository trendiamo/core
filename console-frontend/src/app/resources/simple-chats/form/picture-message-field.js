import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React, { useCallback, useState } from 'react'

const PictureMessageForm = ({ isCropping, progress, setIsCropping, setPicture, setPictureUrl, simpleChatMessage }) => (
  <>
    <PictureUploader
      disabled={isCropping}
      label="Picture"
      name="picUrl"
      onChange={setPictureUrl}
      required
      setDisabled={setIsCropping}
      setPic={setPicture}
      square
      value={simpleChatMessage.picUrl || ''}
    />
    {progress && <ProgressBar progress={progress} />}
  </>
)

const PictureMessageField = ({
  onChange,
  setIsCropping,
  setSimpleChatMessagePicture,
  simpleChatMessage,
  simpleChatMessageIndex,
}) => {
  const [progress, setProgress] = useState(null)

  const setPicture = useCallback(
    blob => {
      setSimpleChatMessagePicture(simpleChatMessageIndex, blob, setProgress)
    },
    [setSimpleChatMessagePicture, simpleChatMessageIndex]
  )

  const setPictureUrl = useCallback(picUrl => onChange({ ...simpleChatMessage, picUrl }, simpleChatMessageIndex), [
    onChange,
    simpleChatMessage,
    simpleChatMessageIndex,
  ])

  return (
    <PictureMessageForm
      progress={progress}
      setIsCropping={setIsCropping}
      setPicture={setPicture}
      setPictureUrl={setPictureUrl}
      simpleChatMessage={simpleChatMessage}
    />
  )
}

export default PictureMessageField
