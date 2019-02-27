export default {
  onInit: () => {
    // trustbadge z-index fix
    const tmc = document.querySelector('div[data-tb-element="trustbadge_minimised_container"]')
    if (!tmc || !tmc.parentElement) return
    tmc.parentElement.style.cssText += ';z-index:2147482999 !important;'
  },
  i18n: {
    okCool: 'Alles klar!',
    productsSelectedBy: firstName => `Die Lieblingsprodukte von ${firstName}`,
  },
}
