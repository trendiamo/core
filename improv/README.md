# README

## Run locally

```sh
yarn start
```

## Upload products

```sh
yarn upload-data
```

## Deploy

```sh
yarn deploy
```

## Include it in a website

```js
var s1 = document.createElement('script'),
  s2 = document.getElementsByTagName('script')[0]
s1.src = 'https://improv.ams3.digitaloceanspaces.com/improv/improv.js?' + Date.now()
s2.parentNode.insertBefore(s1, s2)
```

## Code checks

```
yarn eslint src
```
