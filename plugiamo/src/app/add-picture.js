// Note: this method only supports Shopify websites (for now). Actually only tested in www.buttwrap.com
const addPicture = picture => {
  const ul = window.$('.thumbnails-wrapper ul')
  const template = `
<li class="grid__item medium-up--one-quarter product-single__thumbnails-item">
  <a class="text-link product-single__thumbnail product-single__thumbnail--product-template" href="https://media.graphcms.com/${picture}" data-zoom="https://media.graphcms.com/resize=w:1200/${picture}">
    <img class="product-single__thumbnail-image" src="https://media.graphcms.com/${picture}" alt="">
  </a>
</li>
  `
  ul.prepend(window.$(template))
  const Product = window.theme.Product.bind(window.theme.Product.prototype)
  Product(window.$('#ProductSection-product-template'))
  window.$('a.product-single__thumbnail:first').click()
}

export default addPicture
