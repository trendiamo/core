import baldessariniConfig from './baldessarini'
import buttwrapConfig from './buttwrap'
import corinthiansConfig from './corinthians'
import deliusConfig from './delius'
import eoticaConfig from './eotica'
import frekklsDemoConfig from './frekkls-demo'
import impressoraJatoConfig from './impressora-jato'
import mymuesli from './mymuesli'
import pampling from './pampling'
import pierreCardinConfig from './pierre-cardin'
import pionierConfig from './pionier'
import rihappyConfig from './rihappy'
import shopinfoConfig from './shopinfo'
import timeblock from './timeblock'
import uniplacesConfig from './uniplaces'
import uptousapp from './uptousapp'
import villaDonatelloConfig from './villadonatello'

const defaultConfig = {
  position: 'right',
  initDelay: 0, // delay showing plugin, in milliseconds
  onInit: () => null, // return false to "cancel" the plugin.
  onShow: () => null, // autoOpen => null,
  addPicture: () => null, // picure => null
  onChatStop: () => null,
  processChatOptions: chatOptions => chatOptions,
  processOptions: options => options,
  i18n: {
    backButton: 'Back',
    productsSelectedBy: firstName => `Products selected by ${firstName}`,
  },
  launcherConfig: {
    extraElevation: 0,
    size: 'big',
  },
  pluginZIndex: null,
}

// Our clients can define a window.frekklsConfig object. Here we have some defined for them
const getFrekklsConfig = () => {
  if (window.frekklsConfig) return window.frekklsConfig
  if (location.hostname === 'www.baldessarini.com') return baldessariniConfig
  if (location.hostname === 'demo.frekkls.com') return frekklsDemoConfig
  if (location.hostname === 'www.buttwrap.com') return buttwrapConfig
  if (location.hostname === 'www.pierre-cardin.de') return pierreCardinConfig
  if (location.hostname === 'www.pionier-workwear.com') return pionierConfig
  if (location.hostname === 'www.delius-contract.de') return deliusConfig
  if (location.hostname === 'www.shopinfo.com.br') return shopinfoConfig
  if (['www.impressorajato.com.br', 'ia.luanda.supercopy.com.br'].includes(location.hostname))
    return impressoraJatoConfig
  if (['www.staging-uniplaces.com', 'www.uniplaces.com'].includes(location.hostname)) return uniplacesConfig
  if (location.hostname === 'www.shoptimao.com.br') return corinthiansConfig
  if (location.hostname === 'www.eotica.com.br') return eoticaConfig
  if (location.hostname === 'www.rihappy.com.br') return rihappyConfig
  if (location.hostname === 'villadonatello.com') return villaDonatelloConfig
  if (['pampling.com', 'www.pampling.com'].includes(location.hostname)) return pampling
  if (location.hostname === 'www.mymuesli.com') return mymuesli
  if (location.hostname === 'timeblock-europe.com') return timeblock
  if (location.hostname === 'app.uptous.co') return uptousapp
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
