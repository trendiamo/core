import { authRedirect } from './utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { navTo } from 'app/utils'
// import IconLogin from 'icons/icon-login'
import React from 'react'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'

const AuthMenuItem = ({
  isComplete,
  mobile,
  logout,
  manageProducts,
  onAccountClick,
  onAccountUpgradeClick,
  onMainAccountClick,
}) => (
  <React.Fragment>
    <a
      className={mobile ? 'mobile-nav__link' : 'nav__link--sub js-header-sub-link-a'}
      href="/u/account"
      onClick={onMainAccountClick}
    >
      {'Account'}
    </a>
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
                href={isComplete ? '/u/manage-products' : '/u/create-brand-profile/1'}
                onClick={isComplete ? manageProducts : onAccountUpgradeClick}
              >
                {isComplete ? 'Manage Products' : 'Upgrade to Brand'}
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
    me: data.me,
  })),
  withState('isComplete', 'setIsComplete', ({ me }) => {
    if (me.brand) {
      return me.brand.isComplete
    } else {
      return false
    }
  }),
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
      const { auth, onAuthChange } = this.props
      auth.addAuthListener(onAuthChange)
    },
    componentWillUnmount() {
      const { auth, onAuthChange } = this.props
      auth.removeAuthListener(onAuthChange)
    },
  })
)(AuthMenuItem)
