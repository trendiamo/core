const i18n = {
  iStillNeedHelp: () => {
    const account = localStorage.getItem('trnd-plugin-account')
    if (['Corinthians', 'Shopinfo', 'Shopinfo2'].includes(account)) {
      return 'Me mostre outras sugestões'
    } else if (account === 'Impressorajato') {
      return 'Quero falar com um consultor'
    } else if (account === 'RiHappy') {
      return 'Preciso saber mais'
    } else {
      return 'I still need help'
    }
  },
  okCool: () => {
    const account = localStorage.getItem('trnd-plugin-account')
    if (['Corinthians', 'Impressorajato', 'Shopinfo', 'Shopinfo2'].includes(account)) {
      return 'Legal'
    } else if (account === 'RiHappy') {
      return 'Ok, otimo'
    } else {
      return 'Ok, cool'
    }
  },
  productsSelectedBy: firstName => {
    const account = localStorage.getItem('trnd-plugin-account')
    if (account === 'Corinthians') {
      return 'Conheça produtos que eu uso:'
    } else if (['Shopinfo', 'Shopinfo2', 'Impressorajato', 'RiHappy'].includes(account)) {
      return `Produtos selecionados por ${firstName}:`
    } else {
      return `Products selected by ${firstName}`
    }
  },
}

export default i18n
