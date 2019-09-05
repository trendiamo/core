import almagreendesign from './almagreendesign'
import elementum from './elementum'
import theoceanbottleDataGathering from './theoceanbottle'
import trendiamoMVP from './trendiamo-mvp'
import vintageforacause from './vintageforacause'
import waterhaulDataGathering from './waterhaul'

const dataGatheringFactory = {
  'theoceanbottle.com': theoceanbottleDataGathering,
  'waterhaul.co': waterhaulDataGathering,
  'trendiamo-mvp.myshopify.com': trendiamoMVP,
  'almagreendesign.com': almagreendesign,
  'elementum.store': elementum,
  'www.almagreendesign.com': almagreendesign,
  'vintageforacause.pt': vintageforacause,
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = () => dataGathering && dataGathering.setupDataGathering()

export default setupDataGathering
