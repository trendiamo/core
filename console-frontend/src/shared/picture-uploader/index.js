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
  if (filename.match(/.+\.(gif|jpg|jpeg|png)$/)) return filename
  const extension = blob.type === 'image/gif' ? 'gif' : blob.type === 'image/jpeg' ? 'jpg' : 'png'
  return `picture.${extension}`
}

const uploadPicture = async ({ blob, setHasNewUpload, setProgress }) => {
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
    setHasNewUpload(true)
    return fileUrl
  } catch (error) {
    console.error(error)
    alert('Error uploading file, please try again or contact us')
    window.location.reload()
  }
}

const PictureUploader = ({
  aspectRatio,
  circle,
  disabled,
  label,
  onChange,
  required,
  setDisabled,
  setIsUploaderLoading,
  type,
  value,
}) => {
  const picturePreviewRef = useRef()
  const [crop, setCrop] = useState({})
  const [doneCropping, setDoneCropping] = useState(true)
  const [hasNewUpload, setHasNewUpload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPictureLoading, setIsPictureLoading] = useState(!!value.url)
  const [modalOpen, setModalOpen] = useState(false)
  const [picture, setPicture] = useState(null)
  const [previousValue, setPreviousValue] = useState(value)
  const [progress, setProgress] = useState(null)
  const [rect, setRect] = useState(null)
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
      setPicture(picture && picture.url)
      picture.url !== value.url && setIsPictureLoading(true)
      if (type === 'animationUploader') {
        onChange({ url: picture && picture.url, picRect: {} })
        setModalOpen(false)
      } else {
        onChange({ url: picture && picture.url, picRect: rect })
        setDoneCropping(false)
        setModalOpen(true)
      }
    },
    [onChange, rect, type, value]
  )

  const { enqueueSnackbar } = useSnackbar()

  const onFileUpload = useCallback(
    async (files, filenames) => {
      if (files.length === 0 || !files[0].type.includes('image')) {
        enqueueSnackbar('Wrong file format', { variant: 'error' })
        return setIsLoading(false)
      }
      setPreviousValue(value)
      if (files.length === 0) return
      const file = files[0]
      if (type === 'animationUploader') {
        if (file.type !== 'image/gif') return enqueueSnackbar('Must be an animated picture', { variant: 'error' })
        setModalOpen(false)
      } else {
        if (file.type === 'image/gif')
          return enqueueSnackbar("You can't use an animated picture here", { variant: 'error' })
        setPicture(null)
        setDoneCropping(false)
      }
      setIsPictureLoading(true)
      if (!file.name) file.name = processFilename(file, filenames[0])
      const pictureUrl = await uploadPicture({
        blob: file,
        setHasNewUpload,
        setProgress,
      })
      const { errors, requestError } = await apiRequest(apiPictureCreate, [{ url: pictureUrl, file_type: file.type }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        onChange({ url: pictureUrl, picRect: {} })
        setPicture(pictureUrl)
        type !== 'animationUploader' && setModalOpen(true)
      } else {
        setIsLoading(false)
        setIsPictureLoading(false)
      }
    },
    [enqueueSnackbar, onChange, type, value]
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
      onChange({ url: '', picRect: {} })
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
      disabled={disabled || isPictureLoading}
      doneCropping={doneCropping}
      hasNewUpload={hasNewUpload}
      isLoading={isLoading}
      isPictureLoading={isPictureLoading}
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
      setHasNewUpload={setHasNewUpload}
      setIsLoading={setIsLoading}
      setIsPictureLoading={setIsPictureLoading}
      setIsUploaderLoading={setIsUploaderLoading}
      setModalOpen={setModalOpen}
      type={type}
      value={value}
    />
  )
}

export { uploadPicture, ProgressBar }
export default PictureUploader
