import Modal from 'react-modal'
import ProductCard from './product-card'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

const ProductsGrid = ({ appElement, closeModal, metadata, isModalOpen, openModal, products }) => {
  return (
    <React.Fragment>
      {products.map(product => (
        <ProductCard key={product.id} metadata={metadata} openModal={openModal} product={product} />
      ))}
      <Modal
        appElement={appElement}
        contentLabel="Authorization Modal"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        <h1>{'Create account'}</h1>
        <p>{'You need to create an account or login first.'}</p>
        <button className="btn" onClick={closeModal} type="button">
          {'Close'}
        </button>
      </Modal>
    </React.Fragment>
  )
}

export default compose(
  withState('isModalOpen', 'setIsModalOpen', false),
  withHandlers({
    closeModal: ({ setIsModalOpen }) => () => setIsModalOpen(false),
    openModal: ({ setIsModalOpen }) => () => setIsModalOpen(true),
  })
)(ProductsGrid)
