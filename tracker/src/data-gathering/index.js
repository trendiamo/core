import almagreendesign from './almagreendesign'
import canussa from './canussa'
import elementum from './elementum'
import protsaah from './protsaah'
import theoceanbottleDataGathering from './theoceanbottle'
import trendiamoMVP from './trendiamo-mvp'
import vintageforacause from './vintageforacause'
import waterhaulDataGathering from './waterhaul'

const dataGatheringFactory = {
  'canussa.com': canussa, // woocommerce
  'theoceanbottle.com': theoceanbottleDataGathering, // shopify
  'waterhaul.co': waterhaulDataGathering, // woocommerce
  'trendiamo-mvp.myshopify.com': trendiamoMVP, // shopify
  'almagreendesign.com': almagreendesign, // vue-storefront +magento2?
  'elementum.store': elementum, // shopify
  'www.almagreendesign.com': almagreendesign, // vue-storefront +magento2?
  'vintageforacause.pt': vintageforacause, // shopify
  'www.protsaah.com': protsaah, // magento2
}

const dataGathering = dataGatheringFactory[window.location.hostname]

const setupDataGathering = () => dataGathering && dataGathering.setupDataGathering()

export default setupDataGathering
