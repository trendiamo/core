// Note: this method only supports www.buttwrap.com for now
// run `theme.Product` in website for access to theme code on this
import { infoMsg } from 'shared/info-msg'
import { location } from 'config'

const addPictures = {
  'www.buttwrap.com': picture => {
    const sectionId = window.ShopifyAnalytics.meta.product.id
    const productThumbs = window.$(`#ProductThumbs-${sectionId}`)
    const productPhotos = window.$(`#ProductPhotos-${sectionId}`)
    productThumbs.slick('unslick')
    productPhotos.slick('unslick')
    const index = window.$('> div', productPhotos).length
    const thumbTemplate = `
<div class="product__thumb-item" data-index="${index}" tabindex="-1" role="option">
  <div class="image-wrap" style="height: 0; padding-bottom: 66.625%;">
    <div class="product__thumb js-no-transition" data-zoom="https://media.graphcms.com/resize=w:1200/${picture}">
      <img class="animation-delay-3 lazyloaded" alt="" src="https://media.graphcms.com/${picture}" />
    </div>
  </div>
</div>
    `
    const photoTemplate = `
<div class="secondary-slide photo-zoom-init" data-index="${index}" tabindex="-1" role="option">
  <div class="product-image-main product-image-main--10633868871">
    <div class="image-wrap" style="height: 0; padding-bottom: 66.625%;">
      <div class="photo-zoom-link photo-zoom-link--enable" data-zoom-size="https://media.graphcms.com/resize=w:1200/${picture}" style="position: relative; overflow: hidden;">
        <img class="lazyloaded" alt="" src="https://media.graphcms.com/${picture}" />
        <img role="presentation" src="https://media.graphcms.com/${picture}" class="zoomImg" style="position: absolute; top: 0px; left: 0px; opacity: 0; width: 800px; height: 533px; border: none; max-width: none; max-height: none;" />
      </div>
    </div>
  </div>
</div>
    `
    productThumbs.append(window.$(thumbTemplate))
    productPhotos.append(window.$(photoTemplate))
    window.$('body').trigger('matchLarge') // this makes it so slicks are re-generated
  },
}

const addPicture = picture => {
  const method = addPictures[location.hostname]
  if (method) {
    method(picture)
  } else {
    infoMsg(`addPicture not implemented for ${location.hostname}`)
  }
}

export default addPicture
