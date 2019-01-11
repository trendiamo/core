import { location } from 'config'

const i18n = {
  iStillNeedHelp: () => {
    if (
      ['www.shoptimao.com.br', 'www.impressorajato.com.br', 'ia.luanda.supercopy.com.br'].includes(location.hostname)
    ) {
      return 'Me mostre outras sugestões'
    } else {
      return 'I still need help'
    }
  },
  okCool: () => {
    if (
      ['www.shoptimao.com.br', 'www.impressorajato.com.br', 'ia.luanda.supercopy.com.br'].includes(location.hostname)
    ) {
      return 'Legal'
    } else {
      return 'Ok, cool'
    }
  },
  productsSelectedBy: firstName => {
    if (location.hostname === 'www.shoptimao.com.br') {
      return 'Conheça produtos que eu uso:'
    } else if (
      ['www.shopinfo.com.br', 'www.impressorajato.com.br', 'ia.luanda.supercopy.com.br'].includes(location.hostname)
    ) {
      return `Produtos selecionados por ${firstName}:`
    } else {
      return `Products selected by ${firstName}`
    }
  },
}

export default i18n
