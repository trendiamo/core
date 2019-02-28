import buttwrapDataGathering from './buttwrap'

const dataGatheringFactory = {
  'www.buttwrap.com': buttwrapDataGathering,
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = () => dataGathering && dataGathering.setupDataGathering()

export default setupDataGathering
