import { authRedirect } from './utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { navTo } from 'app/utils'
// import IconLogin from 'icons/icon-login'
import React from 'react'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps } from 'recompose'

const AuthMenuItem = ({
  isBrandProfileComplete,
  mobile,
  logout,
  manageProducts,
  onAccountClick,
  onAccountUpgradeClick,
  onMainAccountClick,
}) => (
  <React.Fragment>
    {mobile ? (
      <a className="mobile-nav__link" href="/u/account" onClick={onMainAccountClick}>
        <span className={isBrandProfileComplete ? '' : ' nav__link--hl'}>{'Account'}</span>
      </a>
    ) : (
      <a
        className={`nav__link--sub js-header-sub-link-a${isBrandProfileComplete || ' nav__link--hl'}`}
        href="/u/account"
        onClick={onMainAccountClick}
      >
        {'Account'}
      </a>
    )}
    {mobile || (
      <div className="nav__sub" id="sub-account">
        <div className="nav__sub-wrap">
          <ul className="nav__sub__items o-list-bare">
            <li className="nav__sub__item">
              <a className="nav__sub__link" href="/account" onClick={onAccountClick}>
                {'Account'}
              </a>
            </li>
            <li className="nav__sub__item">
              <a
                className="nav__sub__link"
                href={isBrandProfileComplete ? '/u/manage-products' : '/u/create-brand-profile/1'}
                onClick={isBrandProfileComplete ? manageProducts : onAccountUpgradeClick}
              >
                {isBrandProfileComplete ? 'Manage Products' : 'Set up business profile'}
              </a>
            </li>
            <li className="nav__sub__item">
              <a className="nav__sub__link" href="/account/logout" onClick={logout}>
                {'Log out'}
              </a>
            </li>
          </ul>
        </div>
      </div>
    )}
  </React.Fragment>
)

const me = gql`
  query {
    me {
      brand {
        id
        isComplete
      }
    }
  }
`

export default compose(
  graphql(me, { options: { fetchPolicy: 'network-only' } }),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    isBrandProfileComplete: data.me && data.me.brand && data.me.brand.isComplete,
    me: data.me,
  })),
  withHandlers({
    logout: ({ auth }) => event => {
      event.preventDefault()
      auth.clear()
      window.location = '/'
    },
    manageProducts: () => event => {
      event.preventDefault()
      navTo('/u/manage-products')
    },
    onAccountClick: () => event => {
      event.preventDefault()
      window.$.magnificPopup.close()
      authRedirect()
    },
    onAccountUpgradeClick: () => event => {
      event.preventDefault()
      navTo('/u/create-brand-profile/1')
    },
    onAuthChange: () => isLoggedIn => {
      if (!isLoggedIn) location.reload()
    },
    onBrandInfoComplete: ({ setIsComplete }) => authMetadata => {
      if (authMetadata.isBrandProfileComplete) {
        setIsComplete(authMetadata.isBrandProfileComplete)
      }
    },
    onMainAccountClick: ({ mobile }) => event => {
      event.preventDefault()
      if (mobile) {
        window.$.magnificPopup.close()
        authRedirect()
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const { auth, onAuthChange, onBrandInfoComplete } = this.props
      auth.addAuthListener(onAuthChange)
      auth.addAuthListener(onBrandInfoComplete)
    },
    componentWillUnmount() {
      const { auth, onAuthChange, onBrandInfoComplete } = this.props
      auth.removeAuthListener(onAuthChange)
      auth.removeAuthListener(onBrandInfoComplete)
    },
  })
)(AuthMenuItem)
