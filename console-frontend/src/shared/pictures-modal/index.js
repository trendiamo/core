import CircularProgress from 'app/layout/loading'
import CroppingDialog from './cropping-dialog'
import EmptyDialog from './empty-dialog'
import GalleryDialog from './gallery-dialog'
import isEmpty from 'lodash.isempty'
import React, { useCallback, useState } from 'react'
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
  onCropComplete,
  onDoneClick,
  onFileUpload,
  onModalClose,
  onPictureLoaded,
  open,
  picturePreview,
  picturePreviewRef,
  previewPicture,
  setOpen,
}) => {
  const [activePicture, setActivePicture] = useState(null)
  const [emptyState, setEmptyState] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPictureLoading, setIsPictureLoading] = useState(false)
  const [pictures, setPictures] = useState([])
  const [pictureUrl, setPictureUrl] = useState('')
  const [urlUploadState, setUrlUploadState] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const fetchRemotePicture = useCallback(
    async () => {
      if (isEmpty(pictureUrl.trim())) return enqueueSnackbar('Please enter an URL', { variant: 'error' })
      try {
        decodeURIComponent(pictureUrl)
      } catch {
        return enqueueSnackbar("Can't find any file at this URL", { variant: 'error' })
      }
      const { json: blob, requestError, errors, response, ...rest } = await apiRequest(apiGetRemotePicture, [
        pictureUrl,
      ])
      if (errors || requestError) {
        enqueueSnackbar(errors.message || requestError, { variant: 'error' })
      } else {
        onFileUpload([blob])
      }
      return { blob, response, errors, requestError, ...rest }
    },
    [enqueueSnackbar, onFileUpload, pictureUrl]
  )

  const handleClose = useCallback(
    () => {
      setUrlUploadState(false)
      setOpen(false)
    },
    [setOpen, setUrlUploadState]
  )

  const onCancelCropping = useCallback(
    () => {
      onCancelClick()
      setUrlUploadState(false)
      setActivePicture(null)
    },
    [onCancelClick, setActivePicture, setUrlUploadState]
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
      onDoneClick()
      setUrlUploadState(false)
      setActivePicture(null)
    },
    [onDoneClick, setActivePicture, setUrlUploadState]
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
    [setPictureUrl, setUrlUploadState]
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

  const onCropKeyup = useCallback(
    ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE) onDoneCropping()
    },
    [onDoneCropping]
  )

  const onDoneUrlUpload = useCallback(
    async () => {
      setIsPictureLoading(true)
      await fetchRemotePicture()
      setIsPictureLoading(false)
    },
    [fetchRemotePicture, setIsPictureLoading]
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

  if (croppingState && picturePreview) {
    return (
      <CroppingDialog
        crop={crop}
        handleClose={onCancelCropping}
        onCancelCropping={onCancelCropping}
        onCropChange={onCropChange}
        onCropComplete={onCropComplete}
        onDoneCropping={onDoneCropping}
        onEntering={onDialogEntering}
        onKeyUp={onCropKeyup}
        onPictureLoaded={onPictureLoaded}
        open={open}
        picturePreview={picturePreview}
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
  if (isLoading) return <CircularProgress transparent />

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
      onKeyUp={onGalleryKeyup}
      onPictureClick={onPictureClick}
      onUrlUploadClick={onUrlUploadClick}
      open={open}
      pictures={pictures}
    />
  )
}

export default PicturesModal
