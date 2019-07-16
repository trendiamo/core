import CircularProgress from 'app/layout/loading'
import CroppingDialog from './cropping-dialog'
import EmptyDialog from './empty-dialog'
import GalleryDialog from './gallery-dialog'
import isEmpty from 'lodash.isempty'
import React, { useCallback, useEffect, useState } from 'react'
import UrlUploadDialog from './url-upload-dialog'
import { apiGetRemotePicture, apiPictureList, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'
import 'react-aspect-ratio/aspect-ratio.css'

const ENTER_KEYCODE = 13

const PicturesModal = ({
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
  onPictureLoaded,
  open,
  picture,
  picturePreviewRef,
  previewPicture,
  setHasNewUpload,
  setIsLoading,
  setOpen,
  type,
}) => {
  const [activePicture, setActivePicture] = useState(null)
  const [emptyState, setEmptyState] = useState(false)
  const [isPictureLoading, setIsPictureLoading] = useState(false)
  const [pictures, setPictures] = useState([])
  const [pictureUrl, setPictureUrl] = useState('')
  const [urlUploadState, setUrlUploadState] = useState(false)

  useEffect(
    () => {
      if (hasNewUpload) {
        setPictures([])
        setEmptyState(false)
        setHasNewUpload(false)
        setUrlUploadState(false)
      }
    },
    [hasNewUpload, setHasNewUpload]
  )

  const { enqueueSnackbar } = useSnackbar()

  const fetchRemotePicture = useCallback(
    async () => {
      let splitUrl
      try {
        const url = new URL(pictureUrl)
        if (!['http:', 'https:'].includes(url.protocol)) {
          throw TypeError('Invalid protocol')
        }
        splitUrl = url.pathname.split('/')
      } catch (e) {
        return enqueueSnackbar('Please enter a valid URL', { variant: 'error' })
      }
      const filename = splitUrl[splitUrl.length - 1]
      const { json: blob, requestError, errors, response, ...rest } = await apiRequest(apiGetRemotePicture, [
        pictureUrl,
      ])
      if (errors || requestError) {
        enqueueSnackbar(errors.message || requestError, { variant: 'error' })
      } else {
        onFileUpload([blob], [filename])
      }
      return { blob, response, errors, requestError, ...rest }
    },
    [enqueueSnackbar, onFileUpload, pictureUrl]
  )

  const handleClose = useCallback(
    () => {
      setUrlUploadState(false)
      setOpen(false)
      onCropDoneClick()
    },
    [onCropDoneClick, setOpen]
  )

  const fetchPictures = useCallback(
    async () => {
      const { json, response, errors, requestError, ...rest } = await apiRequest(apiPictureList, '')
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (requestError || errors) {
        setPictures([])
        handleClose()
      } else {
        const animations = json.filter(picture => picture.url.split('.').pop() === 'gif')
        const pictures = json.filter(picture => !animations.includes(picture))
        if (type === 'animationsModal') {
          if (isEmpty(animations)) return setEmptyState(true)
          setPictures(animations)
        } else {
          if (isEmpty(pictures)) return setEmptyState(true)
          setPictures(pictures)
        }
        const activePicture = json.find(picture => picture.url === previewPicture)
        if (activePicture) setActivePicture(activePicture)
      }
      return { json, response, errors, requestError, ...rest }
    },
    [enqueueSnackbar, handleClose, previewPicture, setActivePicture, setEmptyState, setPictures, type]
  )

  const onCancelCropping = useCallback(
    () => {
      onCancelClick()
      setUrlUploadState(false)
      setActivePicture(null)
    },
    [onCancelClick]
  )

  const onCancelUrlUpload = useCallback(
    () => {
      setUrlUploadState(false)
    },
    [setUrlUploadState]
  )

  const onDialogClose = useCallback(
    () => {
      onModalClose(activePicture ? activePicture.url : null)
    },
    [activePicture, onModalClose]
  )

  const onDoneCropping = useCallback(
    () => {
      onCropDoneClick()
      setUrlUploadState(false)
    },
    [onCropDoneClick, setUrlUploadState]
  )

  const newOnFileUpload = useCallback(
    ({ target: { files } }) => {
      onFileUpload(files)
    },
    [onFileUpload]
  )

  const onPictureClick = useCallback(
    picture => {
      setActivePicture(picture)
    },
    [setActivePicture]
  )

  const onUrlUploadClick = useCallback(
    () => {
      setPictureUrl('')
      setUrlUploadState(true)
    },
    [setUrlUploadState]
  )

  const onCropKeyup = useCallback(
    ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE) onDoneCropping()
    },
    [onDoneCropping]
  )

  const onDoneUrlUpload = useCallback(
    async () => {
      await fetchRemotePicture()
    },
    [fetchRemotePicture]
  )

  const onGalleryKeyup = useCallback(
    ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE && activePicture) onGalleryDoneClick(activePicture)
    },
    [activePicture, onGalleryDoneClick]
  )

  const onDialogEntering = useCallback(
    async () => {
      if (!emptyState && isEmpty(pictures)) {
        setIsLoading(true)
        await fetchPictures()
        setIsLoading(false)
      } else {
        setActivePicture(pictures.find(picture => picture.url === previewPicture))
      }
    },
    [emptyState, fetchPictures, pictures, previewPicture, setIsLoading]
  )

  const onUrlUploadKeyup = useCallback(
    ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE) onDoneUrlUpload()
    },
    [onDoneUrlUpload]
  )

  if (!open) return null

  if (isLoading) return <CircularProgress transparent />

  if (croppingState && picture) {
    return (
      <CroppingDialog
        crop={crop}
        handleClose={onCancelCropping}
        onCancelCropping={onCancelCropping}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onDoneCropping={onDoneCropping}
        onKeyUp={onCropKeyup}
        onPictureLoaded={onPictureLoaded}
        open={open}
        picture={picture}
        picturePreviewRef={picturePreviewRef}
      />
    )
  }

  if (urlUploadState) {
    return (
      <UrlUploadDialog
        handleClose={handleClose}
        isPictureLoading={isPictureLoading}
        onCancelUrlUpload={onCancelUrlUpload}
        onDoneUrlUpload={onDoneUrlUpload}
        onFileUpload={newOnFileUpload}
        onKeyUp={onUrlUploadKeyup}
        open={open}
        setPictureUrl={setPictureUrl}
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
      activePicture={activePicture}
      handleClose={handleClose}
      onDialogClose={onDialogClose}
      onEntering={onDialogEntering}
      onFileUpload={newOnFileUpload}
      onGalleryDoneClick={onGalleryDoneClick}
      onKeyUp={onGalleryKeyup}
      onPictureClick={onPictureClick}
      onUrlUploadClick={onUrlUploadClick}
      open={open}
      pictures={pictures}
      setIsPictureLoading={setIsPictureLoading}
      type={type}
    />
  )
}

export default PicturesModal
