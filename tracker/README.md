# README

## Setup

```
brew install awscli # for deploys
yarn
touch .env # and then edit it to add needed variables
touch build/index.html # and then edit it to add a basic html template and the plugin script
```

## Run locally

```sh
yarn start
```

### Run locally on a given site (manually after it loads)

```sh
ngrok http 8080
```

```js
// paste this on the javascript console
!(function(d) {
  var s1 = d.createElement('script'),
    s2 = d.getElementsByTagName('script')[0]
  s1.src = '//YOUR_NGROK_URL/tracker.js?' + Date.now()
  s2.parentNode.insertBefore(s1, s2)
})(document)
```

## Code checks

```
yarn eslint src
```

## Deploy

```
yarn staging-deploy
yarn deploy
```

## Install on a given site

```html
<script>
  !(function(f, r, e, k, k, l, s) {
    function load() {
      var s1 = r.createElement('script'),
        s2 = r.getElementsByTagName('script')[0]
      s1.src = 'https://js.frekkls.com/tracker.js'
      s1.charset = 'utf-8'
      s2.parentNode.insertBefore(s1, s2)
    }
    r.readyState === 'complete' ? load() : f.addEventListener('load', load)
  })(window, document)
</script>
```
