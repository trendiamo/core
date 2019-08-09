const getPaths = () => {
  try {
    return JSON.parse(sessionStorage.getItem('trnd-history'))
  } catch (e) {
    return []
  }
}

const setPaths = paths => {
  sessionStorage.setItem('trnd-history', JSON.stringify(paths))
}

export const popPath = () => {
  const paths = getPaths()
  paths.pop()
  setPaths(paths)
  return paths.length === 0 ? null : paths[paths.length - 1]
}

export const pushPath = path => {
  const paths = getPaths()
  const result = paths.push(path)
  setPaths(paths)
  return result
}

export const replaceLastPath = path => {
  const paths = getPaths()
  paths.pop()
  paths.push(path)
  setPaths(paths)
}

export const markGoBack = () => {
  sessionStorage.setItem('trnd-go', 'back')
}

export const markGoFwd = () => {
  sessionStorage.setItem('trnd-go', 'fwd')
}

export const shouldRenderBack = () => {
  const paths = getPaths()
  return paths.length > 1
}

const setup = () => {
  const go = sessionStorage.getItem('trnd-go')
  let result
  if (go === 'back') {
    const poppedPath = popPath()
    result = poppedPath
  } else if (!go || go === '') {
    setPaths([])
  }
  sessionStorage.removeItem('trnd-go')

  return result
}

export default setup
