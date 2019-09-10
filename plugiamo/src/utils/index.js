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

const convertToDigits = text => {
  if (!text) return 0
  return Number(text.replace(/\D/g, ''))
}

export { isSmall, isLarge, getScrollbarWidth, convertToDigits }
