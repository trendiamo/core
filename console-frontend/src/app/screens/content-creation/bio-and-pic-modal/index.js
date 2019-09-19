import Content from './content'
import Dialog from 'shared/dialog'
import React, { useCallback } from 'react'

const BioAndPicModal = ({ open, setOpen, sendUpgradeRequest }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])
  return (
    <Dialog
      content={<Content handleClose={handleClose} sendUpgradeRequest={sendUpgradeRequest} />}
      fullWidth
      handleClose={handleClose}
      maxWidth="sm"
      open={open}
      title="Become a content editor now!"
    />
  )
}

export default BioAndPicModal
