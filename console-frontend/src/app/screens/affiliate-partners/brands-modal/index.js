import Content from './content'
import Dialog from 'shared/dialog'
import Header from './header'
import React, { useCallback } from 'react'

const BrandsModal = ({ open, setOpen, brand }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <Dialog
      content={<Content brand={brand} handleClose={handleClose} />}
      fullWidth
      handleClose={handleClose}
      hasManualPadding
      maxWidth="md"
      open={open}
      PaperProps={{ style: { borderRadius: '10px' } }}
      title={<Header brand={brand} />}
    />
  )
}

export default BrandsModal
