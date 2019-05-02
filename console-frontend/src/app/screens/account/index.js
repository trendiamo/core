import auth from 'auth'
import EditUser from './edit-user'
import EditWebsite from './edit-website'
import React from 'react'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'

const Account = () => {
  useAppBarContent({ title: 'Account' })
  return (
    <>
      <Section title="Account">
        <EditWebsite />
      </Section>
      {!auth.isAdmin() && (
        <Section title="Your Personal Info">
          <EditUser />
        </Section>
      )}
    </>
  )
}

export default Account
