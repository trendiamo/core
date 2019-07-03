import dataGathering from 'data-gathering/pierre-cardin'
import flatten from 'lodash.flatten'
import mixpanel from 'ext/mixpanel'
import { assessmentHostname } from 'config'
import { suggestions } from './data/pierre-cardin'

const isPCAssessment = () => assessmentHostname === 'www.pierre-cardin.de'

const deliusPathnames = ['/', '/de/']

const isDeliusAssessment = () =>
  assessmentHostname === 'www.delius-contract.de' && deliusPathnames.includes(location.pathname)

const isDeliusPDP = () =>
  assessmentHostname === 'www.delius-contract.de' && location.pathname.match(/\/de\/produkte\/.+\/.+/)

const rememberPersona = persona => sessionStorage.setItem('trnd-remembered-persona', JSON.stringify(persona))

const cartIsNotEmpty = () => getShopcartProductIds().length > 0

const recallPersona = () => JSON.parse(sessionStorage.getItem('trnd-remembered-persona'))
const isPCAssessmentCart = () => isPCAssessment() && location.pathname.match(/^\/checkout\/cart/) && cartIsNotEmpty()

const fetchProducts = () =>
  fetch(process.env.TAGGED_PRODUCTS_URL, {
    headers: new Headers({ 'Content-Type': 'application/json' }),
  }).then(response => response.json())

const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const isProductMatchingTag = ({ product, tag }) => {
  return assessmentHostname === 'www.delius-contract.de'
    ? product.tags && product.tags.find(productTag => tag.includes(productTag))
    : product.tag && tag === product.tag
}

const sortAlphabetically = products => {
  return products.sort((a, b) => {
    var titleA = a.title.toUpperCase()
    var titleB = b.title.toUpperCase()
    return titleA < titleB ? -1 : titleA > titleB ? 1 : 0
  })
}

const sortByHighlight = products => {
  return products.sort((a, b) => !!b.highlight - !!a.highlight)
}

const sortProductsInStore = ({ products }) => {
  return sortByHighlight(sortAlphabetically(products))
}

const convertHighlights = ({ products, tags }) => {
  if (assessmentHostname !== 'www.delius-contract.de') return products
  return products.map(product => {
    return {
      ...product,
      highlight:
        product.highlight && !!product.highlight.find(highlightTag => tags.find(tag => tag.includes(highlightTag))),
    }
  })
}

const assessProducts = (products, tags) => {
  const newProducts = flatten(tags.map(tag => products.filter(product => isProductMatchingTag({ product, tag }))))
  return sortProductsInStore({
    products: convertHighlights({ products: newProducts, tags }),
    tags,
  })
}

const getShopcartProductIds = () =>
  process.env.ASSESSMENT_PRODUCT_ID
    ? [process.env.ASSESSMENT_PRODUCT_ID]
    : dataGathering
        .getProductsFromCart()
        .map((key, value) => value.id)
        .toArray()

const recommendedProducts = results => {
  const client = results.find(item => item.hostname === assessmentHostname)
  if (!client || !client.payload || !client.payload.products) return
  const productReferences = client.payload.products
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
