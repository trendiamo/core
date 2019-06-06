import { timeout } from 'ext'
import { useEffect, useState } from 'react'

const useAnimateOnMount = ({ delay, skipEntry } = {}) => {
  const [entry, setEntry] = useState(!skipEntry)

  useEffect(
    () => {
      if (skipEntry) return
      timeout.set('animateOnMount', () => setEntry(false), delay || 10)
    },
    [delay, skipEntry]
  )

  // useEffect(() => () => {
  //   console.log('useAnimateOnMount clear')
  //   timeout.clear('animateOnMount')
  // })

  return { entry }
}

export default useAnimateOnMount
