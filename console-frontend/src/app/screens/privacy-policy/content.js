const content =
  '<a href="https://www.iubenda.com/privacy-policy/89514409" class="iubenda-white no-brand iubenda-embed iub-body-embed" title="Privacy Policy">Privacy Policy</a>'

const load_content = (w, d) => {
  var loader = function() {
    var s = d.createElement('script'),
      tag = d.getElementsByTagName('script')[0]
    s.src = 'https://cdn.iubenda.com/iubenda.js'
    tag.parentNode.insertBefore(s, tag)
  }
  if (w.addEventListener) {
    w.addEventListener('load', loader, false)
  } else if (w.attachEvent) {
    w.attachEvent('onload', loader)
  } else {
    w.onload = loader
  }
}

load_content(window, document)

export default content
