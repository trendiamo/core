import Emoji from 'emoji-js'

const emoji = new Emoji()
emoji.img_sets.apple.sheet = 'https://plugin-assets.ams3.cdn.digitaloceanspaces.com/sheet_apple_32.png'
emoji.use_sheet = true

const isLinux = navigator.platform === 'Linux x86_64'
const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

// In Linux, at least the distro that we've tested, if we use emoji.replace_unified it actually breaks it, and not
// doing anything works well.
const emojify = isLinux || isIos ? str => str : str => (!str ? str : Reflect.apply(emoji.replace_unified, emoji, [str]))

// copied from https://github.com/iamcal/js-emoji/blob/master/demo/emoji.css
export const emojifyStyles = `
span.emoji {
  display: -moz-inline-box;
  -moz-box-orient: vertical;
  display: inline-block;
  vertical-align: baseline;
  *vertical-align: auto;
  *zoom: 1;
  *display: inline;
  width: 1em;
  height: 1em;
  background-size: 1em;
  background-repeat: no-repeat;
  text-indent: -9999px;
  background-position: 50%, 50%;
  background-size: contain;
}

span.emoji-sizer {
  line-height: 0.81em;
  font-size: 1em;
  margin: -2px 0;
}

span.emoji-outer {
  display: -moz-inline-box;
  display: inline-block;
  *display: inline;
  height: 1em;
  width: 1em;
}

span.emoji-inner {
  display: -moz-inline-box;
  display: inline-block;
  text-indent: -9999px;
  width: 100%;
  height: 100%;
  vertical-align: baseline;
  *vertical-align: auto;
  *zoom: 1;
}

img.emoji {
  width: 1em;
  height: 1em;
}
`

export default emojify
