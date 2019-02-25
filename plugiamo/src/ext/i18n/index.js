const i18n = {
  okCool: () => {
    const account = localStorage.getItem('trnd-plugin-account')
    if (['Corinthians', 'Shopinfo', 'Shopinfo2'].includes(account)) {
      return 'Legal'
    } else if (account === 'Impressorajato') {
      return 'Quero falar com um consultor'
    } else if (account === 'Eotica') {
      return 'Legal, gostei!'
    } else if (account === 'RiHappy') {
      return 'Ok, otimo'
    } else if (account === 'PierreCardinGermany') {
      return 'Alles klar!'
    } else {
      return 'Ok, cool'
    }
  },
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
    } else if (account === 'PierreCardinGermany') {
      return `Die Lieblingsprodukte von ${firstName}`
    } else {
      return `Products selected by ${firstName}`
    }
  },
}

export default i18n
