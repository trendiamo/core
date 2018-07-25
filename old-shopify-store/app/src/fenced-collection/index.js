import { gqlApiUrl } from 'utils'

const query = `
  query {
    fencedCollection(domainName: "${location.host}") {
      faviconUrl
      collection {
        handle
      }
    }
  }
`

const fetchFencedCollection = async () => {
  const res = await fetch(gqlApiUrl, {
    body: JSON.stringify({ query }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
  const json = await res.json()
  const { fencedCollection } = json.data
  return fencedCollection
}

const replaceFavicon = src => {
  if (!src) return
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.type = 'image/x-icon'
  link.rel = 'shortcut icon'
  link.href = src
  document.head.appendChild(link)
}

const checkFence = async () => {
  const fencedCollection = await fetchFencedCollection()
  if (!fencedCollection) return
  const collectionPath = `/collections/${fencedCollection.collection.handle}`
  if (!location.pathname.startsWith(collectionPath)) {
    return (window.location = collectionPath)
  }
  replaceFavicon(fencedCollection.faviconUrl)
  return fencedCollection
}

export default checkFence
