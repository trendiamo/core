import { timeout } from 'ext'

const easings = {
  linear(t) {
    return t
  },
  easeInQuad(t) {
    return t * t
  },
  easeOutQuad(t) {
    return t * (2 - t)
  },
  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  },
  easeInCubic(t) {
    return t * t * t
  },
  easeOutCubic(t) {
    return --t * t * t + 1
  },
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  },
  easeInQuart(t) {
    return t * t * t * t
  },
  easeOutQuart(t) {
    return 1 - --t * t * t * t
  },
  easeInOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
  },
  easeInQuint(t) {
    return t * t * t * t * t
  },
  easeOutQuint(t) {
    return 1 + --t * t * t * t * t
  },
  easeInOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
  },
}

const autoScroll = {
  activate({ delay, ...props }) {
    this.stopped = false
    timeout.set('autoScrollPlugin', this.startScrolling(props), delay || 10)
  },
  startScrolling({ element, destination, duration, easing, callback }) {
    return () => {
      if (this.stopped || !element) return
      this.element = element
      this.destination = destination()
      if (!this.destination) return
      this.duration = duration || 660
      this.easing = easing || 'easeInOutQuad'
      this.callback = callback
      this.calculate()
      if (!this.isAvailable()) return
      this.scroll()()
    }
  },
  calculate() {
    if (!this.element || !this.destination) return this.stop()
    this.start = this.element.scrollTop
    this.startTime = 'now' in window.performance ? performance.now() : new Date().getTime()
    const elementHeight = this.element.scrollHeight
    const windowHeight = this.element.clientHeight
    const destinationOffset = typeof this.destination === 'number' ? this.destination : this.destination.offsetTop
    this.destinationOffsetToScroll = Math.round(
      elementHeight - destinationOffset < windowHeight ? elementHeight - windowHeight : destinationOffset
    )
  },
  isAvailable() {
    if ('requestAnimationFrame' in window === false) {
      this.element.scroll(0, this.destinationOffsetToScroll)
      if (this.callback) {
        this.callback()
      }
      return
    }
    return true
  },
  stop() {
    this.stopped = true
  },
  scroll() {
    return () => {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime()
      const time = Math.min(1, (now - this.startTime) / this.duration)
      const timeFunction = easings[this.easing](time)
      const targetPosition = Math.ceil(timeFunction * (this.destinationOffsetToScroll - this.start) + this.start)
      this.element.scroll(0, targetPosition)
      let currentHeight = this.element.scrollHeight - this.element.clientHeight
      if (this.destinationOffsetToScroll > currentHeight) {
        this.destinationOffsetToScroll = currentHeight
      }

      if (this.stopped || Math.ceil(this.element.scrollTop) === this.destinationOffsetToScroll) {
        return this.callback && this.callback()
      }

      requestAnimationFrame(this.scroll())
    }
  },
}

export default autoScroll
