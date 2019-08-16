import mixpanel from 'ext/mixpanel'
/* eslint-disable no-undef */

const convertToCents = selector => {
  if (!selector) return 0
  return Number(selector.replace(/\D/g, ''))
}

export default {
  addToCartObject({ form }) {
    return {
      name: 'Add To Cart',
      data: {
        hostname: location.hostname,
        withPlugin: !!$('.frekkls-container')[0],
        currency: 'EUR',
        ...form,
      },
    }
  },
  getProductsFromCart() {
    const finalObject = []
    $('.row[data-offer-id]:not(.toggleOffer)').map((i, item) => {
      const itemDiv = $(item)
      const link = itemDiv.find('.article-description a').first()
      const itemName = link
        .text()
        .trim()
        .replace(/\n|\r/g, '')
        .replace(/\s\s+/g, ' ')
      let itemUrl = $(item)
        .find('.article-description a')
        .attr('href')
      if (itemUrl && !itemUrl.indexOf('www.mymuesli.com') !== -1) {
        itemUrl = `https://www.mymuesli.com${itemUrl}`
      }
      const price = convertToCents(
        $(item)
          .find('.js-total')
          .text()
      )
      const itemQuantity = Number(
        $(item)
          .find('.amount')
          .text()
          .trim()
      )
      let id = $(item).attr('data-offer-id')
      if (itemUrl && id === '148') {
        const splitUrl = itemUrl.split('/')
        id = splitUrl.length !== 0 && `custom-${splitUrl[splitUrl.length - 1]}`
      }
      finalObject.push({
        id,
        name: itemName,
        url: itemUrl,
        price,
        quantity: itemQuantity,
        currency: 'EUR',
      })
    })
    return finalObject
  },
  checkoutObject() {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!$('.frekkls-container')[0],
        products: this.getProductsFromCart(),
        subTotalInCents: convertToCents($('.js-cartamount').text()),
        currency: 'EUR',
      },
    }
  },
  trackAddToCart({ dataElement, isForm }) {
    const form = this.getAddToCartObject({ dataElement, isForm })
    if (!form) return
    const json = this.addToCartObject({ form })
    mixpanel.track(json.name, json.data)
  },
  getAddToCartObject({ dataElement, isForm }) {
    const element = $(dataElement)
    if (isForm) {
      const formFields = element.serializeArray()
      let productId, productName, subTotalInCents
      if (location.pathname.indexOf('/muesli/') !== -1 && !element.find('button').attr('data-tm-offer-id')) {
        productId = element.find('button').attr('value')
        productName = $('.container.basic-section.custommix')
          .find('.basic-text h1')
          .first()
          .text()
        const priceBase = element
          .closest('.offerbutton-new-container')
          .find('.offer-price')
          .text()
          .trim()
          .split('für ')
        subTotalInCents = convertToCents(priceBase.length > 1 && priceBase[1])
      } else if (location.pathname.indexOf('/mixer/') !== -1) {
        productId = formFields && formFields[3] && formFields[3].value
        productName = formFields && formFields[0] && formFields[0].value
        subTotalInCents = convertToCents($('.js-total-price').text())
      } else if (element.parent().attr('class') === 'updateCart') {
        const isMinus = element.find('button i.fa').hasClass('fa-minus')
        if (isMinus) return
        const container = element.closest('.row')
        productId =
          container
            .parent()
            .closest('.row')
            .attr('data-offer-id') ||
          element
            .find('input[name="offer_identifier"]')
            .first()
            .attr('value')
        productName = container
          .find('.article-description a')
          .first()
          .text()
          .trim()
          .replace(/\n|\r/g, '')
          .replace(/\s\s+/g, ' ')
        subTotalInCents = convertToCents(container.find('.js-price').text())
      } else {
        const elementParent = element.parent().parent()
        const hasSelector = elementParent.find('select').length !== 0
        const priceBase = hasSelector
          ? elementParent
              .find('.b2b-priceTag.active')
              .text()
              .trim()
              .split('für ')
          : element.find('button').attr('data-tm-offer-price')
        productId = hasSelector
          ? element
              .find('input[name="offer_identifier"]')
              .first()
              .attr('value')
          : element.find('button').attr('data-tm-offer-id')
        productName = formFields && formFields[1] && formFields[1].value
        subTotalInCents = convertToCents(hasSelector ? priceBase.length > 0 && priceBase[0] : priceBase)
      }
      return {
        productId,
        productName,
        subTotalInCents,
      }
    }
    const productName = element.find('abbr').text()
    const productId = element.find('.offerbutton-new-button button').attr('data-offer-id')
    const subTotalInCents = convertToCents(element.find('.nobr span').text())
    return {
      productId,
      productName,
      subTotalInCents,
    }
  },
  setupDataGathering() {
    if (!window.$) return
    if (location.pathname.match(/^\/shop\/complete/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    } else if (location.pathname.match(/^\/shop\/cart/)) {
      $(document).on('click', 'a[href="https://www.mymuesli.com/shop/kasse"]', () => {
        try {
          const json = this.checkoutObject()
          mixpanel.track(json.name, json.data)
        } catch (error) {
          // No action
        }
      })
    }
    $(document).on('click', '.offer-popup-container', event => {
      try {
        const dataElement = $(event.target).closest('.offer-item.offerbutton-new-container')
        this.trackAddToCart({ dataElement, isForm: false })
      } catch (error) {
        // No action
      }
    })
    $(document).on('submit', 'form[action="https://www.mymuesli.com/shop/cart/put"]', event => {
      try {
        this.trackAddToCart({ dataElement: event.target, isForm: true })
      } catch (error) {
        // No action
      }
    })
  },
}
