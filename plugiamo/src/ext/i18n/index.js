import { location } from 'config'

const i18n = {
  imDone: () => {
    if (location.hostname === 'www.shoptimao.com.br') {
      return 'Legal'
    } else {
      return "I'm done"
    }
  },
  iStillNeedHelp: () => {
    if (location.hostname === 'www.shoptimao.com.br') {
      return 'Me mostre outras sugestões'
    } else {
      return 'I still need help'
    }
  },
  productsSelectedBy: firstName => {
    if (location.hostname === 'www.shoptimao.com.br') {
      return 'Conheça produtos que eu uso:'
    } else {
      return `Products selected by ${firstName}`
    }
  },
}

export default i18n
