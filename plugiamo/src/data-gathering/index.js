import buttwrapDataGathering from './buttwrap'
import pierrecardinDataGathering from './pierre-cardin'

const dataGatheringFactory = {
  'www.buttwrap.com': buttwrapDataGathering,
  'www.pierre-cardin.de': pierrecardinDataGathering,
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = () => dataGathering && dataGathering.setupDataGathering()

export default setupDataGathering
