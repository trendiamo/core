import auth from 'auth'
import EditUser from './edit-user'
import EditWebsite from './edit-website'
import React from 'react'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'

const appBarContent = { title: 'Account' }

const Account = () => {
  useAppBarContent(appBarContent)
  return (
    <>
      {(auth.isAdmin() || auth.getUser().role !== 'editor') && (
        <Section title="Account">
          <EditWebsite />
        </Section>
      )}
      {!auth.isAdmin() && (
        <Section title="Your Personal Info">
          <EditUser />
        </Section>
      )}
    </>
  )
}

export default Account
