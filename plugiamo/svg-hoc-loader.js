// based on https://github.com/kossnocorp/desvg
// based on https://github.com/kossnocorp/hoc-loader

const exportVar = 'module.exports'

module.exports = function(source) {
  return `
  ${source}
  var h = require('preact').h
  var content = ${exportVar}.content
  var origAttributes = ${exportVar}.attributes
  var hoc = function(props) {
    var attributes = {
      viewBox: origAttributes.viewBox,
      focusable: false,
      preserveAspectRatio: 'xMidYMid',
      role: 'presentation',
    }
    return h('svg', Object.assign({ dangerouslySetInnerHTML: { __html: content } }, attributes, props))
  }
  ${exportVar} = hoc
  `
}
