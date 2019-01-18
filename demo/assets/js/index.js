import tingle from 'tingle.js'

const requestDemoContent = `
  <div class="disclaimer-modal-content">
    <h2 class="disclaimer-heading">Disclaimer</h2>
    <p class="disclaimer-main-text">On this test site you can preview a configuration of our plugin for several types of products, showcasing some of our features.</p>
    <p class="disclaimer-main-text">Get in touch with us and we'll prepare a live demo for your store!</p>
    <hr>
    <p class="disclaimer-secondary-text">Note: This is not a real web shop. The products and content on this part of the website are made up to serve as a demonstration environment. You can not actually buy any products on the website.</p>
  </div>
`

const Modal = tingle.modal

const modal = new Modal({
  closeMethods: ['overlay', 'button', 'escape']
})

modal.setContent(requestDemoContent)

window.onload = (event) => {
  // eslint-disable-next-line no-undef
  const url = new URL(event.target.body.baseURI)
  const disclaimerPaths = ['/', '/guitars_home']
  if (window.sessionStorage.getItem('firtVisit') !== 'true' && disclaimerPaths.includes(url.pathname)) modal.open()
  if (disclaimerPaths.includes(url.pathname)) window.sessionStorage.setItem('firtVisit', 'true')
}
