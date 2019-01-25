// handles shared element transitions
// roughly based on https://medium.com/@prateekbh/shared-elements-transitions-for-web-6fa9d31d4d6a

const transition = {
  addElement(key, element) {
    this.elements = { ...this.elements, [key]: { element } }
  },
  clear() {
    Object.keys(this.elements).forEach(k => {
      const item = this.elements[k]
      if (item) {
        if (item.element) item.element.style.visibility = 'visible'
        if (item.landingElement) item.landingElement.style.visibility = 'visible'
      }
    })
    this.isLiftingElements = false
    this.elements = {}
    if (this.ghostElement) this.ghostElement.innerHTML = ''
  },
  duration: 300,
  elements: {},
  ghostElement: null,
  isLiftingElements: false,
  landElement(key, landingElement) {
    if (!this.elements[key]) return

    landingElement.style.visibility = 'hidden'
    this.elements[key].landingElement = landingElement

    // use transform for positions and dimensions, as it's optimized:
    const liftedElement = this.elements[key].liftedElement
    const liftedRect = liftedElement.getBoundingClientRect()
    const landingRect = landingElement.getBoundingClientRect()
    const topOffest = landingRect.top - liftedRect.top - (liftedRect.height - landingRect.height) / 2
    const leftOffest = landingRect.left - liftedRect.left - (liftedRect.width - landingRect.width) / 2
    const scaleOffsetX = landingRect.width / liftedRect.width
    const scaleOffsetY = landingRect.height / liftedRect.height
    liftedElement.style.transform = `translateY(${topOffest}px) translateX(${leftOffest}px) scale(${scaleOffsetX},${scaleOffsetY})`

    // reflect some of the unoptimized props as well:
    const style = getComputedStyle(landingElement)
    Object.keys(style).forEach(key => {
      if (!['borderRadius', 'color'].includes(key)) return
      liftedElement.style[key] = style[key]
    })
  },
  liftElements() {
    if (this.isLiftingElements) return
    this.isLiftingElements = true
    Object.keys(this.elements).forEach(k => {
      const element = this.elements[k].element
      const rect = element.getBoundingClientRect()
      const liftedElement = element.cloneNode(true)
      const scrollTop = element.ownerDocument.querySelector('body > div').scrollTop
      liftedElement.style.position = 'absolute'
      liftedElement.style.top = `${rect.top + scrollTop}px`
      liftedElement.style.left = `${rect.left}px`
      liftedElement.style.height = `${rect.height}px`
      liftedElement.style.width = `${rect.width}px`
      liftedElement.style.transitionDuration = `${this.duration}ms`
      liftedElement.style.transitionTimingFunction = 'ease-out'
      liftedElement.style.visibility = 'visible'
      liftedElement.style.zIndex = '42000'
      this.ghostElement.appendChild(liftedElement)
      this.elements[k].liftedElement = liftedElement
      setTimeout(() => {
        // doing it directly, or even using requestAnimationFrame results in a flickering element, so we use setTimeout
        if (element && element.style) element.style.visibility = 'hidden'
      }, 20)
    })
  },
  setGhostRef(ref) {
    if (ref) this.ghostElement = ref.base || ref
  },
}

transition.addElement = transition.addElement.bind(transition)
transition.setGhostRef = transition.setGhostRef.bind(transition)

export default transition
