import Content from './content'
import Dialog from 'shared/dialog'
import React, { useCallback } from 'react'

const BrandModal = ({
  brand,
  createAffiliation,
  createInterest,
  open,
  setOpen,
  removeAffiliation,
  selectedAffiliation,
  isLoading,
  interests,
  removeInterest,
}) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <Dialog
      content={
        <Content
          brand={brand}
          createAffiliation={createAffiliation}
          createInterest={createInterest}
          handleClose={handleClose}
          interests={interests}
          isLoading={isLoading}
          removeAffiliation={removeAffiliation}
          removeInterest={removeInterest}
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
