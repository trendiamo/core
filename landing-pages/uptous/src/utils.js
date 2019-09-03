import tingle from 'tingle.js'

const Modal = tingle.modal

const openModal = modalElementSelector => {
  const content = document.querySelector(modalElementSelector).innerHTML
  const modal = new Modal()
  modal.setContent(content)
  modal.open()
}

export { openModal }
