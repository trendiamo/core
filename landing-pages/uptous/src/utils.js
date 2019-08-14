import tingle from 'tingle.js'

const Modal = tingle.modal

const openModal = modalElementSelector => {
  const legalNoticeContent = document.querySelector(modalElementSelector).innerHTML
  const modal = new Modal()
  modal.setContent(legalNoticeContent)
  modal.open()
}

export { openModal }
