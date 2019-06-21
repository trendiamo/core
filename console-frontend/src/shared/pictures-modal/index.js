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
  setOpen,
  setIsLoading,
  isLoading,
}) => {
  const [activePicture, setActivePicture] = useState(null)
  const [emptyState, setEmptyState] = useState(false)
  const [isPictureLoading, setIsPictureLoading] = useState(false)
  const [pictures, setPictures] = useState([])
  const [pictureUrl, setPictureUrl] = useState('')
  const [urlUploadState, setUrlUploadState] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const fetchRemotePicture = useCallback(
    async () => {
      if (isEmpty(pictureUrl.trim())) return enqueueSnackbar('Please enter an URL', { variant: 'error' })
      const splitUrl = new URL(pictureUrl).pathname.split('/')
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
      } else if (isEmpty(json)) {
        setEmptyState(true)
      } else {
        setPictures(json)
        const activePicture = json.find(picture => picture.url === previewPicture)
        if (activePicture) setActivePicture(activePicture)
      }
      return { json, response, errors, requestError, ...rest }
    },
    [enqueueSnackbar, handleClose, previewPicture, setActivePicture, setEmptyState, setPictures]
  )

  const onCancelCropping = useCallback(
    async () => {
      setPictures([])
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
      setPictures([])
      onCropDoneClick()
      setUrlUploadState(false)
    },
    [onCropDoneClick, setUrlUploadState]
  )

  const newOnFileUpload = useCallback(
    ({ target: { files } }) => {
      if (urlUploadState) setUrlUploadState(false)
      onFileUpload(files)
    },
    [onFileUpload, urlUploadState]
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
      if (keyCode === ENTER_KEYCODE) onDialogClose()
    },
    [onDialogClose]
  )

  const onDialogEntering = useCallback(
    async () => {
      if (!emptyState && isEmpty(pictures)) {
        setIsLoading(true)
        await fetchPictures()
        setIsLoading(false)
      }
    },
    [emptyState, fetchPictures, pictures, setIsLoading]
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
    />
  )
}

export default PicturesModal
