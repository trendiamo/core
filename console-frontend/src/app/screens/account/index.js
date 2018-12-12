import EditUser from './edit-user'
import EditWebsite from './edit-website'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { compose } from 'recompose'

const Section = styled.section`
  margin-bottom: 3rem;
`

const Account = () => (
  <PaperContainer>
    <Section>
      <Typography variant="h4">{'Account'}</Typography>
      <EditWebsite />
    </Section>
    <Section>
      <Typography variant="h4">{'Your Personal Info'}</Typography>
      <EditUser />
    </Section>
  </PaperContainer>
)

export default compose(withAppBarContent({ breadcrumbs: [{ text: 'Account' }] }))(Account)
