import deliusContract from './delius-contract'
import pierreCardin from './pierre-cardin'
import { hostname } from 'utils'

const tagLists = {
  'www.pierre-cardin.de': pierreCardin,
  'www.delius-contract.de': deliusContract,
}

const tagList = tagLists[hostname]

export default tagList
