import Button from 'shared/button'
import Dialog from 'shared/dialog'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
import { crudDelete, SaveButton, startUndoable } from 'react-admin'
import { ProgressBar, uploadImage } from 'shared/picture-uploader'
import { showNotification } from 'react-admin'

const DeleteActions = ({ handleClose, handleDelete }) => (
  <React.Fragment>
    <Button color="primary" onClick={handleClose}>
      {'Cancel'}
    </Button>
    <Button color="primary" onClick={handleDelete}>
      {'Delete'}
    </Button>
  </React.Fragment>
)

const Toolbar = ({
  handleOpen,
  showDialog,
  handleClose,
  handleDelete,
  invalid,
  redirect,
  saving,
  submitOnEnter,
  handleSave,
  progress,
  deletable,
  disabled,
}) => (
  <React.Fragment>
    {progress && <ProgressBar progress={progress} />}
    <SaveButton
      disabled={disabled}
      handleSubmitWithRedirect={handleSave}
      invalid={invalid}
      redirect={redirect}
      saving={saving}
      submitOnEnter={submitOnEnter}
    />
    {deletable && (
      <div>
        <div style={{ float: 'right' }}>
          <Button color="error" onClick={handleOpen} size="large">
            {'Delete'}
          </Button>
        </div>
        <Dialog
          content="Are you sure you want to delete this element?"
          dialogActions={<DeleteActions handleClose={handleClose} handleDelete={handleDelete} />}
          open={showDialog}
          title="Are you sure?"
        />
      </div>
    )}
  </React.Fragment>
)

export default compose(
  connect(
    undefined,
    {
      dispatchDelete: crudDelete,
      showNotification,
      startUndoable,
    }
  ),
  withState('showDialog', 'setShowDialog', false),
  withState('progress', 'setProgress', false),
  withHandlers({
    handleClose: ({ setShowDialog }) => () => {
      setShowDialog(false)
    },
    handleDelete: ({ setShowDialog, resource, basePath, record, dispatchDelete, redirect }) => () => {
      dispatchDelete(resource, record.id, record, basePath, redirect)
      setShowDialog(false)
    },
    handleOpen: ({ setShowDialog }) => () => {
      setShowDialog(true)
    },
    handleSave: ({ handleSubmitWithRedirect, profilePic, setProgress, setProfilePicUrl }) => () => async () => {
      // upload image
      const profilePicUrl = await uploadImage({
        blob: profilePic,
        setProgress,
        type: 'users-profile-pics',
      })
      // update the data
      setProfilePicUrl(profilePicUrl)
      setTimeout(() => {
        // Timeout so that we submit after the state is set (on the next render)
        handleSubmitWithRedirect()()
      }, 0)
    },
  })
)(Toolbar)
