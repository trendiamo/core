const loadScript = src =>
  new Promise(resolve => {
    let done = false
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = src
    script.onload = script.onreadystatechange = () => {
      if (!done && (!this.readyState || this.readyState === 'complete')) {
        done = true
        resolve(window.paypal)
      }
    }
    document.body.appendChild(script)
  })

export default loadScript
