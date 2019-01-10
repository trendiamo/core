import { location } from 'config'

const i18n = {
  iStillNeedHelp: () => {
    if (location.hostname === 'www.shoptimao.com.br' || location.hostname === 'www.impressorajato.com.br') {
      return 'Me mostre outras sugestões'
    } else {
      return 'I still need help'
    }
  },
  okCool: () => {
    if (location.hostname === 'www.shoptimao.com.br' || location.hostname === 'www.impressorajato.com.br') {
      return 'Legal'
    } else {
      return 'Ok, cool'
    }
  },
  productsSelectedBy: firstName => {
    if (location.hostname === 'www.shoptimao.com.br') {
      return 'Conheça produtos que eu uso:'
    } else if (location.hostname === 'www.shopinfo.com.br' || location.hostname === 'www.impressorajato.com.br') {
      return `Produtos selecionados por ${firstName}:`
    } else {
      return `Products selected by ${firstName}`
    }
  },
}

export default i18n
