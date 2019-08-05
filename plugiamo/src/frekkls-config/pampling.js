const moduleMatchers = [
  { sellerId: '211', homepagePath: '/simple-chat/288', productsPath: '/simple-chat/287' },
  { sellerId: '223', homepagePath: '/simple-chat/295', productsPath: '/simple-chat/292' },
  { sellerId: '222', homepagePath: '/simple-chat/297', productsPath: '/simple-chat/291' },
  { sellerId: '224', homepagePath: '/simple-chat/298', productsPath: '/simple-chat/300' },
  { sellerId: '245', homepagePath: '/simple-chat/310', productsPath: '/simple-chat/309' },
  { sellerId: '263', homepagePath: '/simple-chat/343', productsPath: '/simple-chat/344' },
]

const isProductPage = () => {
  return location.pathname.match(/\/product?.*/)
}

export default {
  processOptions: options => {
    const { seller, path } = options
    if (seller && path) {
      localStorage.setItem('trnd-pampling', JSON.stringify({ path, seller }))
    }
    if (
      !document.referrer.startsWith('https://www.pampling.com') &&
      !document.referrer.startsWith('https://pampling.com') &&
      !seller &&
      !path &&
      localStorage.getItem('trnd-pampling')
    ) {
      localStorage.removeItem('trnd-pampling')
      return options
    }
    const pamplingStorageItem = localStorage.getItem('trnd-pampling')
    if (!pamplingStorageItem) return options
    const pamplingObject = JSON.parse(pamplingStorageItem)
    if (!pamplingObject) return options
    const currentModuleMatcher = moduleMatchers.find(item => item.sellerId === pamplingObject.seller)
    if (!currentModuleMatcher) return options
    const currentPath =
      location.pathname === '/' || location.pathname === '/index'
        ? currentModuleMatcher.homepagePath
        : isProductPage() && currentModuleMatcher.productsPath
    if (!currentPath) return options
    return { path: currentPath, seller: currentModuleMatcher.sellerId }
  },
}
