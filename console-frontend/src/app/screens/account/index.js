import { Authenticated } from 'react-admin'
import { compose } from 'recompose'
import CssBaseline from '@material-ui/core/CssBaseline'
import EditWebsite from './edit-website'
import React from 'react'
import styled from 'styled-components'
import withRaTitle from 'ext/recompose/with-ra-title'
import { Main, StyledPaper } from '../shared'

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
`

const AccountLayout = ({ children }) => (
  <React.Fragment>
    <CssBaseline />
    <Main>
      <StyledPaper>
        <StyledDiv>{children}</StyledDiv>
      </StyledPaper>
    </Main>
  </React.Fragment>
)

const Account = ({ location }) => (
  <Authenticated location={location}>
    <AccountLayout>
      <EditWebsite />
    </AccountLayout>
  </Authenticated>
)

export default compose(withRaTitle('Account'))(Account)
