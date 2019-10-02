import Content from './content'
import Dialog from 'shared/dialog'
import React, { useCallback } from 'react'

const BrandModal = ({ brand, createAffiliation, open, setOpen, removeAffiliation, selectedAffiliation, isLoading }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <Dialog
      content={
        <Content
          brand={brand}
          createAffiliation={createAffiliation}
          handleClose={handleClose}
          isLoading={isLoading}
          removeAffiliation={removeAffiliation}
          selectedAffiliation={selectedAffiliation}
        />
      }
      flexContent
      fullWidth
      handleClose={handleClose}
      hasManualPadding
      maxWidth="md"
      open={open}
      title=""
    />
  )
}

export default BrandModal
