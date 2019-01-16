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

const modal = new tingle.modal({
  closeMethods: ["overlay", "button", "escape"],
})

modal.setContent(requestDemoContent)

window.onload = (event) => {
  const url = new URL(location.href)
  if (sessionStorage.getItem("firtVisit") !== "true" && url.pathname === "/") modal.open()
  if (url.pathname === "/") sessionStorage.setItem("firtVisit", "true")
}
