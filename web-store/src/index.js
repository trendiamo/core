import App from 'app'
import countries from 'i18n-iso-countries'
import countriesEn from 'i18n-iso-countries/langs/en.json'
import lazySizes from 'lazysizes'
import React from 'react'
import WebFont from 'webfontloader'
import { isSnapshot, render } from 'ext/react-snapshot'
// import registerServiceWorker from './registerServiceWorker';

countries.registerLocale(countriesEn)

if (!isSnapshot) {
  WebFont.load({ google: { families: ['Yantramanav:400,500,700'] } })
  lazySizes.init()
}

render(<App />, document.getElementById('root'))
// registerServiceWorker();
