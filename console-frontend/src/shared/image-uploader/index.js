import BaseImageUploader from './base'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import S3Upload from 'ext/react-s3-uploader'
import styled from 'styled-components'
import { apiGetSignedUrlFactory } from 'utils'
import { apiImageCreate, apiRequest } from 'utils'
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

const defaultCrop = (image, aspectRatio) => {
  const imageAspect = image.width / image.height
  let height, width
  if (imageAspect < 1) {
    width = 100
    height = width * imageAspect
  } else {
    height = 100
    width = height / imageAspect
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
  return `image.${extension}`
}

const uploadImage = async ({ blob, setHasNewUpload, setProgress }) => {
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

const ImageUploader = ({
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
  const imagePreviewRef = useRef()
  const [crop, setCrop] = useState({})
  const [doneCropping, setDoneCropping] = useState(true)
  const [hasNewUpload, setHasNewUpload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(!!value.url)
  const [modalOpen, setModalOpen] = useState(false)
  const [image, setImage] = useState(null)
  const [previousValue, setPreviousValue] = useState(value)
  const [progress, setProgress] = useState(null)
  const [rect, setRect] = useState(null)
  const previewImage = useMemo(() => (value && value.url ? value.url : image ? image : ''), [image, value])

  useEffect(
    () => {
      setIsLoading(progress || (!doneCropping && !image))
    },
    [doneCropping, image, progress, setIsLoading]
  )

  const onCancelClick = useCallback(
    () => {
      setDoneCropping(true)
      onChange(previousValue)
      setImage(null)
      setModalOpen(false)
      setCrop({})
      URL.revokeObjectURL(image.preview)
    },
    [onChange, image, previousValue]
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
        const crop = defaultCrop(imagePreviewRef.current, aspectRatio)
        setCrop(crop)
        pixelCrop = getPixelCrop(imagePreviewRef.current, crop)
      }
      setRect(pixelCrop)
      onChange({ ...value, imgRect: pixelCrop })
    },
    [aspectRatio, onChange, value]
  )

  const onCropDoneClick = useCallback(
    async () => {
      setDoneCropping(true)
      setModalOpen(false)
      setCrop({})
      if (!image) return
      onChange({ url: image, imgRect: rect })
    },
    [onChange, image, rect]
  )

  const onGalleryDoneClick = useCallback(
    image => {
      setPreviousValue(value)
      setImage(image && image.url)
      image.url !== value.url && setIsImageLoading(true)
      if (type === 'animationUploader') {
        onChange({ url: image && image.url, imgRect: {} })
        setModalOpen(false)
      } else {
        onChange({ url: image && image.url, imgRect: rect })
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
        if (file.type !== 'image/gif') return enqueueSnackbar('Must be an animated image', { variant: 'error' })
        setModalOpen(false)
      } else {
        if (file.type === 'image/gif')
          return enqueueSnackbar("You can't use an animated image here", { variant: 'error' })
        setImage(null)
        setDoneCropping(false)
      }
      setIsImageLoading(true)
      if (!file.name) file.name = processFilename(file, filenames[0])
      const imageUrl = await uploadImage({
        blob: file,
        setHasNewUpload,
        setProgress,
      })
      const { errors, requestError } = await apiRequest(apiImageCreate, [{ url: imageUrl, file_type: file.type }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        onChange({ url: imageUrl, imgRect: {} })
        setImage(imageUrl)
        type !== 'animationUploader' && setModalOpen(true)
      } else {
        setIsLoading(false)
        setIsImageLoading(false)
      }
    },
    [enqueueSnackbar, onChange, type, value]
  )

  const onModalClose = useCallback(() => {
    setModalOpen(false)
  }, [])

  const onImageLoaded = useCallback(
    async imageElement => {
      const crop = defaultCrop(imageElement, aspectRatio)
      setCrop(crop)
      const pixelCrop = getPixelCrop(imageElement, crop)
      onChange({ ...value, imgRect: pixelCrop })
      setRect(pixelCrop)
    },
    [aspectRatio, onChange, value]
  )

  const onRemoveImage = useCallback(
    () => {
      setImage(null)
      onChange({ url: '', imgRect: {} })
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
    <BaseImageUploader
      circle={circle}
      crop={crop}
      disabled={disabled || isImageLoading}
      doneCropping={doneCropping}
      hasNewUpload={hasNewUpload}
      image={image}
      imagePreviewRef={imagePreviewRef}
      isImageLoading={isImageLoading}
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
      onImageLoaded={onImageLoaded}
      onModalClose={onModalClose}
      onRemoveImage={onRemoveImage}
      previewImage={previewImage}
      progress={progress}
      required={required}
      setHasNewUpload={setHasNewUpload}
      setIsImageLoading={setIsImageLoading}
      setIsLoading={setIsLoading}
      setIsUploaderLoading={setIsUploaderLoading}
      setModalOpen={setModalOpen}
      type={type}
      value={value}
    />
  )
}

export { uploadImage, ProgressBar }
export default ImageUploader
