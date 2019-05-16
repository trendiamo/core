import CircularProgress from 'app/layout/loading'
import CroppingDialog from './cropping-dialog'
import EmptyDialog from './empty-dialog'
import GalleryDialog from './gallery-dialog'
import isEmpty from 'lodash.isempty'
import React from 'react'
import UrlUploadDialog from './url-upload-dialog'
import { apiGetRemotePicture, apiPictureList, apiRequest } from 'utils'
import { compose, withHandlers, withState } from 'recompose'
import { useSnackbar } from 'notistack'
import 'react-aspect-ratio/aspect-ratio.css'

const ENTER_KEYCODE = 13

const PicturesModal = ({
  activePicture,
  crop,
  croppingState,
  emptyState,
  handleClose,
  isLoading,
  isPictureLoading,
  onCancelCropping,
  onCancelUrlUpload,
  onCropChange,
  onCropComplete,
  onCropKeyup,
  onDialogClose,
  onDialogEntering,
  onDoneCropping,
  onDoneUrlUpload,
  onGalleryKeyup,
  onFileUpload,
  onPictureClick,
  onPictureLoaded,
  onUrlUploadClick,
  onUrlUploadKeyup,
  open,
  pictures,
  picturePreview,
  picturePreviewRef,
  setPictureUrl,
  urlUploadState,
}) => {
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
        onFileUpload={onFileUpload}
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
        onFileUpload={onFileUpload}
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
      onFileUpload={onFileUpload}
      onKeyUp={onGalleryKeyup}
      onPictureClick={onPictureClick}
      onUrlUploadClick={onUrlUploadClick}
      open={open}
      pictures={pictures}
    />
  )
}

const PicturesModal1 = compose(
  withState('activePicture', 'setActivePicture', null),
  withState('emptyState', 'setEmptyState', false),
  withState('isLoading', 'setIsLoading', false),
  withState('isPictureLoading', 'setIsPictureLoading', false),
  withState('pictures', 'setPictures', []),
  withState('pictureUrl', 'setPictureUrl', ''),
  withState('urlUploadState', 'setUrlUploadState', false),
  withHandlers({
    fetchRemotePicture: ({ enqueueSnackbar, onFileUpload, pictureUrl }) => async () => {
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
    handleClose: ({ setOpen, setUrlUploadState }) => () => {
      setUrlUploadState(false)
      setOpen(false)
    },
    onCancelCropping: ({ onCancelClick, setActivePicture, setUrlUploadState }) => () => {
      onCancelClick()
      setUrlUploadState(false)
      setActivePicture(null)
    },
    onCancelUrlUpload: ({ setUrlUploadState }) => () => {
      setUrlUploadState(false)
    },
    onDialogClose: ({ activePicture, onModalClose }) => () => {
      onModalClose(activePicture ? activePicture.url : null)
    },
    onDoneCropping: ({ onDoneClick, setActivePicture, setUrlUploadState }) => () => {
      onDoneClick()
      setUrlUploadState(false)
      setActivePicture(null)
    },
    onFileUpload: ({ onFileUpload, setUrlUploadState, urlUploadState }) => ({ target: { files } }) => {
      if (urlUploadState) setUrlUploadState(false)
      onFileUpload(files)
    },
    onPictureClick: ({ setActivePicture }) => picture => {
      setActivePicture(picture)
    },
    onUrlUploadClick: ({ setUrlUploadState, setPictureUrl }) => () => {
      setPictureUrl('')
      setUrlUploadState(true)
    },
  }),
  withHandlers({
    fetchPictures: ({
      enqueueSnackbar,
      handleClose,
      previewPicture,
      setActivePicture,
      setEmptyState,
      setPictures,
    }) => async () => {
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
    onCropKeyup: ({ onDoneCropping }) => ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE) onDoneCropping()
    },
    onDoneUrlUpload: ({ fetchRemotePicture, setIsPictureLoading }) => async () => {
      setIsPictureLoading(true)
      await fetchRemotePicture()
      setIsPictureLoading(false)
    },
    onGalleryKeyup: ({ onDialogClose }) => ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE) onDialogClose()
    },
  }),
  withHandlers({
    onDialogEntering: ({ emptyState, fetchPictures, pictures, setIsLoading }) => async () => {
      if (!emptyState && isEmpty(pictures)) {
        setIsLoading(true)
        await fetchPictures()
        setIsLoading(false)
      }
    },
    onUrlUploadKeyup: ({ onDoneUrlUpload }) => ({ keyCode }) => {
      if (keyCode === ENTER_KEYCODE) onDoneUrlUpload()
    },
  })
)(PicturesModal)

const PicturesModal2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <PicturesModal1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default PicturesModal2
