import Content from './content'
import Dialog from 'shared/dialog'
import React, { useCallback } from 'react'

const CustomLinkModal = ({ brand, open, setOpen }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <Dialog
      content={<Content brand={brand} />}
      fullWidth
      handleClose={handleClose}
      hasManualPadding
      maxWidth="sm"
      open={open}
      PaperProps={{ style: { borderRadius: '10px' } }}
      title=""
    />
  )
}

export default CustomLinkModal
