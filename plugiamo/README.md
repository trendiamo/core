# README

## Setup

```
yarn global add surge http-server
yarn
```

## Run locally

```
yarn start
hs build
ngrok http 8080
```

### Run locally on a given site (after load)

```js
// paste this on the javascript console
!(function(t, r, e, n, d, i, a, m, o) {
  var s1 = r.createElement('script'),
    s2 = r.getElementsByTagName('script')[0]
  s1.src = '//YOUR_NGROK_URL/plugiamo.js?' + Date.now()
  s2.parentNode.insertBefore(s1, s2)
})(window, document)
```

## Code checks

```
yarn eslint src
```

## Deploy

```
yarn build && yarn deploy
```

## Install on a given site

```html
<script>
!(function(t, r, e, n, d, i, a, m, o) {
  t.addEventListener('load', function() {
    var s1 = r.createElement('script'),
      s2 = r.getElementsByTagName('script')[0]
    s1.src = '//s3.eu-central-1.amazonaws.com/plugiamo/plugiamo.js'
    s2.parentNode.insertBefore(s1, s2)
  })
})(window, document)
</script>
```
