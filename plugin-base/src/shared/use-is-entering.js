import { useEffect, useState } from 'react'

const useIsEntering = delay => {
  const [isEntering, setIsEntering] = useState(true)

  useEffect(
    () => {
      let didCancel = false
      setTimeout(() => {
        didCancel || setIsEntering(false)
      }, delay || 10)
      return () => (didCancel = true)
    },
    [delay]
  )

  return isEntering
}

export default useIsEntering
