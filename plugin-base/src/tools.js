import { parse, stringify } from 'querystring'

function segmentize(url) {
  return url.replace(/(^\/+|\/+$)/g, '').split('/')
}

const EMPTY = {}

export const matchUrl = (url, route) => {
  const reg = /(?:\?([^#]*))?(#.*)?$/
  let c = url.match(reg),
    matches = {},
    ret
  if (c && c[1]) {
    let p = c[1].split('&')
    for (let i = 0; i < p.length; i++) {
      let r = p[i].split('=')
      matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='))
    }
  }
  url = segmentize(url.replace(reg, ''))
  route = segmentize(route || '')
  let max = Math.max(url.length, route.length)
  for (let i = 0; i < max; i++) {
    if (route[i] && route[i].charAt(0) === ':') {
      let flags = (route[i].match(/[+*?]+$/) || EMPTY)[0] || '',
        param = route[i].replace(/(^:|[+*?]+$)/g, ''),
        plus = ~flags.indexOf('+'),
        star = ~flags.indexOf('*'),
        val = url[i] || ''
      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        ret = false
        break
      }
      matches[param] = decodeURIComponent(val)
      if (plus || star) {
        matches[param] = url
          .slice(i)
          .map(decodeURIComponent)
          .join('/')
        break
      }
    } else if (route[i] !== url[i]) {
      ret = false
      break
    }
  }
  if (ret === false) return false
  return matches
}

export const imgixUrl = (url, imgixParams) => {
  if (!process.env.PRODUCTION) return url
  const urlObj = new URL(url)
  const dpr = window.devicePixelRatio || 1
  const search = { ...parse(urlObj.search.substr(1)), dpr, ...imgixParams }
  return `//trendiamo-assets.imgix.net${urlObj.pathname}?${stringify(search)}`
}
