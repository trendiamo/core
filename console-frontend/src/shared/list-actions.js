import Button from 'shared/button'
import Dialog from 'shared/dialog'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

const DialogActions = ({ handleClose, handleDelete }) => (
  <React.Fragment>
    <Button color="primary" onClick={handleClose}>
      {'Cancel'}
    </Button>
    <Button color="error" onClick={handleDelete}>
      {'Delete'}
    </Button>
  </React.Fragment>
)

const BulkActionButtons = ({ handleOpen, showDialog, handleClose, handleDelete, selectedIds }) => (
  <React.Fragment>
    {selectedIds.length > 0 && (
      <Button color="error" onClick={handleOpen} variant="contained">
        {'Delete'}
      </Button>
    )}
    <Dialog
      content={`Are you sure that you want to delete ${selectedIds.length} ${
        selectedIds.length > 1 ? 'elements' : 'element'
      }?`}
      dialogActions={<DialogActions handleClose={handleClose} handleDelete={handleDelete} />}
      handleClose={handleClose}
      open={showDialog}
      title="Are you sure?"
    />
  </React.Fragment>
)

export const BulkActions = compose(
  withState('showDialog', 'setShowDialog', false),
  withHandlers({
    handleClose: ({ setShowDialog }) => () => {
      setShowDialog(false)
    },
    handleDelete: ({ deleteBulk, setShowDialog }) => () => {
      deleteBulk()
      setShowDialog(false)
    },
    handleOpen: ({ setShowDialog }) => () => {
      setShowDialog(true)
    },
  })
)(BulkActionButtons)
