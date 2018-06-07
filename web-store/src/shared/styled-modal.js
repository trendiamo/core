import Modal from 'react-modal'
import React from 'react'

const defaultModalStyle = {
  content: {
    border: 0,
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    maxWidth: '86%',
    minWidth: '360px',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
}

const StyledModal = ({ contentStyle, overlayStyle, ...otherProps }) => (
  <Modal
    style={{
      content: { ...defaultModalStyle.content, ...contentStyle },
      overlay: { ...defaultModalStyle.overlay, ...overlayStyle },
    }}
    {...otherProps}
  />
)

export default StyledModal
