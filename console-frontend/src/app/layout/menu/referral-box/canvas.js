import React, { useEffect, useRef } from 'react'

const canvasDimensions = { width: 218, height: 175 }
const confettiPadding = 10 // controls horizontal offset of the area inside canvas where the confetti shold be generated
const confettiPerSecond = 2
const framesPerSecond = 20
const confettiLifespan = 5000
const confettiVerticalSpeed = 2 // pixels per frame (on Y axis)
const canvasBackgroundColor = '#fff'
const confettiXFrequency = 100
const confettiAmplitude = 2

const getRandomHSLColor = () => {
  const isYellow = !!Math.round(Math.random())
  const hue = isYellow ? Math.random() * 20 + 40 : Math.random() * 20 + 170
  const saturation = 85
  const lightness = 48
  const alpha = Math.random() * 0.2 + 0.2
  return `hsla(${hue},${saturation}%,${lightness}%,${alpha})`
}

const runConfettiAnimation = ({ canvasElement }) => {
  const ctx = canvasElement.getContext('2d')

  let confettiList = []
  let confettiCounter = 0

  // In order not to run calculations on every piece and every step we make those pre-calculations
  const confettiXFrequencyDivided2 = confettiXFrequency / 2
  const confettiXFrequencyDivided4 = confettiXFrequency / 4

  const createNewConfetti = ({ ctx }) => ({
    width: 12,
    length: 8,
    color: getRandomHSLColor(),
    position: {
      x: Math.round(Math.random() * (canvasDimensions.width - confettiPadding * 2) + confettiPadding),
      y: -12,
    },
    rotation: Math.random() * 360,
    offsetX: 0,
    offsetXAcceleration: 0,
    verticalSpeed: confettiVerticalSpeed,
    step() {
      // Here we mix in the this.rotation in order to give the piece more randomization in the X axis movements.
      const movementDeterminor = (this.position.y + this.rotation) % confettiXFrequency
      const movementFunction =
        Math.abs(movementDeterminor - confettiXFrequencyDivided2) / confettiXFrequencyDivided4 - 1
      this.offsetXAcceleration = movementFunction * confettiAmplitude
      this.offsetX = this.offsetXAcceleration
      this.position.x += this.offsetX
      this.position.y += this.verticalSpeed
    },
    render() {
      ctx.save()
      ctx.beginPath()
      ctx.translate(this.position.x, this.position.y)
      ctx.rotate((this.rotation * 3.14159) / 180)
      ctx.rect(0, 0, this.width, this.length)
      ctx.fillStyle = this.color
      ctx.fill()
      ctx.restore()
    },
  })

  const step = () => {
    confettiCounter += confettiPerSecond / framesPerSecond
    if (confettiCounter > 1) {
      for (let i = 0; i < Math.floor(confettiCounter); i++) {
        const newConfetti = createNewConfetti({ ctx })
        confettiList.push(newConfetti)
        window.setTimeout(() => confettiList.shift(), confettiLifespan)
      }
    }

    if (confettiCounter > 1) confettiCounter = 0

    confettiList.forEach(flake => {
      flake.step()
    })
    render()
  }

  const render = () => {
    ctx.fillStyle = canvasBackgroundColor
    ctx.fillRect(0, 0, canvasDimensions.width, canvasDimensions.height)

    confettiList.forEach(flake => {
      flake.render(ctx)
    })
  }

  window.confettiAnimation = window.setInterval(step, Math.floor(1000 / framesPerSecond))
}

const confettiStopAnimation = () => {
  window.clearInterval(window.confettiAnimation)
}

const Canvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    runConfettiAnimation({ canvasElement: canvasRef.current })
    return confettiStopAnimation
  }, [])

  return <canvas height={canvasDimensions.height} ref={canvasRef} width={canvasDimensions.width} />
}

export default Canvas
