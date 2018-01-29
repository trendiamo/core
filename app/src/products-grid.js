import React from 'react'
import ProductCard from './product-card'
import Modal from 'react-modal'
import { compose, withHandlers, withState } from 'recompose'

const ProductsGrid = ({ appElement, closeModal, consumerId, isModalOpen, openModal, products }) => {
  return (
    <div>
      {products.map(product => (
        <ProductCard consumerId={consumerId} key={product.id} openModal={openModal} product={product} />
      ))}
      <Modal
        appElement={appElement}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Authorization Modal"
      >
        <h1>{'Create account'}</h1>
        <p>{'You need to create an account or login first.'}</p>
        <button className="btn" onClick={closeModal} type="button">
          {'Close'}
        </button>
      </Modal>
    </div>
  )
}

export default compose(
  withState('isModalOpen', 'setIsModalOpen', false),
  withHandlers({
    closeModal: ({ setIsModalOpen }) => () => setIsModalOpen(false),
    openModal: ({ setIsModalOpen }) => () => setIsModalOpen(true)
  })
)(ProductsGrid)
