window.frekklsDataGathering = {
  addToCartObject(form) {
    const formFields = $(form).serializeArray()
    let productId, productName, subTotalInCents
    if (
      location.pathname.includes('/muesli/') &&
      !$(form)
        .find('button')
        .attr('data-tm-offer-id')
    ) {
      productId = $(form)
        .find('button')
        .attr('value')
      productName = 'Lieblingsmüsli (575g)'
      subTotalInCents = Number(
        $(form)
          .closest('.offerbutton-new-container')
          .find('.offer-price')
          .text()
          .trim()
          .split('für ')[1]
          .replace(/\D/g, '')
      )
    } else if (location.pathname.includes('/mixer/')) {
      productId = formFields[3].value
      productName = 'Lieblingsmüsli (575g)'
      subTotalInCents = Number(
        $('.js-total-price')
          .text()
          .replace(/\D/g, '')
      )
    } else {
      productId = $(form)
        .find('button')
        .attr('data-tm-offer-id')
      productName = formFields[1].value
      subTotalInCents = Number(
        $(form)
          .find('button')
          .attr('data-tm-offer-price')
          .replace(/\D/g, '')
      )
    }
    return {
      name: 'Add To Cart',
      data: {
        hostname: location.hostname,
        withPlugin: !!$('.frekkls-container')[0],
        productId,
        productName,
        currency: 'EUR',
        subTotalInCents,
      },
    }
  },
  getProductsFromCart() {
    return $('.row[data-offer-id]:not(.toggleOffer)').map((i, item) => {
      const itemName = $(item)
        .find('.article-description a')
        .first()
        .text()
        .trim()
        .replace(/\n|\r/g, '')
        .replace(/\s\s+/g, ' ')
      let itemUrl = $(item)
        .find('.article-description a')
        .attr('href')
      if (!itemUrl.includes('www.mymuesli.com')) {
        itemUrl = `https://www.mymuesli.com${itemUrl}`
      }
      const price = Number(
        $(item)
          .find('.js-total')
          .text()
          .replace(/\D/g, '')
      )
      const itemQuantity = Number(
        $(item)
          .find('.amount')
          .text()
          .trim()
      )
      let id = $(item).attr('data-offer-id')
      if ($(item).attr('data-offer-id') === '148') {
        const splittedUrl = itemUrl.split('/')
        id = `custom-${splittedUrl[splittedUrl.length - 1]}`
      }
      return {
        id,
        name: itemName,
        url: itemUrl,
        price,
        quantity: itemQuantity,
        currency: 'EUR',
      }
    })
  },
  checkoutObject() {
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!$('.frekkls-container')[0],
        products: this.getProductsFromCart(),
        subTotalInCents: Number(
          $('.js-cartamount')
            .text()
            .replace(/\D/g, '')
        ),
        currency: 'EUR',
      },
    }
  },
  setupDataGathering({ mixpanel }) {
    if (location.pathname.match(/^\/shop\/complete/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    } else if (location.pathname.match(/^\/shop\/cart/)) {
      $('.cart-controls').on('click', () => {
        const json = this.checkoutObject()
        mixpanel.track(json.name, json.data)
      })
    }
    if ($('form[action="https://www.mymuesli.com/shop/cart/put"]')) {
      $('form[action="https://www.mymuesli.com/shop/cart/put"]').on('submit', event => {
        const json = this.addToCartObject(event.target)
        mixpanel.track(json.name, json.data)
      })
    }
  },
}
