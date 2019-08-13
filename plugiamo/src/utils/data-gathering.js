import { loadJs } from 'utils'

const filesNamesHash = {
  'www.buttwrap.com': 'buttwrap',
  'www.pierre-cardin.de': 'pierre-cardin',
  'www.shopinfo.com.br': 'shopinfo',
  'www.impressorajato.com.br': 'impressorajato',
  'www.baldessarini.com': 'baldessarini',
  'pampling.com': 'pampling',
  'www.pampling.com': 'pampling',
  'www.pionier-workwear.com': 'pionier-workwear',
  'timeblock-europe.com': 'time-block',
  'tontonetfils.fr': 'tontonetfils',
  'www.mymuesli.com': 'mymuesli',
}

const getRemoteDataGathering = async () => {
  const fileName = filesNamesHash[window.location.hostname]
  if (!fileName) return
  return loadJs(`https://plugin-assets.ams3.digitaloceanspaces.com/data-gathering/${fileName}.js`)
}

const setupDataGathering = async ({ googleAnalytics, mixpanel }) => {
  try {
    await getRemoteDataGathering()
  } catch {
    // no action
  }
  window.frekklsDataGathering && window.frekklsDataGathering.setupDataGathering({ googleAnalytics, mixpanel })
}

export default setupDataGathering
