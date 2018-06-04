import App from './app'
import React from 'react'
import { render } from './react-snapshot'
import WebFont from 'webfontloader'
import 'lazysizes'
// import registerServiceWorker from './registerServiceWorker';

WebFont.load({ google: { families: ['Yantramanav:400,500,700'] } })
render(<App />, document.getElementById('root'))
// registerServiceWorker();
