import Helmet from 'react-helmet'
import React from 'react'
import styled from 'styled-components'

const StyledIframe = styled.iframe`
  border: 0;
  display: block;
  height: 100vh;
  width: 100vw;
`

const Home = () => (
  <React.Fragment>
    <Helmet style={[{ cssText: 'body{margin:0}' }]} />
    <StyledIframe src="https://trendiamo.com/" />
  </React.Fragment>
)

export default Home
