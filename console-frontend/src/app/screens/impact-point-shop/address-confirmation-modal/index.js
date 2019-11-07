import Content from './content'
import Dialog from 'shared/dialog'
import React, { useCallback } from 'react'

const AddressConfirmationModal = ({ open, setOpen, orderSample }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  return (
    <Dialog
      content={<Content handleClose={handleClose} orderSample={orderSample} />}
      flexContent
      fullWidth
      handleClose={handleClose}
      hasManualPadding
      maxWidth="sm"
      open={open}
    />
  )
}

export default AddressConfirmationModal
