import Content from './content'
import Dialog from 'shared/dialog'
import React, { useCallback } from 'react'

const CustomLinkModal = ({ affiliation, open, setOpen }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <Dialog
      content={<Content affiliation={affiliation} />}
      fullWidth
      handleClose={handleClose}
      hasManualPadding
      maxWidth="sm"
      open={open}
      title=""
    />
  )
}

export default CustomLinkModal
