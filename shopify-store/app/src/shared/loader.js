import { ClipLoader } from 'react-spinners'
import Modal from 'react-modal'
import React from 'react'

const Spinner = () => <ClipLoader color={'#71E1D0'} loader={'BounceLoader'} size={150} sizeUnit={'px'} />

const defaultStyles = {
  content: {
    background: 'rgba(255, 255, 255, 0)',
    outline: 'none',
    overflow: 'auto',
    padding: '40px',
    WebkitOverflowScrolling: 'touch',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 10,
  },
}

const Loader = ({ isLoading }) => (
  <div>
    <Modal appElement={document.body} contentLabel="Loading" defaultStyles={defaultStyles} isOpen={isLoading}>
      <Spinner />
    </Modal>
  </div>
)

export default Loader
