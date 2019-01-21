import tingle from 'tingle.js'

if (!String.prototype.includes) {
  // eslint-disable-next-line no-extend-native
  Object.defineProperty(String.prototype, 'includes', {
    value: (search, start) => {
      if (typeof start !== 'number') {
        start = 0
      }

      if (start + search.length > this.length) {
        return false
      } else {
        return this.indexOf(search, start) !== -1
      }
    }
  })
}

const requestDemoContent = `
  <div class="disclaimer-modal-content">
    <h1 class="disclaimer-heading">Let's start your demo!</h1>
    <p class="disclaimer-main-text">On this test site you can preview a configuration of our plugin for several types of products, showcasing some of our features.</p>
    <p class="disclaimer-main-text">Get in touch with us and we'll prepare a live demo for your store!</p>
    <hr>
    <p class="disclaimer-secondary-text">Note: This is not a real web shop. The products and content on this part of the website are made up to serve as a demonstration environment. You can not actually buy any products on the website.</p>
  </div>
`

const Modal = tingle.modal

const modal = new Modal({
  footer: true,
  closeMethods: ['overlay', 'button', 'escape']
})

modal.setContent(requestDemoContent)

modal.addFooterBtn('Start Demo', 'tingle-btn tingle-btn--primary', () => {
  modal.close()
})

const disclaimerPaths = ['/', '/guitars_home']
const guitarNavPaths = ['/guitars_filtered_electric', '/guitars_filtered_classic', '/guitars_filtered_acoustic', '/guitars_filtered_semi_acoustic']

const findNavElementIndex = (path, pathsArray) => {
  return pathsArray.findIndex((element) => {
    return element === path
  })
}

window.onload = (event) => {
  // eslint-disable-next-line no-undef
  const url = new URL(event.target.body.baseURI)
  const guitarNavElements = document.querySelectorAll('.banner-hyperlink')
  if (window.sessionStorage.getItem('firtVisit') !== 'true' && disclaimerPaths.includes(url.pathname)) modal.open()
  if (disclaimerPaths.includes(url.pathname)) window.sessionStorage.setItem('firtVisit', 'true')
  const navItemIndex = findNavElementIndex(url.pathname, guitarNavPaths)
  guitarNavElements[navItemIndex] && guitarNavElements[navItemIndex].classList.add('nav-selected')
}
