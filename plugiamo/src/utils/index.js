import { launcherConfig } from 'config'
import { MAIN_BREAKPOINT } from 'config'

const isSmall = () => window.innerWidth < MAIN_BREAKPOINT
const isLarge = () => !isSmall()

const getScrollbarWidth = () => {
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.msOverflowStyle = 'scrollbar' // needed for WinJS apps
  document.body.appendChild(outer)
  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'
  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)
  const widthWithScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)
  return widthNoScroll - widthWithScroll
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
  getContent({ position }) {
    return {
      bottom: launcherConfig.smallFrameSize + this.getElevation(position) + 10,
      [position === 'left' ? 'left' : 'right']: (launcherConfig.smallFrameSize - launcherConfig.smallSize) / 2 + 10,
    }
  },
  getLauncherBubbles({ position, elevation }) {
    // As Math.cos and Math.sin are "heavy" operations and the angle will always be 45 degrees we can use 0.707
    // which is roughly the result of both Math.cos(45 * Math.PI / 180) and Math.sin(45 * Math.PI / 180)
    this.bubblesOffset = this.bubblesOffset || launcherConfig.frameSize / 2 + 10 + (launcherConfig.size * 0.707) / 2 + 2
    return {
      [position === 'left' ? 'left' : 'right']: this.bubblesOffset,
      bottom: this.bubblesOffset + this.getElevation(position) + (elevation ? 50 : 0),
    }
  },
  getElevation(position) {
    return position === 'right-elevated' ? launcherConfig.elevationWhenActive : 0
  },
  toStyle(object) {
    return Object.keys(object)
      .map(key => {
        return `${key}: ${Math.floor(object[key])}px; `
      })
      .join('')
  },
  toStyleObject(object) {
    Object.keys(object).map(key => (object[key] = Math.floor(object[key]) + 'px'))
    return object
  },
}

export { isSmall, isLarge, getScrollbarWidth, positioning }
