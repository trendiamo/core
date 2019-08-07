const history = {
  addListener(callback) {
    this.callbacks.push(callback)
  },
  callbacks: [],
  location: '/',
  removeListener(callback) {
    this.callbacks = this.callbacks.filter(e => e !== callback)
  },
  replace(url) {
    const iframe = document.querySelector('iframe[title="Frekkls Content"]')
    if (iframe && iframe.contentWindow && iframe.contentWindow.customWindow && iframe.contentWindow.customWindow._mfq) {
      setTimeout(() => {
        console.log('HISTORY: ', url)
        iframe.contentWindow.customWindow._mfq.push(['newPageView', url])
        iframe.contentWindow.customWindow._mfq.push(['setVariable', 'hostname', 'b.com'])
        // iframe.contentWindow.customWindow.location.href = 'https://708a6bc4.ngrok.io' + url + '?hostname=final11.com'
        // iframe.contentWindow.customWindow.location.pathname = url
        // iframe.contentWindow.customWindow.location.search = '?mf_debug=1&hostname=final11.com'
        console.log('window.location', iframe.contentWindow.customWindow.location)
        // iframe.contentWindow.customWindow.mouseflow.start()
      }, 600)
      // iframe.contentWindow.customWindow.mouseflow.stop()
    }
    this.location = url
    this.callbacks.forEach(callback => callback(url))
  },
}

export default history
