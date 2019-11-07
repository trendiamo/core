import Content from './content'
import Dialog from 'shared/dialog'
import React from 'react'

const BioAndPicModal = ({ closeBioAndPicModal, open, sendUpgradeRequest }) => (
  <Dialog
    content={<Content handleClose={closeBioAndPicModal} sendUpgradeRequest={sendUpgradeRequest} />}
    fullWidth
    handleClose={closeBioAndPicModal}
    maxWidth="sm"
    open={open}
    title="Become a content editor now!"
  />
)

export default BioAndPicModal
