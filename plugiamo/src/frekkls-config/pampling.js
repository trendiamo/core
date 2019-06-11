const moduleMatchers = [
  { personaId: '211', homepagePath: '/simple-chat/288', productsPath: '/simple-chat/287' },
  { personaId: '223', homepagePath: '/simple-chat/295', productsPath: '/simple-chat/292' },
  { personaId: '222', homepagePath: '/simple-chat/297', productsPath: '/simple-chat/291' },
]

const isProductPage = () => {
  return location.pathname.match(/\/product?.*/)
}

export default {
  processOptions: options => {
    const { persona, path } = options
    if (persona && path) {
      sessionStorage.setItem('trnd-pampling', JSON.stringify({ path, persona }))
    }
    const pamplingStorageItem = sessionStorage.getItem('trnd-pampling')
    if (!pamplingStorageItem) return options
    const pamplingObject = JSON.parse(pamplingStorageItem)
    if (!pamplingObject) return options
    const currentModuleMatcher = moduleMatchers.find(item => item.personaId === pamplingObject.persona)
    if (!currentModuleMatcher) return options
    const currentPath =
      location.pathname === '/' || location.pathname === '/index'
        ? currentModuleMatcher.homepagePath
        : isProductPage() && currentModuleMatcher.productsPath
    if (!currentPath) return options
    return { path: currentPath, persona: currentModuleMatcher.personaId }
  },
}
