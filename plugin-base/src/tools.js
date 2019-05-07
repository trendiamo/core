import { parse, stringify } from 'querystring'

const segmentize = url => url.replace(/(^\/+|\/+$)/g, '').split('/')

const EMPTY = {}

const matchUrl = (url, route) => {
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

const imgixUrl = (url, imgixParams) => {
  if (url.lastIndexOf('https://console-assets.ams3.digitaloceanspaces.com', 0) !== 0) return url
  const urlObj = new URL(url)
  const dpr = window.devicePixelRatio || 1
  const search = { ...parse(urlObj.search.substr(1)), dpr, ...imgixParams }
  return `https://trendiamo-assets.imgix.net${urlObj.pathname}?${stringify(search)}`
}

const positioning = {
  content: null,
  launcherBubbles: null,
  launcherButtons: null,
  bubblesOffset: null,
  get({ type, reset, noStyle, ...props }) {
    if (this[type] && !reset) return this[type]
    const result = this[type === 'content' ? 'getContent' : 'getLauncherBubbles'](props)
    this[type] = noStyle ? this.toStyleObject(result) : this.toStyle(result)
    return this[type]
  },
  getContent({ position, launcherConfig }) {
    return {
      bottom: launcherConfig.smallFrameSize + launcherConfig.extraElevation + 10,
      [position === 'left' ? 'left' : 'right']: (launcherConfig.smallFrameSize - launcherConfig.smallSize) / 2 + 10,
    }
  },
  getLauncherBubbles({ position, elevation, launcherConfig, offset = { x: 0, y: 0 } }) {
    // As Math.cos and Math.sin are "heavy" operations and the angle will always be 45 degrees we can use 0.707
    // which is roughly the result of both Math.cos(45 * Math.PI / 180) and Math.sin(45 * Math.PI / 180)
    this.bubblesOffset = this.bubblesOffset || launcherConfig.frameSize / 2 + 10 + (launcherConfig.size * 0.707) / 2 + 2
    return {
      [position === 'left' ? 'left' : 'right']: this.bubblesOffset + offset.x,
      bottom: this.bubblesOffset + launcherConfig.extraElevation + (elevation ? 50 : 0) + offset.y,
    }
  },
  toStyle(object) {
    return Object.keys(object)
      .map(key => `${key}: ${Math.floor(object[key])}px; `)
      .join('')
  },
  toStyleObject(object) {
    Object.keys(object).map(key => (object[key] = Math.floor(object[key]) + 'px'))
    return object
  },
}

const extractYoutubeId = message => {
  const regExp = /^\S*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/
  const match = message.match(regExp)
  return match && match[2].length === 11 && match[2]
}

const extractJson = message => {
  if (message[0] !== '{') return
  try {
    return JSON.parse(message)
  } catch (e) {
    return null
  }
}

const isFrameActive = () => {
  return (
    document.activeElement &&
    document.activeElement.tagName.toLowerCase() === 'iframe' &&
    document.activeElement.title === 'Trendiamo Content'
  )
}

const convertLogs = logs => {
  let newLog = []
  let currentList = []
  logs.map((log, index) => {
    const nextLog = logs[index + 1]
    currentList.push(log)
    if (nextLog) {
      if (nextLog.type !== log.type) {
        newLog.push({ ...log, logs: currentList })
        currentList = []
      }
      return
    }
    newLog.push({ ...log, logs: currentList })
  })
  return newLog
}

const listeners = {
  list: [],
  addMany(fns) {
    fns.forEach(fn => {
      this.add(fn)
    })
  },
  reset(listeners) {
    this.removeAll()
    this.addMany(listeners)
  },
  add(fn) {
    this.list.push(fn)
  },
  remove(fn) {
    this.list = this.list.filter(e => e !== fn)
  },
  removeAll() {
    this.list = []
  },
  fireAll(params) {
    this.list.forEach(fn => fn(params))
  },
}

const replaceExternalLinks = message => {
  const messageWrapper = document.createElement('div')
  messageWrapper.innerHTML = message
  Array.from(messageWrapper.getElementsByTagName('a')).forEach(a => {
    if (a.hostname !== window.location.hostname) {
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noreferrer noopener')
    }
  })
  return messageWrapper.innerHTML
}

const MESSAGE_INTERVAL = 400
const MESSAGE_RANDOMIZER = 320

export {
  matchUrl,
  imgixUrl,
  positioning,
  extractYoutubeId,
  extractJson,
  isFrameActive,
  convertLogs,
  listeners,
  MESSAGE_INTERVAL,
  MESSAGE_RANDOMIZER,
  replaceExternalLinks,
}
