# README

## Run locally

```sh
yarn start
```

## Include it in a website

```js
var s1 = document.createElement('script'),
  s2 = document.getElementsByTagName('script')[0]
s1.src = '<YOUR_NGROK_URL>/improv.js?' + Date.now()
s2.parentNode.insertBefore(s1, s2)
```

## Code checks

```
yarn eslint src
```
