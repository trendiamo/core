import buttwrapConfig from './buttwrap'
import corinthiansConfig from './corinthians'
import eoticaConfig from './eotica'
import frekklsDemoConfig from './frekkls-demo'
import impressoraJatoConfig from './impressora-jato'
import pierreCardinConfig from './pierre-cardin'
import pionierConfig from './pionier'
import rihappyConfig from './rihappy'
import shopinfoConfig from './shopinfo'
import villaDonatelloConfig from './villadonatello'

const defaultConfig = {
  position: 'right',
  onInit: () => null,
  onShow: () => null, // autoOpen => null,
  addPicture: () => null, // picure => null
  onCtaClick: () => null, // action => null,
  onChatStop: () => null,
  processChatOptions: chatOptions => chatOptions,
  i18n: {
    backButton: 'Back',
    productsSelectedBy: firstName => `Products selected by ${firstName}`,
  },
  launcherConfig: {
    extraElevation: 0,
  },
}

// Our clients can define a window.frekklsConfig object. Here we have some defined for them
const getFrekklsConfig = () => {
  if (window.frekklsConfig) return window.frekklsConfig
  if (location.hostname === 'demo.frekkls.com') return frekklsDemoConfig
  if (location.hostname === 'www.buttwrap.com') return buttwrapConfig
  if (location.hostname === 'www.pierre-cardin.de') return pierreCardinConfig
  if (location.hostname === 'www.pionier-workwear.com') return pionierConfig
  if (location.hostname === 'www.shopinfo.com.br') return shopinfoConfig
  if (['www.impressorajato.com.br', 'ia.luanda.supercopy.com.br'].includes(location.hostname))
    return impressoraJatoConfig
  if (location.hostname === 'www.shoptimao.com.br') return corinthiansConfig
  if (location.hostname === 'www.eotica.com.br') return eoticaConfig
  if (location.hostname === 'www.rihappy.com.br') return rihappyConfig
  if (location.hostname === 'villadonatello.com') return villaDonatelloConfig
  return {}
}

let frekklsConfig = null

export default () => {
  if (!frekklsConfig) {
    frekklsConfig = {
      ...defaultConfig,
      ...getFrekklsConfig(),
      i18n: { ...defaultConfig.i18n, ...getFrekklsConfig().i18n },
      launcherConfig: { ...defaultConfig.launcherConfig, ...getFrekklsConfig().launcherConfig },
    }
  }
  return frekklsConfig
}
