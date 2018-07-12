import App from 'app'
import countries from 'i18n-iso-countries'
import countriesEn from 'i18n-iso-countries/langs/en.json'
import lazySizes from 'lazysizes'
import React from 'react'
import smoothscroll from 'smoothscroll-polyfill'
import WebFont from 'webfontloader'
import { isSnapshot, render } from 'ext/react-snapshot'

// import registerServiceWorker from './registerServiceWorker'

countries.registerLocale(countriesEn)

if (!isSnapshot) {
  WebFont.load({ google: { families: ['Yantramanav:400,500,700'] } })
  lazySizes.init()
  smoothscroll.polyfill()
}

render(<App />, document.getElementById('root'))
// registerServiceWorker();
