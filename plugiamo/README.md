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

## Code checks

```
yarn eslint src
```

## Deploy

```
yarn deploy
```

## Install locally on a given site

```js
!(function(t, r, e, n, d, i, a, m, o) {
  t.addEventListener('load', function() {
    var s1 = r.createElement('script'),
      s2 = r.getElementsByTagName('script')[0]
    s1.src = '//YOUR_NGROK_URL/plugiamo.js?' + Date.now()
    s2.parentNode.insertBefore(s1, s2)
  })
})(window, document)
```

## Run locally on a given site (after load)

```js
!(function(t, r, e, n, d, i, a, m, o) {
  var s1 = r.createElement('script'),
    s2 = r.getElementsByTagName('script')[0]
  s1.src = '//YOUR_NGROK_URL/plugiamo.js?' + Date.now()
  s2.parentNode.insertBefore(s1, s2)
})(window, document)
```

## Install on a given site

```js
!(function(t, r, e, n, d, i, a, m, o) {
  t.addEventListener('load', function() {
    var s1 = r.createElement('script'),
      s2 = r.getElementsByTagName('script')[0]
    s1.src = '//trendiamo.com/plugiamo.js'
    s2.parentNode.insertBefore(s1, s2)
  })
})(window, document)
```
