import { useEffect, useState } from 'react'

const useAnimateOnMount = ({ delay, skipEntry } = {}) => {
  const [entry, setEntry] = useState(!skipEntry)

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

  if (skipEntry) return { entry: false }

  return { entry }
}

export default useAnimateOnMount
