import buttwrapDataGathering from './buttwrap'
import impressorajatoDataGathering from './impressorajato'
import pierrecardinDataGathering from './pierre-cardin'
import shopinfoDataGathering from './shopinfo'

const dataGatheringFactory = {
  'www.buttwrap.com': buttwrapDataGathering,
  'www.pierre-cardin.de': pierrecardinDataGathering,
  'www.shopinfo.com.br': shopinfoDataGathering,
  'www.impressorajato.com.br': impressorajatoDataGathering,
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = () => dataGathering && dataGathering.setupDataGathering()

export default setupDataGathering
