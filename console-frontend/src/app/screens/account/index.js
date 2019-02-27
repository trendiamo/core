import EditUser from './edit-user'
import EditWebsite from './edit-website'
import React from 'react'
import Section from 'shared/section'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { compose } from 'recompose'

const Account = () => (
  <>
    <Section title="Account">
      <EditWebsite />
    </Section>
    <Section title="Your Personal Info">
      <EditUser />
    </Section>
  </>
)

export default compose(withAppBarContent({ title: 'Account' }))(Account)
