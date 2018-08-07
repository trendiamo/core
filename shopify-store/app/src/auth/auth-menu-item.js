import { authRedirect } from './utils'
import { navTo } from 'app/utils'
// import IconLogin from 'icons/icon-login'
import React from 'react'
import { compose, lifecycle, withHandlers, withState } from 'recompose'

const AuthMenuItem = ({ isLoggedIn, mobile, logout, onAccountClick, onAccountUpgradeClick, onMainAccountClick }) => (
  <React.Fragment>
    {isLoggedIn ? (
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
                  <a className="nav__sub__link" href="/u/create-brand-profile/1" onClick={onAccountUpgradeClick}>
                    {'Upgrade to Brand'}
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
    ) : (
      <a className={mobile ? 'mobile-nav__link' : ''} href="/account/login">
        {'Login'}
      </a>
    )}
  </React.Fragment>
)

export default compose(
  withState('isLoggedIn', 'setIsLoggedIn', ({ auth }) => auth.isLoggedIn),
  withHandlers({
    logout: ({ auth }) => event => {
      event.preventDefault()
      auth.clear()
      window.location = '/'
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
    onAuthChange: ({ setIsLoggedIn }) => isLoggedIn => {
      setIsLoggedIn(isLoggedIn)
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
