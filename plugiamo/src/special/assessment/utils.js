import dataGathering from 'data-gathering/pierre-cardin'
import flatten from 'lodash.flatten'
import mixpanel from 'ext/mixpanel'
import { assessmentHostname } from 'config'
import { suggestions } from './data/pierre-cardin'

const isPCAssessment = () => assessmentHostname === 'www.pierre-cardin.de'

const deliusPathnames = ['/', '/en/', '/de/']

const isDeliusAssessment = () =>
  assessmentHostname === 'www.delius-contract.de' && deliusPathnames.includes(location.pathname)

const isDeliusPDP = () =>
  assessmentHostname === 'www.delius-contract.de' && location.pathname.match(/\/de\/produkte\/.+\/.+/)

const rememberPersona = persona => sessionStorage.setItem('trnd-remembered-persona', JSON.stringify(persona))

const cartIsNotEmpty = () => getShopcartProductIds().length > 0

const recallPersona = () => JSON.parse(sessionStorage.getItem('trnd-remembered-persona'))
const isPCAssessmentCart = () => isPCAssessment() && location.pathname.match(/^\/checkout\/cart/) && cartIsNotEmpty()

const assessProducts = (products, tags) => {
  const productsResult = flatten(
    tags.map(tag => {
      return products.filter(product => {
        if (product.tags) {
          const uniqueTag = tag.substring(tag.indexOf('/') + 1)
          return product.tags.includes(uniqueTag)
        }
        return product.tag && tag === product.tag
      })
    })
  )
  return productsResult.sort((a, b) => !!b.highlight - !!a.highlight)
}

const fetchProducts = () =>
  fetch('https://improv.ams3.digitaloceanspaces.com/improv/improv-data.json', {
    headers: new Headers({ 'Content-Type': 'application/json' }),
  }).then(response => response.json())

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const getShopcartProductIds = () =>
  process.env.ASSESSMENT_PRODUCT_ID
    ? [process.env.ASSESSMENT_PRODUCT_ID]
    : dataGathering
        .getProductsFromCart()
        .map((key, value) => value.id)
        .toArray()

const recommendedProducts = results => {
  const productReferences = results.find(item => item.hostname === assessmentHostname).products
  const shopcartProductIds = getShopcartProductIds()
  const shopcartProducts = productReferences.filter(product => shopcartProductIds.includes(product.id))

  const filteredSuggestions = Object.keys(suggestions)
    .filter(suggestionTag => {
      return shopcartProducts.find(product => (product.tag || '').includes(suggestionTag))
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
      product.tag &&
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
    flowType: 'asmt-store',
    hostname: location.hostname,
    productUrl: item.url,
    productName: item.title,
  })
  window.location.href = item.url
}

export {
  clickAssessmentProduct,
  isPCAssessment,
  rememberPersona,
  recallPersona,
  recommendedProducts,
  isPCAssessmentCart,
  fetchProducts,
  isDeliusAssessment,
  isDeliusPDP,
  assessProducts,
}
