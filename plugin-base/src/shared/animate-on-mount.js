import { useEffect, useState } from 'react'

const useAnimateOnMount = ({ delay, skipEntry } = {}) => {
  const [entry, setEntry] = useState(!skipEntry)

  useEffect(
    () => {
      if (skipEntry) return
      let didCancel = false
      setTimeout(() => {
        didCancel || setEntry(false)
      }, delay || 10)
      return () => (didCancel = true)
    },
    [delay, skipEntry]
  )

  return { entry }
}

export default useAnimateOnMount
