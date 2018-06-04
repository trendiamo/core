import css from './style'
import Footer from './footer'
import Header from './header'
import Helmet from 'react-helmet'
import Home from './home'
import React from 'react'
import styled from 'styled-components'
import { Route, BrowserRouter as Router } from 'react-router-dom'
const Content = styled.div`
  margin-top: 80px;
  flex: auto;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const shelled = WrappedComponent => {
  const Shell = () => (
    <Container>
      <Helmet style={[{ cssText: css }]} />
      <Header />
      <Content>{WrappedComponent}</Content>
      <Footer />
    </Container>
  )
  return Shell
}

const PLP = shelled(<h1>{'Collection'}</h1>)
const PDP = shelled(<h1>{'Product'}</h1>)

const App = () => (
  <Router>
    <React.Fragment>
      <Route component={Home} exact path="/" />
      <Route component={PLP} path="/collections/:handle" />
      <Route component={PDP} path="/collections/:handle/products/:productName" />
    </React.Fragment>
  </Router>
)

export default App
