window.frekklsConfig = {
  position: 'left',
  i18n: {
    productsSelectedBy: firstName => `Produtos selecionados por ${firstName}:`,
  },
  onInit: () => {
    if (document.querySelector('.cart__sumary.has-items') && window.innerWidth <= 736) {
      // in these conditions, the cart is shown at the bottom, so let's "cancel" the plugin
      return false
    }
  },
}
