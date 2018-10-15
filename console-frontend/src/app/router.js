// import { withRouter } from 'react-router'
// // import { Route, BrowserRouter, Switch } from 'react-router-dom'
// import { compose, lifecycle } from 'recompose'
// import ReactDOM from 'react-dom';
// import React from 'react';
// import App from '../app';
// import Hello from './hello'
// import * as auth0 from 'auth0-js'
// import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
//
//
// var authClient = new auth0.WebAuth({
//   domain: "trendiamotest.eu.auth0.com",
//   clientID: "hYoRAaXXYH4megwBFLbpgxPvndVPEnkI",
// });

// kept causing the infinite loop because of the callback to localhost which rerendered the app
// working on react router to callback to another url
// authClient.authorize({
//   audience: 'https://mystore.com/api/v2',
//   scope: 'read:order write:order',
//   responseType: 'token',
//   redirect_uri: 'http://localhost:9000/',
// });
// const ExposeNav = compose(
//   withRouter,
//   lifecycle({
//     componentDidMount() {
//       const { history } = this.props
//       window.__reactRouterHistory = history
//     },
//     componentWillUnmount() {
//       delete window.__reactRouterHistory
//     },
//   })
// )(() => null)
// const basename = process.env.ROUTER_BASENAME || '/home'
// const AppRouter = () => (
//   <Router>
//     {/* <withRouter> */}
//     {/* <ExposeNav /> */}
//       <Switch>
//         <Route exac path="/" render={() => <App />} />
//         <Route exac path="/hello" render={() => <Hello />} />
//       </Switch>
//   </Router>
// )
//
// export default () => {
//   const RootContainer = document.getElementById("root");
//   withRouter(AppRouter)
//   ReactDOM.render(<AppRouter />, RootContainer)
// }
