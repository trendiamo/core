import dataGathering from 'data-gathering/pierre-cardin'
import { tagSuggestions } from './data'

const assessmentHack = () =>
  process.env.ASSESSMENT || localStorage.getItem('trnd-plugin-account') === 'PierreCardinGermany'

const rememberPersona = persona => sessionStorage.setItem('trnd-remembered-persona', JSON.stringify(persona))

const cartIsNotEmpty = () => getShopcartProductIds().length > 0

const recallPersona = () => JSON.parse(sessionStorage.getItem('trnd-remembered-persona'))
const assessmentCart = () => assessmentHack() && location.pathname.match(/^\/checkout\/cart/) && cartIsNotEmpty()

const fetchProducts = callback => {
  fetch('https://improv.ams3.digitaloceanspaces.com/improv/improv-data.js', {
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
    .then(response => response.json())
    .then(results => callback(results))
}

const getShopcartProductIds = () =>
  dataGathering
    .getProductsFromCart()
    .map((key, value) => value.id)
    .toArray()

const recommendedProducts = results => {
  const shopcartProductIds = getShopcartProductIds()

  const productReferences = results.find(item => item.hostname === location.hostname).products
  const productsMatchingCart = productReferences.filter(product => shopcartProductIds.includes(product.id))
  const tagsToRecommend = productsMatchingCart.map(product => {
    const productTag = product.tag
    // Search for matches by tagSuggestion keys (and return values if found)
    if (tagSuggestions[productTag]) {
      return tagSuggestions[productTag]
    }
    // Search for matches by tagSuggestion values (and return keys if found)
    return Object.keys(tagSuggestions).filter(key => tagSuggestions[key].includes(productTag))
  })

  const recommendedProducts = productReferences.filter(
    product =>
      tagsToRecommend.filter(tagToRecommend => tagToRecommend.includes(product.tag)).length > 0 &&
      !shopcartProductIds.includes(product.id)
  )
  return {
    type: 'assessmentProducts',
    assessmentProducts: recommendedProducts,
  }
}

export { assessmentHack, rememberPersona, recallPersona, recommendedProducts, assessmentCart, fetchProducts }
