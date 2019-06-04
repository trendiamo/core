import LauncherBubbleFrame from './launcher-bubble-frame'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ChatBubbleBase, Container } from './components'
import { rollDuration } from './utils'
import { timeout } from 'ext'

const LauncherBubble = ({
  disappear,
  isFirst,
  frameStyleStr,
  hasMoreThanOneBubble,
  message,
  launcherConfig,
  offset,
  onClick,
  position,
  timeEnd,
}) => {
  const [timeEnded, setTimeEnded] = useState(false)
  const [animation, setAnimation] = useState(null)
  const [textWidth, setTextWidth] = useState(0)
  const [elevation, setElevation] = useState(false)

  const bubbleTimeoutId = useMemo(() => `chatBubble${isFirst || 'Extra'}`, [isFirst])

  const reset = useCallback(
    () => {
      timeout.clear(bubbleTimeoutId)
      setTimeEnded(false)
      setTextWidth(0)
      setElevation(false)
      setAnimation('roll')
    },
    [bubbleTimeoutId]
  )

  const timeoutSet = useCallback(
    (fn, time) => {
      timeout.set(bubbleTimeoutId, fn, time)
    },
    [bubbleTimeoutId]
  )

  useEffect(
    () => {
      reset()

      if (!timeEnd) return
      timeoutSet(() => {
        setAnimation('unroll')
      }, (timeEnd - (isFirst ? 0 : 1.3)) * 1000)
      timeoutSet(() => {
        setTimeEnded(true)
      }, (timeEnd + rollDuration - (isFirst ? 0 : 1.3)) * 1000)
    },
    [isFirst, reset, timeoutSet, timeEnd]
  )

  useEffect(
    () => {
      if (isFirst) setElevation(hasMoreThanOneBubble)
    },
    [isFirst, hasMoreThanOneBubble]
  )

  if (timeEnded) return null

  return (
    <LauncherBubbleFrame
      animation={animation}
      disappear={disappear}
      elevation={elevation}
      launcherConfig={launcherConfig}
      offset={offset}
      position={position}
      styleStr={frameStyleStr}
      textWidth={textWidth}
    >
      <Container onClick={onClick}>
        <ChatBubbleBase message={message} setTextWidth={setTextWidth} textWidth={textWidth} />
      </Container>
    </LauncherBubbleFrame>
  )
}

export default LauncherBubble
