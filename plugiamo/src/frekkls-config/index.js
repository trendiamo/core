import buttwrapConfig from './buttwrap'
import corinthiansConfig from './corinthians'
import eoticaConfig from './eotica'
import frekklsDemoConfig from './frekkls-demo'
import impressoraJatoConfig from './impressora-jato'
import pierreCardinConfig from './pierre-cardin'
import rihappyConfig from './rihappy'
import shopinfoConfig from './shopinfo'

const defaultConfig = {
  position: 'right',
  onInit: () => null,
  onShow: () => null, // autoOpen => null,
  addPicture: () => null, // picure => null
  onCtaClick: () => null, // action => null,
  onChatStop: () => null,
  processChatOptions: chatOptions => chatOptions,
  getFinalChatOptions() {
    return [{ id: 'stop', text: this.i18n.okCool }]
  },
  i18n: {
    okCool: 'Ok, cool',
    productsSelectedBy: firstName => `Products selected by ${firstName}`,
  },
}

// Our clients can define a window.frekklsConfig object. Here we have some defined for them
const getFrekklsConfig = () => {
  if (window.frekklsConfig) return window.frekklsConfig
  if (location.hostname === 'demo.frekkls.com') return frekklsDemoConfig
  if (location.hostname === 'www.buttwrap.com') return buttwrapConfig
  if (location.hostname === 'www.pierre-cardin.de') return pierreCardinConfig
  if (location.hostname === 'www.shopinfo.com.br') return shopinfoConfig
  if (['www.impressorajato.com.br', 'ia.luanda.supercopy.com.br'].includes(location.hostname))
    return impressoraJatoConfig
  if (location.hostname === 'www.shoptimao.com.br') return corinthiansConfig
  if (location.hostname === 'www.eotica.com.br') return eoticaConfig
  if (location.hostname === 'www.rihappy.com.br') return rihappyConfig
  return {}
}

let frekklsConfig = null

export default () => {
  if (!frekklsConfig) frekklsConfig = { ...defaultConfig, ...getFrekklsConfig() }
  return frekklsConfig
}