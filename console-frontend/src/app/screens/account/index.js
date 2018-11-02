import AppLayout from 'app/app-layout'
import { Authenticated } from 'react-admin'
import { compose } from 'recompose'
import EditUser from './edit-user'
import EditWebsite from './edit-website'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import withRaTitle from 'ext/recompose/with-ra-title'

const Section = styled.section`
  margin-bottom: 3rem;
`

const Account = ({ location }) => (
  <Authenticated location={location}>
    <AppLayout>
      <Section>
        <Typography variant="display1">{'Your Personal Info'}</Typography>
        <EditUser />
      </Section>
      <Section>
        <Typography variant="display1">{'Your Website'}</Typography>
        <EditWebsite />
      </Section>
    </AppLayout>
  </Authenticated>
)

export default compose(withRaTitle('Account'))(Account)
