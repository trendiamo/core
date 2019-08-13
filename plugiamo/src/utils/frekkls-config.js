import { loadJs } from 'utils'

const defaultConfig = {
  position: 'right',
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

const filesNamesHash = {
  'www.baldessarini.com': 'baldessarini',
  'demo.frekkls.com': 'frekkls-demo',
  'www.buttwrap.com': 'buttwrap',
  'www.pierre-cardin.de': 'pierre-cardin',
  'www.pionier-workwear.com': 'pionier',
  'www.delius-contract.de': 'delius',
  'www.shopinfo.com.br': 'shopinfo',
  'www.impressorajato.com.br': 'impressora-jato',
  'ia.luanda.supercopy.com.br': 'impressora-jato',
  'www.staging-uniplaces.com': 'uniplaces',
  'www.uniplaces.com': 'uniplaces',
  'www.shoptimao.com.br': 'corinthians',
  'www.eotica.com.br': 'eotica',
  'www.rihappy.com.br': 'rihappy',
  'villadonatello.com': 'villadonatello',
  'www.pampling.com': 'pampling',
  'www.mymuesli.com': 'mymuesli',
}

// Our clients can define a window.frekklsConfig object. Here we have some defined for them
const getRemoteConfig = async () => {
  const fileName = filesNamesHash[window.location.hostname]
  if (!fileName) {
    window.frekklsConfig = {}
    return
  }
  return loadJs(`https://plugin-assets.ams3.digitaloceanspaces.com/config/${fileName}.js`)
}

let localNewConfig = null
let localFrekklsConfig = null

export const setupFrekklsConfig = async () => {
  if (!window.frekklsConfig) {
    try {
      await getRemoteConfig()
    } catch {
      window.frekklsConfig = {}
    }
  }
  localNewConfig = window.frekklsConfig
}

const getFrekklsConfig = () => {
  if (!localFrekklsConfig) {
    localFrekklsConfig = {
      ...defaultConfig,
      ...localNewConfig,
      i18n: { ...defaultConfig.i18n, ...localNewConfig.i18n },
      launcherConfig: { ...defaultConfig.launcherConfig, ...localNewConfig.launcherConfig },
    }
  }
  return localFrekklsConfig
}

export default getFrekklsConfig
