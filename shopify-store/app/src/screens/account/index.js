import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import React from 'react'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { checkAuthError, treatAuthError } from 'auth/utils'

const Account = ({ email, logout }) => (
  <React.Fragment>
    <Helmet>
      <title>{'My Account'}</title>
    </Helmet>
    <section className="section section--account account account--main">
      <div className="container container--tiny">
        <div className="section__title section__title--center section__title--desc">
          <h1 className="section__title-text h2">{'My Account'}</h1>
          <p className="section__title-desc">{`You are logged in as ${email}`}</p>
          <Link to="/u/create-brand-profile/1">{'Set up business profile'}</Link>
          <p className="section__title-desc">
            <a className="link" href="/account/logout" onClick={logout}>
              {'Log out'}
            </a>
          </p>
        </div>
      </div>
    </section>
  </React.Fragment>
)

export default compose(
  graphql(
    gql`
      query {
        me {
          email
        }
      }
    `
  ),
  branch(checkAuthError, treatAuthError),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    email: data.me.email,
  })),
  // If we're only showing email, we could have the following instead of the gql request:
  // withProps(({ auth }) => ({
  //   email: auth.email,
  // })),
  withHandlers({
    logout: ({ auth }) => event => {
      event.preventDefault()
      auth.clear()
      window.location = '/'
    },
  })
)(Account)
