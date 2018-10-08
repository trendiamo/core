# README

## Setup

```
brew install awscli # for deploys
yarn global add http-server
yarn
touch .env # and then edit it to add needed variables
touch build/index.html # and then edit it to add a basic html template and the plugin script
```

## Run locally

```sh
yarn start
hs build
```

### Run locally on a given site (manually after it loads)

```sh
ngrok http 8080
```

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

## Storybook

https://storybook.js.org/

```
yarn run storybook
```

## Deploy

```
yarn deploy
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

## How to do experiments on Optimizely

```js
import Experiment from 'shared/experiment'
import Variant from 'shared/variant'

<Experiment experimentName="experience_name_on_optimizely">
  <Variant variantName="variation0_name_on_optimezely">
    <Button fullWidth onClick={onCtaClick}>
      {exposition.ctaText}
    </Button>
  </Variant>
  <Variant variantName="variation0_name_on_optimezely">
    <Button fullWidth onClick={onCtaClick} style={{ color: 'red' }}>
      {exposition.ctaText}
    </Button>
  </Variant>
</Experiment>
```

## Links to open plugin

If you want to have a link that auto-opens the plugin, you need to add to the hash part of the url.

For example, if you have the following link:

`https://www.engelhorn.de/f/produkte/39713117.html`

And you want to open the plugin on it, then you want this:

`https://www.engelhorn.de/f/produkte/39713117.html#trnd:/`

If the url already has some hash based params, like this:

`https://www.engelhorn.de/f/produkte/39713117.html#cart-open1,13`

Then you want to do this:

`https://www.engelhorn.de/f/produkte/39713117.html#cart-open1,13&trnd:/`

If you want to open something other than the root page, simply change the path part of, for example to:

`trnd:/spotlight/cjmrwnrejltva0932ru7mwa4k`
