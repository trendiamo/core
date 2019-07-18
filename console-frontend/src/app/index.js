import AppRouter from './app-router'
import auth from 'auth'
import DateFnsUtils from '@date-io/date-fns'
import JssProvider from 'react-jss/lib/JssProvider'
import Layout from 'app/layout'
import React, { useEffect, useState } from 'react'
import theme from 'app/theme'
import { apiGetCsrfToken, apiRequest } from 'utils'
import { create } from 'jss'
import { createGenerateClassName, jssPreset, MuiThemeProvider } from '@material-ui/core/styles'
import { createGlobalStyle } from 'styled-components'
import { CssBaseline } from '@material-ui/core'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import { Router } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { StoreProvider } from 'ext/hooks/store'
import { useSnackbar } from 'notistack'
import 'assets/css/fonts.css'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
})

const SortableStyle = createGlobalStyle`
  .sortable-element {
    z-index: 1;
  }
`

const AppBase = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  const [fetchedAccount, setFetchedAccount] = useState(false)

  useEffect(
    () => {
      apiRequest(apiGetCsrfToken, []).then(({ json, errors, requestError }) => {
        setLoading(false)
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (!requestError && !errors) auth.setCsrfToken(json)
      })
    },
    [enqueueSnackbar, setLoading]
  )

  if (loading) return null

  return (
    <>
      <CssBaseline />
      <SortableStyle />
      <Layout fetchedAccount={fetchedAccount}>
        <AppRouter fetchedAccount={fetchedAccount} setFetchedAccount={setFetchedAccount} />
      </Layout>
    </>
  )
}

const anchorOrigin = { vertical: 'bottom', horizontal: 'right' }

/* eslint-disable react/jsx-max-depth */
export const App = ({ history }) => (
  <StoreProvider>
    <Router history={history}>
      <JssProvider generateClassName={generateClassName} jss={jss}>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <SnackbarProvider anchorOrigin={anchorOrigin} maxSnack={3}>
              <AppBase />
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </JssProvider>
    </Router>
  </StoreProvider>
)
/* eslint-enable react/jsx-max-depth */

export default App
