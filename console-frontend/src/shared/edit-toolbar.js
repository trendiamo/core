import Button from 'shared/button'
import { connect } from 'react-redux'
import Dialog from 'shared/dialog'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { crudDelete, SaveButton, startUndoable } from 'react-admin'

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
  handleSubmitWithRedirect,
  invalid,
  redirect,
  saving,
  submitOnEnter,
}) => (
  <React.Fragment>
    <SaveButton
      handleSubmitWithRedirect={handleSubmitWithRedirect}
      invalid={invalid}
      redirect={redirect}
      saving={saving}
      submitOnEnter={submitOnEnter}
    />
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
  </React.Fragment>
)

export default compose(
  connect(
    undefined,
    {
      dispatchDelete: crudDelete,
      startUndoable,
    }
  ),
  withState('showDialog', 'setShowDialog', false),
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
  })
)(Toolbar)
