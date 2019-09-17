import Content from './content'
import Dialog from 'shared/dialog'
import React, { useCallback } from 'react'

const BrandsModal = ({ brand, createAffiliation, open, setOpen }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <Dialog
      content={<Content brand={brand} createAffiliation={createAffiliation} handleClose={handleClose} />}
      fullWidth
      handleClose={handleClose}
      hasManualPadding
      maxWidth="md"
      open={open}
      title=""
    />
  )
}

export default BrandsModal
