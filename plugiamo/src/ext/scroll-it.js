const scrollIt = (element, destination, duration = 660, easing = 'easeOutQuad', callback) => {
  // Predefine list of available timing functions
  // If you need more, tween js is full of great examples
  // https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L421-L737
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

  // Store initial position of a window and time
  // If performance is not available in your browser
  // It will fallback to new Date().getTime() - thanks IE < 10
  const start = element.scrollTop
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime()

  // Take height of element and document to sesolve max scrollable value
  // Prevent requestAnimationFrame() from scrolling below maximum scollable value
  // Resolve destination type (node or number)
  const elementHeight = element.scrollHeight
  const windowHeight = element.clientHeight
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop
  let destinationOffsetToScroll = Math.round(
    elementHeight - destinationOffset < windowHeight ? elementHeight - windowHeight : destinationOffset
  )

  // If requestAnimationFrame is not supported
  // Move element to destination position and trigger callback function
  if ('requestAnimationFrame' in window === false) {
    element.scroll(0, destinationOffsetToScroll)
    if (callback) {
      callback()
    }
    return
  }

  // function resolves position of a element and moves to exact amount of pixels
  // Resolved by calculating delta and timing function choosen by user
  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime()
    const time = Math.min(1, (now - startTime) / duration)
    const timeFunction = easings[easing](time)
    element.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start))

    // Stop requesting animation when element reached its destination
    // And run a callback function
    let currentHeight = element.scrollHeight - element.clientHeight
    if (destinationOffsetToScroll > currentHeight) {
      destinationOffsetToScroll = currentHeight
    }
    if (Math.ceil(element.scrollTop) === destinationOffsetToScroll) {
      if (callback) {
        callback()
      }
      return
    }

    // If element still needs to scroll to reach destination
    // Request another scroll invokation
    requestAnimationFrame(scroll)
  }

  // Invoke scroll and sequential requestAnimationFrame
  scroll()
}

export default scrollIt
