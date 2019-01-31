const i18n = {
  productsSelectedBy: firstName => {
    const account = localStorage.getItem('trnd-plugin-account')
    if (account === 'Corinthians') {
      return 'Conheça produtos que eu uso:'
    } else if (account === 'Trendiamo Demo') {
      return 'Here are my recommendations:'
    } else if (account === 'Eotica') {
      return `Produtos escolhidos por ${firstName}:`
    } else if (['Shopinfo', 'Shopinfo2', 'Impressorajato', 'RiHappy'].includes(account)) {
      return `Produtos selecionados por ${firstName}:`
    } else {
      return `Products selected by ${firstName}`
    }
  },
}

export default i18n
