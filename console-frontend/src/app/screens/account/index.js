import EditUser from './edit-user'
import EditWebsite from './edit-website'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import withRaTitle from 'ext/recompose/with-ra-title'
import { compose } from 'recompose'

const Section = styled.section`
  margin-bottom: 3rem;
`

const Account = () => (
  <PaperContainer>
    <Section>
      <Typography variant="h4">{'Your Personal Info'}</Typography>
      <EditUser />
    </Section>
    <Section>
      <Typography variant="h4">{'Your Website'}</Typography>
      <EditWebsite />
    </Section>
  </PaperContainer>
)

export default compose(withRaTitle('Account'))(Account)
