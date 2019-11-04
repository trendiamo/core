import baldessariniDataGathering from './baldessarini'
import buttwrapDataGathering from './buttwrap'
import grafikwerkstattDataGathering from './grafik-werkstatt'
import impressorajatoDataGathering from './impressorajato'
import lcwaikikiDataGathering from './lcwaikiki'
import mymuesliDataGathering from './mymuesli'
import pamplingDataGathering from './pampling'
import pierrecardinDataGathering from './pierre-cardin'
import pionierWorkwearDataGathering from './pionier-workwear'
import shopinfoDataGathering from './shopinfo'
import timeBlockDataGathering from './time-block'
import tontonetfilsDataGathering from './tontonetfils'

const dataGatheringFactory = {
  'www.buttwrap.com': buttwrapDataGathering, // shopify
  'www.pierre-cardin.de': pierrecardinDataGathering, // magento 2
  'www.shopinfo.com.br': shopinfoDataGathering, // vtex
  'www.impressorajato.com.br': impressorajatoDataGathering, // magento
  'www.baldessarini.com': baldessariniDataGathering, // magento 2
  'pampling.com': pamplingDataGathering, // php custom?
  'www.pampling.com': pamplingDataGathering, // php custom?
  'www.pionier-workwear.com': pionierWorkwearDataGathering, // php custom?
  'timeblock-europe.com': timeBlockDataGathering, // woocommerce
  'tontonetfils.fr': tontonetfilsDataGathering, // shopify
  'www.mymuesli.com': mymuesliDataGathering, // custom?
  'www.lcw.com': lcwaikikiDataGathering, // hybris
  'grafik-werkstatt.de': grafikwerkstattDataGathering, // magento 2
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = googleAnalytics => dataGathering && dataGathering.setupDataGathering(googleAnalytics)

export default setupDataGathering
