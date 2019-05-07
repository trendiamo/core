import dataGathering from 'data-gathering/pierre-cardin'
import mixpanel from 'ext/mixpanel'
import { suggestions } from './data'

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

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const getShopcartProductIds = () =>
  dataGathering
    .getProductsFromCart()
    .map((key, value) => value.id)
    .toArray()

const recommendedProducts = results => {
  const productReferences = results.find(item => item.hostname === location.hostname).products
  const shopcartProductIds = getShopcartProductIds()
  const shopcartProducts = productReferences.filter(product => shopcartProductIds.includes(product.id))

  const filteredSuggestions = Object.keys(suggestions)
    .filter(suggestionTag => {
      return shopcartProducts.find(product => product.tag.includes(suggestionTag))
    })
    .reduce((res, key) => ((res[key] = suggestions[key]), res), {})

  let suggestionTags = []

  Object.keys(filteredSuggestions).map(key =>
    filteredSuggestions[key].map(suggestion => suggestionTags.push(suggestion))
  )

  // Get unique tags
  const uniqueTags = [...new Set(suggestionTags)]

  const recommendedProducts = productReferences.filter(
    product =>
      product.tag !== '' &&
      !shopcartProductIds.includes(product.id) &&
      uniqueTags.filter(tagToRecommend => tagToRecommend.includes(product.tag)).length > 0
  )
  return {
    type: 'assessmentProducts',
    assessmentProducts: shuffle(recommendedProducts.slice(0, 8)),
  }
}

const clickAssessmentProduct = item => {
  if (!item.url) return
  mixpanel.track('Clicked Assessment Store Product', {
    hostname: location.hostname,
    productUrl: item.url,
    productName: item.title,
  })
  window.location.href = item.url
}

export {
  assessmentHack,
  clickAssessmentProduct,
  rememberPersona,
  recallPersona,
  recommendedProducts,
  assessmentCart,
  fetchProducts,
}
