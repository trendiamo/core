import baldessariniDataGathering from './baldessarini'
import buttwrapDataGathering from './buttwrap'
import impressorajatoDataGathering from './impressorajato'
import pamplingDataGathering from './pampling'
import pierrecardinDataGathering from './pierre-cardin'
import pionierWorkwearDataGathering from './pionier-workwear'
import shopinfoDataGathering from './shopinfo'
import timeBlockDataGathering from './time-block'
import tontonetfilsDataGathering from './tontonetfils'

const dataGatheringFactory = {
  'www.buttwrap.com': buttwrapDataGathering,
  'www.pierre-cardin.de': pierrecardinDataGathering,
  'www.shopinfo.com.br': shopinfoDataGathering,
  'www.impressorajato.com.br': impressorajatoDataGathering,
  'www.baldessarini.com': baldessariniDataGathering,
  'pampling.com': pamplingDataGathering,
  'www.pampling.com': pamplingDataGathering,
  'www.pionier-workwear.com': pionierWorkwearDataGathering,
  'timeblock-europe.com': timeBlockDataGathering,
  'tontonetfils.fr': tontonetfilsDataGathering,
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = googleAnalytics => dataGathering && dataGathering.setupDataGathering(googleAnalytics)

export default setupDataGathering
