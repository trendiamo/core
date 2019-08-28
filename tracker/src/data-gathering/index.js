import theoceanbottleDataGathering from './theoceanbottle'
import waterhaulDataGathering from './waterhaul'

const dataGatheringFactory = {
  'theoceanbottle.com': theoceanbottleDataGathering,
  'waterhaul.co': waterhaulDataGathering,
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = () => dataGathering && dataGathering.setupDataGathering()

export default setupDataGathering
