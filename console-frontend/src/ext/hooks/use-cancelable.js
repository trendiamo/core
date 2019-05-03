import { useEffect, useMemo, useRef } from 'react'

const makeCancelable = originalPromise => {
  let isCanceled = false
  const promise = new Promise((resolve, reject) =>
    originalPromise
      .then(val => (isCanceled ? reject(new Error('isCanceled')) : resolve(val)))
      .catch(error => (isCanceled ? reject(new Error('isCanceled')) : reject(error)))
  )
  return {
    promise,
    cancel() {
      isCanceled = true
    },
  }
}

const useCancelable = () => {
  const promises = useRef()

  useEffect(() => {
    promises.current = promises.current || []
    return () => {
      promises.current.forEach(p => p.cancel())
      promises.current = []
    }
  }, [])

  const cancelable = useMemo(
    () => promise => {
      const cancelablePromise = makeCancelable(promise)
      promises.current.push(cancelablePromise)
      return cancelablePromise.promise
    },
    []
  )

  return cancelable
}

export default useCancelable
