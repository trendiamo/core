import auth from 'auth'
import CircularProgress from 'app/layout/loading'
import CroppingDialog from './cropping-dialog'
import EmptyDialog from './empty-dialog'
import GalleryDialog from './gallery-dialog'
import isEmpty from 'lodash.isempty'
import React, { useCallback, useEffect, useState } from 'react'
import UrlUploadDialog from './url-upload-dialog'
import { apiGetRemoteImage, apiImageList, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'
import 'react-aspect-ratio/aspect-ratio.css'

const ENTER_KEYCODE = 13

const ImagesModal = ({
  crop,
  croppingState,
  hasNewUpload,
  isLoading,
  onCancelClick,
  onCropChange,
  onGalleryDoneClick,
  onCropComplete,
  onCropDoneClick,
  onFileUpload,
  onModalClose,
  onImageLoaded,
  open,
  image,
  imagePreviewRef,
  previewImage,
  setHasNewUpload,
  setIsLoading,
  setOpen,
  type,
  isUserProfileImage,
}) => {
  const [activeImage, setActiveImage] = useState(null)
  const [emptyState, setEmptyState] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [images, setImages] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const [urlUploadState, setUrlUploadState] = useState(false)

  useEffect(() => {
    if (hasNewUpload) {
      setImages([])
      setEmptyState(false)
      setHasNewUpload(false)
      setUrlUploadState(false)
    }
  }, [hasNewUpload, setHasNewUpload])

  const { enqueueSnackbar } = useSnackbar()

  const fetchRemoteImage = useCallback(async () => {
    let splitUrl
    try {
      const url = new URL(imageUrl)
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw TypeError('Invalid protocol')
      }
      splitUrl = url.pathname.split('/')
    } catch (e) {
      return enqueueSnackbar('Please enter a valid URL', { variant: 'error' })
    }
    const filename = splitUrl[splitUrl.length - 1]
    const { json: blob, requestError, errors, response, ...rest } = await apiRequest(apiGetRemoteImage, [imageUrl])
    if (errors || requestError) {
      enqueueSnackbar(errors.message || requestError, { variant: 'error' })
    } else {
      onFileUpload([blob], [filename])
    }
    return { blob, response, errors, requestError, ...rest }
  }, [enqueueSnackbar, onFileUpload, imageUrl])

  const handleClose = useCallback(() => {
    setUrlUploadState(false)
    setOpen(false)
    onCropDoneClick()
  }, [onCropDoneClick, setOpen])

  const fetchImages = useCallback(async () => {
    if (isUserProfileImage) {
      const userImgUrl = auth.getUser().img.url
      if (userImgUrl && userImgUrl !== '') {
        setImages([{ id: 'user-img', url: activeImage || auth.getUser().img.url }])
        setActiveImage({ id: 'user-img', url: activeImage || auth.getUser().img.url })
      } else {
        setEmptyState(true)
        setImages([])
        setActiveImage(null)
      }
      return
    }
    const { json, response, errors, requestError, ...rest } = await apiRequest(apiImageList, '')
    if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
    if (requestError || errors) {
      setImages([])
      handleClose()
    } else {
      const animations = json.filter(image => image.url.split('.').pop() === 'gif')
      const images = json.filter(image => !animations.includes(image))
      if (type === 'animationsModal') {
        if (isEmpty(animations)) return setEmptyState(true)
        setImages(animations)
      } else {
        if (isEmpty(images)) return setEmptyState(true)
        setImages(images)
      }
      const activeImage = json.find(image => image.url === previewImage)
      if (activeImage) setActiveImage(activeImage)
    }
    return { json, response, errors, requestError, ...rest }
  }, [activeImage, enqueueSnackbar, handleClose, isUserProfileImage, previewImage, type])

  const onCancelCropping = useCallback(() => {
    onCancelClick()
    setUrlUploadState(false)
    setActiveImage(null)
  }, [onCancelClick])

  const onCancelUrlUpload = useCallback(() => {
    setUrlUploadState(false)
  }, [setUrlUploadState])

  const onDialogClose = useCallback(() => {
    onModalClose(activeImage ? activeImage.url : null)
  }, [activeImage, onModalClose])

  const onDoneCropping = useCallback(() => {
    onCropDoneClick()
    setUrlUploadState(false)
    setActiveImage(image)
  }, [image, onCropDoneClick])

  const newOnFileUpload = useCallback(
    ({ target: { files } }) => {
      onFileUpload(files)
    },
    [onFileUpload]
  )

  const onImageClick = useCallback(
    image => {
      setActiveImage(image)
    },
    [setActiveImage]
  )

  const onUrlUploadClick = useCallback(() => {
    setImageUrl('')
    setUrlUploadState(true)
  }, [setUrlUploadState])

  const onCropKeyup = useCallback(
    ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE) onDoneCropping()
    },
    [onDoneCropping]
  )

  const onDoneUrlUpload = useCallback(async () => {
    await fetchRemoteImage()
  }, [fetchRemoteImage])

  const onGalleryKeyup = useCallback(
    ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE && activeImage) onGalleryDoneClick(activeImage)
    },
    [activeImage, onGalleryDoneClick]
  )

  const onDialogEntering = useCallback(async () => {
    if (!emptyState && isEmpty(images)) {
      setIsLoading(true)
      await fetchImages()
      setIsLoading(false)
    } else {
      isUserProfileImage ? setActiveImage(images[0]) : setActiveImage(images.find(image => image.url === previewImage))
    }
  }, [emptyState, fetchImages, images, isUserProfileImage, previewImage, setIsLoading])

  const onUrlUploadKeyup = useCallback(
    ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE) onDoneUrlUpload()
    },
    [onDoneUrlUpload]
  )

  if (!open) return null

  if (isLoading) return <CircularProgress transparent />

  if (croppingState && image) {
    return (
      <CroppingDialog
        crop={crop}
        handleClose={onCancelCropping}
        image={image}
        imagePreviewRef={imagePreviewRef}
        onCancelCropping={onCancelCropping}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onDoneCropping={onDoneCropping}
        onImageLoaded={onImageLoaded}
        onKeyUp={onCropKeyup}
        open={open}
      />
    )
  }

  if (urlUploadState) {
    return (
      <UrlUploadDialog
        handleClose={handleClose}
        isImageLoading={isImageLoading}
        onCancelUrlUpload={onCancelUrlUpload}
        onDoneUrlUpload={onDoneUrlUpload}
        onFileUpload={newOnFileUpload}
        onKeyUp={onUrlUploadKeyup}
        open={open}
        setImageUrl={setImageUrl}
        type={type}
      />
    )
  }

  if (emptyState) {
    return (
      <EmptyDialog
        handleClose={handleClose}
        onFileUpload={newOnFileUpload}
        onUrlUploadClick={onUrlUploadClick}
        open={open}
        type={type}
      />
    )
  }

  return (
    <GalleryDialog
      activeImage={activeImage}
      handleClose={handleClose}
      images={images}
      isUserProfileImage={isUserProfileImage}
      onDialogClose={onDialogClose}
      onEntering={onDialogEntering}
      onFileUpload={newOnFileUpload}
      onGalleryDoneClick={onGalleryDoneClick}
      onImageClick={onImageClick}
      onKeyUp={onGalleryKeyup}
      onUrlUploadClick={onUrlUploadClick}
      open={open}
      setIsImageLoading={setIsImageLoading}
    />
  )
}

export default ImagesModal
