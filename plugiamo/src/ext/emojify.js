const isLinux = navigator.platform === 'Linux x86_64'
const isMac = navigator.platform === 'MacIntel'
const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

// In Linux, at least the distro that we've tested, if we use emoji.replace_unified it actually breaks it, so we don't
// use it there. In ios and mac it also just works.
const nativeEmojiSupported = isLinux || isIos || isMac

// css copied from https://github.com/iamcal/js-emoji/blob/master/demo/emoji.css
export const emojifyStyles = nativeEmojiSupported
  ? ''
  : `
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

const compatEmojifyFactory = async () => {
  const Emoji = await import(/* webpackChunkName: "emoji" */ 'emoji-js')
  const emoji = new Emoji.default()
  emoji.img_sets.apple.sheet = 'https://plugin-assets.ams3.cdn.digitaloceanspaces.com/sheet_apple_32.png'
  emoji.use_sheet = true

  return str => (str ? Reflect.apply(emoji.replace_unified, emoji, [str]) : str)
}

const noOpEmojify = new Promise(resolve => resolve(str => str))

const emojifyPromise = nativeEmojiSupported ? noOpEmojify : compatEmojifyFactory()

export default emojifyPromise
