export const popPath = () => {
  try {
    const paths = JSON.parse(sessionStorage.getItem('trnd-history'))
    paths.pop()
    sessionStorage.setItem('trnd-history', JSON.stringify(paths))
    return paths.length === 0 ? null : paths[paths.length - 1]
  } catch (e) {
    return null
  }
}

export const pushPath = path => {
  let paths
  try {
    paths = JSON.parse(sessionStorage.getItem('trnd-history'))
  } catch (e) {
    paths = []
  }
  const result = paths.push(path)
  sessionStorage.setItem('trnd-history', JSON.stringify(paths))
  return result
}

export const replaceLastPath = path => {
  try {
    const paths = JSON.parse(sessionStorage.getItem('trnd-history'))
    paths.pop()
    paths.push(path)
    sessionStorage.setItem('trnd-history', JSON.stringify(paths))
  } catch (e) {
    // do nothing
  }
}

export const markGoBack = () => {
  sessionStorage.setItem('trnd-go', 'back')
}

export const markGoFwd = () => {
  sessionStorage.setItem('trnd-go', 'fwd')
}

export const shouldRenderBack = () => {
  try {
    const paths = JSON.parse(sessionStorage.getItem('trnd-history'))
    return paths.length > 1
  } catch (e) {
    return false
  }
}

const setup = () => {
  const go = sessionStorage.getItem('trnd-go')
  let result
  if (go === 'back') {
    const poppedPath = popPath()
    result = poppedPath
  } else if (!go || go === '') {
    sessionStorage.setItem('trnd-history', JSON.stringify([]))
  }
  sessionStorage.removeItem('trnd-go')

  return result
}

export default setup
