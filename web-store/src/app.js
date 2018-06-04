import css from './shared/style'
import Helmet from 'react-helmet'
import Legal from './screens/legal'
import NoMatch from './screens/no-match'
import Pdp from './screens/pdp'
import Plp from './screens/plp'
import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

const App = () => (
  <Router>
    <React.Fragment>
      <Helmet style={[{ cssText: css }]} />
      <Switch>
        <Route component={Plp} exact path="/" />
        <Route component={Pdp} path="/products/:id" />
        <Route component={Legal} path="/legal/:id" />
        <Route component={NoMatch} />
      </Switch>
    </React.Fragment>
  </Router>
)

// <Route component={Home} exact path="/" />
// <Route component={PLP} path="/collections/:handle" />
// <Route component={PDP} path="/collections/:handle/products/:productName" />

export default App
