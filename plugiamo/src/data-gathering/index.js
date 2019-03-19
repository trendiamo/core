import buttwrapDataGathering from './buttwrap'
import pierrecardinDataGathering from './pierre-cardin'
import shopinfoDataGathering from './shopinfo'

const dataGatheringFactory = {
  'www.buttwrap.com': buttwrapDataGathering,
  'www.pierre-cardin.de': pierrecardinDataGathering,
  'www.shopinfo.com.br': shopinfoDataGathering,
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = () => dataGathering && dataGathering.setupDataGathering()

export default setupDataGathering
