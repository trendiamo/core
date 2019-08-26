import { useCallback, useEffect, useState } from 'react'

const useParallax = ({ ref, scrollRatio = -0.2 }) => {
  const [img, setImg] = useState(null)

  const trySetImg = useCallback(() => {
    if (!ref.current || !ref.current.imageRef || !ref.current.imageRef.current) return
    setImg(ref.current.imageRef.current)
  }, [ref])

  useEffect(() => {
    window.setTimeout(trySetImg, 250) // in browsers other than chrome, the element is only available after a delay
    trySetImg() // in chrome this works immediately, so do it immediately to avoid a flicker
    window.addEventListener('scroll', trySetImg) // for lazyloaded images below the fold, we resort to this
  }, [ref, trySetImg])

  useEffect(() => {
    if (!img) return
    const top = window.pageYOffset + img.getBoundingClientRect().top
    window.addEventListener('scroll', () => {
      img.style.top = `${(top - window.pageYOffset) * scrollRatio}px`
    })
  }, [img, scrollRatio])
}

export default useParallax
