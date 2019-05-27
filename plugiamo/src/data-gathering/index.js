import baldessariniDataGathering from './baldessarini'
import buttwrapDataGathering from './buttwrap'
import impressorajatoDataGathering from './impressorajato'
import pierrecardinDataGathering from './pierre-cardin'
import shopinfoDataGathering from './shopinfo'

const dataGatheringFactory = {
  'www.buttwrap.com': buttwrapDataGathering,
  'www.pierre-cardin.de': pierrecardinDataGathering,
  'www.shopinfo.com.br': shopinfoDataGathering,
  'www.impressorajato.com.br': impressorajatoDataGathering,
  'www.baldessarini.com': baldessariniDataGathering,
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = googleAnalytics => dataGathering && dataGathering.setupDataGathering(googleAnalytics)

export default setupDataGathering
