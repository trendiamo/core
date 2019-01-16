const i18n = {
  iStillNeedHelp: () => {
    const account = localStorage.getItem('trnd-plugin-account')
    if (['Corinthians', 'Impressorajato'].includes(account)) {
      return 'Me mostre outras sugestões'
    } else if (account === 'RiHappy') {
      return 'Preciso saber mais'
    } else {
      return 'I still need help'
    }
  },
  okCool: () => {
    const account = localStorage.getItem('trnd-plugin-account')
    if (['Corinthians', 'Impressorajato'].includes(account)) {
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
    } else if (['Shopinfo', 'Impressorajato', 'RiHappy'].includes(account)) {
      return `Produtos selecionados por ${firstName}:`
    } else {
      return `Products selected by ${firstName}`
    }
  },
}

export default i18n
