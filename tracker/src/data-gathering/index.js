import theoceanbottleDataGathering from './theoceanbottle'

const dataGatheringFactory = {
  'theoceanbottle.com': theoceanbottleDataGathering,
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = () => dataGathering && dataGathering.setupDataGathering()

export default setupDataGathering
