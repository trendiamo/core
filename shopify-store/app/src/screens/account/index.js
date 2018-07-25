import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'

const Account = ({ email, logout }) => (
  <React.Fragment>
    <section className="section section--account account account--main">
      <div className="container container--tiny">
        <div className="section__title section__title--center section__title--desc">
          <h1 className="section__title-text h2">{'My Account'}</h1>
          <p className="section__title-desc">{`You are logged in as ${email}`}</p>
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
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    email: data.me.email,
  })),
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
