import theoceanbottleDataGathering from './theoceanbottle'
import trendiamoMVP from './trendiamo-mvp'
import waterhaulDataGathering from './waterhaul'

const dataGatheringFactory = {
  'theoceanbottle.com': theoceanbottleDataGathering,
  'waterhaul.co': waterhaulDataGathering,
  'trendiamo-mvp.myshopify.com': trendiamoMVP,
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = () => dataGathering && dataGathering.setupDataGathering()

export default setupDataGathering
