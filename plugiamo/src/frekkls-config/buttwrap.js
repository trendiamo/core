export default {
  addPicture: picture => {
    const sectionId = window.ShopifyAnalytics.meta.product.id
    const productThumbs = window.$(`#ProductThumbs-${sectionId}`)
    const productPhotos = window.$(`#ProductPhotos-${sectionId}`)
    const index = window.$('> div', productPhotos).length

    if (productThumbs.is(':visible')) {
      productThumbs.slick('unslick')
      const thumbTemplate = `
<div class="product__thumb-item" data-index="${index}" tabindex="-1" role="option">
  <div class="image-wrap" style="height: 0; padding-bottom: 66.625%;">
    <div class="product__thumb js-no-transition" data-zoom="${picture}?w=1200">
      <img class="animation-delay-3 lazyloaded" alt="" src="${picture}" />
    </div>
  </div>
</div>`
      productThumbs.append(window.$(thumbTemplate))
    }

    productPhotos.slick('unslick')
    const photoTemplate = `
<div class="secondary-slide photo-zoom-init" data-index="${index}" tabindex="-1" role="option">
  <div class="product-image-main product-image-main--10633868871">
    <div class="image-wrap" style="height: 0; padding-bottom: 66.625%;">
      <div class="photo-zoom-link photo-zoom-link--enable" data-zoom-size="${picture}?w=1200" style="position: relative; overflow: hidden;">
        <img class="lazyloaded" alt="" src="${picture}" />
        <img role="presentation" src="${picture}" class="zoomImg" style="position: absolute; top: 0px; left: 0px; opacity: 0; width: 800px; height: 533px; border: none; max-width: none; max-height: none;" />
      </div>
    </div>
  </div>
</div>`
    productPhotos.append(window.$(photoTemplate))
    window.$('body').trigger('matchLarge') // this makes it so slicks are re-generated
  },
}
