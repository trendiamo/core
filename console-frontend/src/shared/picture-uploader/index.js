import BasePictureUploader from './base'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import S3Upload from 'ext/react-s3-uploader'
import styled from 'styled-components'
import { apiGetSignedUrlFactory } from 'utils'
import { getPixelCrop } from 'react-image-crop'
import { LinearProgress } from '@material-ui/core'
import 'react-image-crop/dist/ReactCrop.css'

const StyledLinearProgress = styled(LinearProgress)`
  margin-bottom: 1rem;
`

const StatusMessage = styled.div`
  font-size: 14px;
  letter-spacing: 0.3px;
  color: rgba(0, 0, 0, 0.87);
  line-height: 2.4;
`

const ProgressBar = ({ progress }) => (
  <div style={{ marginTop: '2rem' }}>
    <StatusMessage>{`${progress.message}...`}</StatusMessage>
    <StyledLinearProgress value={progress.progress} variant="determinate" />
  </div>
)

const defaultCrop = picture => {
  const pictureAspect = picture.width / picture.height
  let height, width
  if (pictureAspect < 1) {
    width = 100
    height = width * pictureAspect
  } else {
    height = 100
    width = height / pictureAspect
  }
  return {
    aspect: 1,
    height,
    width,
    x: 0,
    y: 0,
  }
}

const previewCrop = async (picture, pictureElement, pixelCrop) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(
    pictureElement,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  return canvas.toDataURL(picture.type)
}

const resultingCrop = (picture, pictureElement, pixelCrop) => {
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(
    pictureElement,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )
  return new Promise(resolve => canvas.toBlob(resolve, picture.type))
}

const uploadPicture = async ({ blob, setProgress }) => {
  try {
    const { fileUrl } = await S3Upload({
      contentDisposition: 'auto',
      files: [blob],
      getSignedUrl: apiGetSignedUrlFactory(),
      onProgress: (progress, message) => setProgress({ message, progress }),
      preprocess: (file, next) => next(file),
      uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
    })
    setProgress(null)
    return fileUrl
  } catch (error) {
    console.error(error)
    alert('Error uploading file, please try again or contact us')
    window.location.reload()
  }
}

const PictureUploader = ({ disabled, label, onChange, required, setDisabled, setPic, square, value }) => {
  const picturePreviewRef = useRef()
  const [crop, setCrop] = useState({})
  const [croppedPicture, setCroppedPicture] = useState(null)
  const [doneCropping, setDoneCropping] = useState(true)
  const [picture, setPicture] = useState(null)
  const [previousValue, setPreviousValue] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const previewPicture = useMemo(
    () => (value ? value : croppedPicture ? croppedPicture : picture ? picture.preview : ''),
    [croppedPicture, picture, value]
  )
  const onCancelClick = useCallback(
    () => {
      setDoneCropping(true)
      onChange(previousValue)
      setPicture(null)
      setCroppedPicture(null)
      setModalOpen(false)
      URL.revokeObjectURL(picture.preview)
    },
    [onChange, picture, previousValue]
  )

  const onClick = useCallback(() => {
    setModalOpen(true)
  }, [])

  const onCropChange = useCallback(crop => {
    setCrop(crop)
  }, [])

  const onCropComplete = useCallback(
    async (_crop, pixelCrop) => {
      if (pixelCrop.height === 0 || pixelCrop.width === 0) {
        const crop = defaultCrop(picturePreviewRef.current)
        setCrop(crop)
        pixelCrop = getPixelCrop(picturePreviewRef.current, crop)
      }
      const previewUrl = await previewCrop(picture, picturePreviewRef.current, pixelCrop)
      setCroppedPicture(previewUrl)
      onChange(previewUrl)
    },
    [onChange, picture]
  )

  const onDoneClick = useCallback(
    async () => {
      setDoneCropping(true)
      setModalOpen(false)
      const blob = await resultingCrop(
        picture,
        picturePreviewRef.current,
        getPixelCrop(picturePreviewRef.current, crop)
      )
      blob.name = picture.name
      setPic(blob)
      URL.revokeObjectURL(picture.preview)
    },
    [crop, picture, setPic]
  )

  const onFileUpload = useCallback(
    files => {
      setDoneCropping(false)
      onChange('')
      setPreviousValue(value)
      if (files.length === 0) return
      const file = files[0]
      setPicture({
        name: file.name || 'upload',
        preview: URL.createObjectURL(file),
        size: file.size,
        type: file.type,
      })
      setModalOpen(true)
    },
    [onChange, value]
  )

  const onModalClose = useCallback(
    pictureUrl => {
      setModalOpen(false)
      onChange(pictureUrl)
    },
    [onChange]
  )

  const onPictureLoaded = useCallback(
    async pictureElement => {
      const crop = defaultCrop(pictureElement)
      setCrop(crop)
      const pixelCrop = getPixelCrop(pictureElement, crop)
      const previewUrl = await previewCrop(picture, picturePreviewRef.current, pixelCrop)
      setCroppedPicture(previewUrl)
      onChange(previewUrl)
    },
    [onChange, picture]
  )

  const onRemovePicture = useCallback(
    () => {
      onChange('')
      setPicture(null)
      setPic(null)
      setCroppedPicture(null)
    },
    [onChange, setPic]
  )

  useEffect(
    () => {
      if (setDisabled) setDisabled(!doneCropping)
    },
    [doneCropping, setDisabled]
  )

  useEffect(
    () => {
      return () => {
        picture && URL.revokeObjectURL(picture.preview)
      }
    },
    [picture]
  )

  return (
    <BasePictureUploader
      crop={crop}
      disabled={disabled}
      doneCropping={doneCropping}
      label={label}
      modalOpen={modalOpen}
      onCancelClick={onCancelClick}
      onClick={onClick}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onDoneClick={onDoneClick}
      onFileUpload={onFileUpload}
      onModalClose={onModalClose}
      onPictureLoaded={onPictureLoaded}
      onRemovePicture={onRemovePicture}
      picture={picture}
      picturePreviewRef={picturePreviewRef}
      previewPicture={previewPicture}
      required={required}
      setModalOpen={setModalOpen}
      square={square}
    />
  )
}

export { uploadPicture, ProgressBar }
export default PictureUploader
