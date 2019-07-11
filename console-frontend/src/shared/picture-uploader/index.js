import BasePictureUploader from './base'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import S3Upload from 'ext/react-s3-uploader'
import styled from 'styled-components'
import { apiGetSignedUrlFactory } from 'utils'
import { apiPictureCreate, apiRequest } from 'utils'
import { getPixelCrop } from 'react-image-crop'
import { LinearProgress } from '@material-ui/core'
import { useSnackbar } from 'notistack'
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

const defaultCrop = (picture, aspectRatio) => {
  const pictureAspect = picture.width / picture.height
  let height, width
  if (pictureAspect < 1) {
    width = 100
    height = width * pictureAspect
  } else {
    height = 100
    width = height / pictureAspect
  }
  const defaultRect = {
    height,
    width,
    x: 0,
    y: 0,
  }
  return aspectRatio ? { ...defaultRect, aspect: aspectRatio } : defaultRect
}

const processFilename = (blob, filename) => {
  if (filename.endsWith('.jpeg') || filename.endsWith('.jpg') || filename.endsWith('.png')) return filename
  const extension = blob.type === 'image/jpeg' ? '.jpg' : '.png'
  return `picture${extension}`
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

const PictureUploader = ({ aspectRatio, disabled, label, onChange, required, setDisabled, circle, value }) => {
  const picturePreviewRef = useRef()
  const [crop, setCrop] = useState({})
  const [rect, setRect] = useState(null)
  const [progress, setProgress] = useState(null)
  const [doneCropping, setDoneCropping] = useState(true)
  const [picture, setPicture] = useState(null)
  const [previousValue, setPreviousValue] = useState(value)
  const [modalOpen, setModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const previewPicture = useMemo(() => (value && value.url ? value.url : picture ? picture : ''), [picture, value])

  useEffect(
    () => {
      setIsLoading(progress || (!doneCropping && !picture))
    },
    [doneCropping, picture, progress, setIsLoading]
  )

  const onCancelClick = useCallback(
    () => {
      setDoneCropping(true)
      onChange(previousValue)
      setPicture(null)
      setModalOpen(false)
      setCrop({})
      URL.revokeObjectURL(picture.preview)
    },
    [onChange, picture, previousValue]
  )

  const onDropzoneClick = useCallback(() => {
    setModalOpen(true)
  }, [])

  const onCropChange = useCallback(crop => {
    setCrop(crop)
  }, [])

  const onCropComplete = useCallback(
    async (_crop, pixelCrop) => {
      if (pixelCrop.height === 0 || pixelCrop.width === 0) {
        const crop = defaultCrop(picturePreviewRef.current, aspectRatio)
        setCrop(crop)
        pixelCrop = getPixelCrop(picturePreviewRef.current, crop)
      }
      setRect(pixelCrop)
      onChange({ ...value, picRect: pixelCrop })
    },
    [aspectRatio, onChange, value]
  )

  const onCropDoneClick = useCallback(
    async () => {
      setDoneCropping(true)
      setModalOpen(false)
      setCrop({})
      if (!picture) return
      onChange({ url: picture, picRect: rect })
    },
    [onChange, picture, rect]
  )

  const onGalleryDoneClick = useCallback(
    picture => {
      setPreviousValue(value)
      onChange({ url: picture && picture.url, picRect: rect })
      setPicture(picture && picture.url)
      setModalOpen(true)
      setDoneCropping(false)
    },
    [onChange, rect, value]
  )

  const { enqueueSnackbar } = useSnackbar()

  const onFileUpload = useCallback(
    async (files, filenames) => {
      if (files.length === 0 || !files[0].type.includes('image')) {
        enqueueSnackbar('Wrong file format', { variant: 'error' })
        return setIsLoading(false)
      }
      setDoneCropping(false)
      setPreviousValue(value)
      onChange({ url: '', picRect: null })
      const file = files[0]
      if (!file.name) file.name = processFilename(file, filenames[0])
      const pictureUrl = await uploadPicture({
        blob: file,
        setProgress,
      })
      const { errors, requestError } = await apiRequest(apiPictureCreate, [{ url: pictureUrl }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        onChange({ url: pictureUrl, picRect: null })
        setPicture(pictureUrl)
        setModalOpen(true)
      } else {
        setIsLoading(false)
      }
    },
    [value, onChange, enqueueSnackbar]
  )

  const onModalClose = useCallback(() => {
    setModalOpen(false)
  }, [])

  const onPictureLoaded = useCallback(
    async pictureElement => {
      const crop = defaultCrop(pictureElement, aspectRatio)
      setCrop(crop)
      const pixelCrop = getPixelCrop(pictureElement, crop)
      onChange({ ...value, picRect: pixelCrop })
      setRect(pixelCrop)
    },
    [aspectRatio, onChange, value]
  )

  const onRemovePicture = useCallback(
    () => {
      setPicture(null)
      onChange({ url: '', picRect: null })
    },
    [onChange]
  )

  useEffect(
    () => {
      if (setDisabled) setDisabled(!doneCropping)
    },
    [doneCropping, setDisabled]
  )

  return (
    <BasePictureUploader
      circle={circle}
      crop={crop}
      disabled={disabled}
      doneCropping={doneCropping}
      isLoading={isLoading}
      label={label}
      modalOpen={modalOpen}
      onCancelClick={onCancelClick}
      onCropChange={onCropChange}
      onCropComplete={onCropComplete}
      onCropDoneClick={onCropDoneClick}
      onDropzoneClick={onDropzoneClick}
      onFileUpload={onFileUpload}
      onGalleryDoneClick={onGalleryDoneClick}
      onModalClose={onModalClose}
      onPictureLoaded={onPictureLoaded}
      onRemovePicture={onRemovePicture}
      picture={picture}
      picturePreviewRef={picturePreviewRef}
      previewPicture={previewPicture}
      progress={progress}
      required={required}
      setIsLoading={setIsLoading}
      setModalOpen={setModalOpen}
      value={value}
    />
  )
}

export { uploadPicture, ProgressBar }
export default PictureUploader
