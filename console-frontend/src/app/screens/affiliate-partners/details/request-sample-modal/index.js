import Content from './content'
import Dialog from 'shared/dialog'
import React, { useCallback } from 'react'

const RequestSampleModal = ({ brand, open, setOpen }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <Dialog
      content={<Content brand={brand} handleClose={handleClose} />}
      flexContent
      fullWidth
      handleClose={handleClose}
      hasManualPadding
      maxWidth="sm"
      open={open}
    />
  )
}

export default RequestSampleModal
