import { useEffect, useState } from 'react'

const useAnimateOnMount = ({ delay } = {}) => {
  const [entry, setEntry] = useState(true)

  useEffect(
    () => {
      let didCancel = false
      setTimeout(() => {
        didCancel || setEntry(false)
      }, delay || 10)
      return () => (didCancel = true)
    },
    [delay]
  )

  return { entry }
}

export default useAnimateOnMount
