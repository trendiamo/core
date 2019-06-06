import { timeout } from 'ext'
import { useEffect, useState } from 'react'

const useIsEntering = delay => {
  const [isEntering, setIsEntering] = useState(true)
  const [timeoutName, setTimeoutName] = useState()

  useEffect(
    () => () => {
      timeout.clear(timeoutName)
    },
    [timeoutName]
  )

  useEffect(
    () => {
      const name = timeout.generateTimeoutName()
      setTimeoutName(name)
      timeout.set(name, () => setIsEntering(false), delay || 10)
    },
    [delay]
  )

  return isEntering
}

export default useIsEntering
