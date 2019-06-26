import emojifyPromise from 'ext/emojify'
import { useEffect, useState } from 'preact/hooks'

const useEmojify = () => {
  const [emojifyState, setEmojifyState] = useState({ fn: null })
  useEffect(() => emojifyPromise.then(fn => setEmojifyState({ fn, loaded: true })), [])

  return emojifyState.fn
}

export default useEmojify
