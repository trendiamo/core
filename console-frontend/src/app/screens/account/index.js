import { Authenticated } from 'react-admin'
import { compose } from 'recompose'
import CssBaseline from '@material-ui/core/CssBaseline'
import EditUser from './edit-user'
import EditWebsite from './edit-website'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import withRaTitle from 'ext/recompose/with-ra-title'
import { Main, StyledPaper } from '../shared'

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
`

const Section = styled.section`
  margin-bottom: 3rem;
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
      <Section>
        <Typography variant="display1">{'Your Personal Info'}</Typography>
        <EditUser />
      </Section>
      <Section>
        <Typography variant="display1">{'Your Website'}</Typography>
        <EditWebsite />
      </Section>
    </AccountLayout>
  </Authenticated>
)

export default compose(withRaTitle('Account'))(Account)
