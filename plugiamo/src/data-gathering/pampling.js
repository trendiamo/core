import mixpanel from 'ext/mixpanel'
/* eslint-disable no-undef */

export default {
  addToCartObject(isProductFromModal = false, target) {
    if (isProductFromModal) {
      $('.capa-categoria.active')
        .find('.precio-categoria')
        .text()
      return {
        name: 'Add To Cart',
        data: {
          hostname: location.hostname,
          withPlugin: !!$('.frekkls-container')[0],
          productName: $(target)
            .parent()
            .attr('data-autor'),
          currency: 'EUR',
          subTotalInCents: Number(
            $('.capa-categoria.active')
              .find('.precio-categoria')
              .text()
              .replace(/\D/g, '') * 10
          ),
          productOptions: [
            {
              attributeCode: Number(
                $(target)
                  .parent()
                  .attr('data-id-instancia')
              ),
              optionValue: $(target)
                .parent()
                .attr('data-talla'),
              attributeLabel: $('.capa-categoria.active')
                .find('.titulo-categoria')
                .text(),
            },
          ],
        },
      }
    } else {
      return {
        name: 'Add To Cart',
        data: {
          hostname: location.hostname,
          withPlugin: !!$('.frekkls-container')[0],
          productName: $('#datos_autor')
            .text()
            .trim()
            .replace(/\s+/g, ' '),
          currency: 'EUR',
          subTotalInCents: Number(
            $('#precio_total')
              .text()
              .replace(/\D/g, '')
          ),
          productOptions: [
            {
              attributeCode: Number(
                $('.opciones_producto')
                  .find('.marcada')
                  .find('label')
                  .attr('for')
                  .replace(/\D/g, '')
              ),
              optionValue: $('.opciones_producto')
                .find('.marcada')
                .find('label')
                .text(),
              attributeLabel: $('.pestanya.actual')
                .find('.contenedor_titulo_pestanha')
                .text()
                .trim(),
            },
          ],
        },
      }
    }
  },
  getProductsFromCart() {
    return $('.pedido')
      .map((i, item) => {
        const itemName = $(item)
          .find('.articulo > a')
          .text()
        const itemSize = $(item)
          .find('.talla > b')
          .text()
        const itemUrl = $(item)
          .find('.articulo > a')
          .attr('href')
        const itemPrice = $(item)
          .find('.total')
          .text()
        const itemPriceInCents = Number(
          $(item)
            .find('.total')
            .text()
            .replace(/\D/g, '')
        )
        const itemQuantity = $(item)
          .find('.cantidad')
          .text()

        return {
          name: itemName,
          size: itemSize,
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
    return {
      name: 'Proceed To Checkout',
      data: {
        hostname: location.hostname,
        withPlugin: !!$('.frekkls-container')[0],
        products: this.getProductsFromCart(),
        subTotalInCents: Number(
          $('#cantidad_total_productos')
            .text()
            .replace(/\D/g, '')
        ),
        currency: 'EUR',
      },
    }
  },
  setupDataGathering() {
    const _this = this
    if (location.pathname.match(/pedido-finalizado/)) {
      mixpanel.track('Purchase Success', { hostname: location.hostname })
    } else if (location.pathname.match(/tienda\/cesta/)) {
      if (!$('.pedido')[0]) return
      $('#btn_comprar').on('click', () => {
        const json = _this.checkoutObject()
        mixpanel.track(json.name, json.data)
      })
    } else if (location.pathname.match(/productos\//)) {
      $('input#btn_anadir_articulo').on('click', () => {
        if ($('form#form_anadir_cesta').serializeArray().length === 0) return
        const json = _this.addToCartObject()
        mixpanel.track(json.name, json.data)
      })
    } else if (location.pathname.match(/^\/|\/index$/)) {
      $('.modal .capa-tallas').on('click', '.talla', event => {
        const isProductFromModal = true
        const json = _this.addToCartObject(isProductFromModal, event.target)
        mixpanel.track(json.name, json.data)
      })
    }
  },
}
