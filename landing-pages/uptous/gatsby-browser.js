const loadJs = src =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })

export const onClientEntry = async () => {
  await loadJs('//js.hsforms.net/forms/v2.js')
  if (typeof IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
}
