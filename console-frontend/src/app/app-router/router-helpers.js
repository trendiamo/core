import auth from 'auth'
import NotFound from 'app/screens/not-found'
import React, { useCallback, useEffect } from 'react'
import routes from 'app/routes'
import { apiAccountsShow, apiMe, apiRequest, isLocalStorageAccurate } from 'utils'
import { Redirect, Route } from 'react-router-dom'

const PrivateRouteRender = ({
  component,
  fetchedAccount,
  isAdminScoped,
  isOwnerScoped,
  isSellerScoped,
  match,
  path,
  setFetchedAccount,
}) => {
  useEffect(
    () => {
      ;(async () => {
        let account = auth.getAccount()
        if (match.path.startsWith('/a/') && !account) {
          setFetchedAccount(false)
          const { json } = await apiRequest(apiAccountsShow, [auth.getSlug()])
          auth.setAccount(json)
          if (!isLocalStorageAccurate()) return
          setFetchedAccount(true)
        }
      })()
    },
    [match.path, setFetchedAccount]
  )

  if (!auth.isLoggedIn()) return <Redirect to={routes.login()} />

  const notFound =
    (match.path.startsWith('/a/') && fetchedAccount && !auth.getAccount()) ||
    (isOwnerScoped && !auth.isAdmin() && auth.getAccountRole() === 'editor') ||
    (isAdminScoped && !auth.isAdmin()) ||
    (isSellerScoped && !auth.isSeller()) ||
    (path === routes.dataDashboard() && !auth.getAccount().websitesAttributes[0].isECommerce)

  if (notFound) return React.createElement(NotFound, { match })

  if (match.path.startsWith('/a/') && !auth.getAccount()) return null

  if (path === routes.contentCreation() && auth.isSeller()) return <Redirect to={routes.simpleChatsList()} />

  return React.createElement(component, { match })
}

// Auth protected route.
export const PrivateRoute = ({
  component,
  fetchedAccount,
  isAdminScoped,
  isOwnerScoped,
  isSellerScoped,
  path,
  setFetchedAccount,
  ...props
}) => {
  const render = useCallback(
    ({ match }) => {
      return (
        <PrivateRouteRender
          component={component}
          fetchedAccount={fetchedAccount}
          isAdminScoped={isAdminScoped}
          isOwnerScoped={isOwnerScoped}
          isSellerScoped={isSellerScoped}
          match={match}
          path={path}
          setFetchedAccount={setFetchedAccount}
        />
      )
    },
    [component, fetchedAccount, isAdminScoped, isOwnerScoped, isSellerScoped, path, setFetchedAccount]
  )

  return <Route {...props} path={path} render={render} />
}

export const ExternalRoute = ({ component, path, ...props }) => {
  const render = useCallback(
    () => (auth.isLoggedIn() ? <Redirect to={routes.root()} /> : React.createElement(component)),
    [component]
  )
  return <Route {...props} path={path} render={render} />
}

const rootRedirect = () => {
  if (!auth.isLoggedIn()) return routes.login()
  if (auth.isAffiliate()) return routes.affiliatePartners()
  if (auth.isSingleAccount()) {
    const role = Object.values(auth.getUser().roles)[0]
    const accountSlug = Object.keys(auth.getUser().roles)[0]
    if (auth.getUser().onboardingStage === 0) return routes.welcome(accountSlug)
    if (role === 'editor') {
      return routes.simpleChatsList(accountSlug)
    } else {
      return routes.triggersList(accountSlug)
    }
  }
  return routes.accounts()
}

const accountRedirect = () => {
  if (auth.getUser().onboardingStage === 0) return routes.welcome(auth.getSlug())
  if (auth.isAdmin() || auth.getAccountRole() === 'owner') {
    return routes.triggersList(auth.getSlug())
  } else {
    return routes.simpleChatsList(auth.getSlug())
  }
}

export const RootRedirect = () => {
  useEffect(() => {
    ;(async () => {
      if (window.location.hash === '#confirmed') {
        const { json, requestError } = await apiRequest(apiMe, [])
        if (requestError) {
          auth.clear({ isError: true })
          return // auth.clear does the redirect already
        } else {
          auth.setUser(json)
        }
      }
      window.location = rootRedirect()
    })()
  }, [])

  return null
}

export const AccountRedirect = () => {
  const destination = accountRedirect()

  if (!destination) return <NotFound />

  return <Redirect to={destination} />
}
