import Button from 'shared/button'
import Dialog from 'shared/dialog'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
// import { connect } from 'react-redux'
// import { crudDeleteMany, startUndoable } from 'react-admin'

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

const BulkActionButtons = ({ handleOpen, showDialog, handleClose, handleDelete, selectedIds }) => (
  <React.Fragment>
    <Button color="error" onClick={handleOpen} variant="outlined">
      {'Delete'}
    </Button>
    <Dialog
      content={`Are you sure that you want to delete ${selectedIds.length} ${
        selectedIds.length > 1 ? 'elements' : 'element'
      }?`}
      dialogActions={<DeleteActions handleClose={handleClose} handleDelete={handleDelete} />}
      open={showDialog}
      title="Are you sure?"
    />
  </React.Fragment>
)

export const BulkActions = compose(
  // connect(
  //   undefined,
  //   {
  //     // dispatchCrudDeleteMany: crudDeleteMany,
  //     // startUndoable,
  //   }
  // ),
  withState('showDialog', 'setShowDialog', false),
  withHandlers({
    handleClose: ({ setShowDialog }) => () => {
      setShowDialog(false)
    },
    handleDelete: ({ setShowDialog, resource, basePath, selectedIds, dispatchCrudDeleteMany }) => () => {
      dispatchCrudDeleteMany(resource, selectedIds, basePath)
      setShowDialog(false)
    },
    handleOpen: ({ setShowDialog }) => () => {
      setShowDialog(true)
    },
  })
)(BulkActionButtons)
