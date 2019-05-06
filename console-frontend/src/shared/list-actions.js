import Button from 'shared/button'
import Dialog from 'shared/dialog'
import React, { useCallback, useState } from 'react'

const DialogActions = ({ handleClose, handleDelete }) => (
  <>
    <Button color="primary" onClick={handleClose}>
      {'Cancel'}
    </Button>
    <Button color="error" onClick={handleDelete}>
      {'Delete'}
    </Button>
  </>
)

export const BulkActions = ({ deleteBulk, selectedIds }) => {
  const [showDialog, setShowDialog] = useState(false)

  const handleClose = useCallback(() => setShowDialog(false), [])
  const handleOpen = useCallback(() => setShowDialog(true), [])
  const handleDelete = useCallback(
    () => {
      deleteBulk()
      setShowDialog(false)
    },
    [deleteBulk]
  )

  return (
    <>
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
    </>
  )
}
