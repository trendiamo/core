import mixpanel from 'ext/mixpanel'
import { RollbarWrapper } from 'ext/rollbar'
/* eslint-disable no-undef */

export default {
  addToCartObject() {
    const formFields = $('#AddToCartForm--product-template').serializeArray()
    return {
      name: 'Add To Cart',
      data: {
        hostname: location.hostname,
        withPlugin: !!$('iframe[title="Frekkls Launcher"]')[0],
        productId: formFields.find(element => element.name === 'id').value,
        productName: $('.product-single__title').text(),
        currency: 'EUR',
        subTotalInCents: Number(
          $('#ProductPrice')
            .text()
            .replace(/\D/g, '')
        ),
        productOptions: $('.single-option-radio')
          .map((i, element) => {
            const optionSelected = $(element).find('[checked]')
            const optionSelectedValue = optionSelected.attr('value')
            if (!optionSelectedValue) return
            return {
              attributeLabel: optionSelected.attr('name'),
              attributeValue: optionSelectedValue,
              attributeId: optionSelected.attr('id'),
            }
          })
          .toArray(),
      },
    }
  },
  getProductsFromCart() {
    return $('.cart__row')
      .map((i, item) => {
        const itemName = $(item)
          .find('.cart__product-name')
          .text()
          .trim()
        if (!itemName) return
        const itemUrl =
          location.hostname +
          $(item)
            .find('.cart__product-name')
            .attr('href')
        const price = Number(
          $(item)
            .find('.cart__price')
            .text()
            .replace(/\D/g, '')
        )
        const itemQuantity = $(item)
          .find('.js-qty__num')
          .attr('value')
        return {
          name: itemName,
          url: itemUrl,
          price,
          quantity: itemQuantity,
          currency: 'EUR',
        }
      })
      .toArray()
  },
  getProductsFromAjaxCart() {
    return $('.ajaxcart__product')
      .map((i, item) => {
        const itemName = $(item)
          .find('.ajaxcart__product-name')
          .text()
          .trim()
        if (!itemName) return
        const itemUrl =
          location.hostname +
          $(item)
            .find('.ajaxcart__product-name')
            .attr('href')
        const itemPrice = $(item)
          .find('.ajaxcart__price')
          .text()
          .trim()
        const itemPriceInCents = Number(
          $(item)
            .find('.ajaxcart__price')
            .text()
            .replace(/\D/g, '')
        )
        const itemQuantity = $(item)
          .find('.ajaxcart__qty-num')
          .attr('value')
        return {
          name: itemName,
          url: itemUrl,
          price: itemPrice,
          priceInCents: itemPriceInCents,
          quantity: itemQuantity,
          currency: 'EUR',
        }
      })
      .toArray()
  },
  checkoutObject() {
    if ($('#CartDrawer.js-drawer-open')[0]) {
      return {
        name: 'Proceed To Checkout',
        data: {
          hostname: location.hostname,
          withPlugin: !!$('iframe[title="Frekkls Launcher"]')[0],
          products: this.getProductsFromAjaxCart(),
          subTotalInCents: Number(
            $('.ajaxcart__subtotal')
              .last()
              .text()
              .replace(/\D/g, '')
          ),
          currency: 'EUR',
        },
      }
    } else {
      return {
        name: 'Proceed To Checkout',
        data: {
          hostname: location.hostname,
          withPlugin: !!$('iframe[title="Frekkls Launcher"]')[0],
          products: this.getProductsFromCart(),
          subTotalInCents: Number(
            $('.cart__subtotal')
              .text()
              .replace(/\D/g, '')
          ),
          currency: 'EUR',
        },
      }
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.pathname.match(/9662595172/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    }

    if (!window.$) return

    $(document).on('submit', 'form.cart.ajaxcart', () =>
      RollbarWrapper(() => {
        const json = _this.checkoutObject()
        mixpanel.track(json.name, json.data)
      })
    )
    if ($('#AddToCart--product-template')[0]) {
      $(document).ajaxComplete((event, xhr, settings) =>
        RollbarWrapper(() => {
          if (settings.url === '/cart/add.js' && xhr.status === 200) {
            const json = _this.addToCartObject()
            mixpanel.track(json.name, json.data)
          }
        })
      )
    } else if (location.pathname.match(/^\/cart/)) {
      $('form.cart').on('click', 'button.cart__checkout', () =>
        RollbarWrapper(() => {
          const json = _this.checkoutObject()
          mixpanel.track(json.name, json.data)
        })
      )
    }
  },
}
