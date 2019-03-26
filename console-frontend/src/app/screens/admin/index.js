import Accounts from './accounts'
import CircularProgress from 'app/layout/loading'
import React from 'react'
import { apiAccounts, apiRequest } from 'utils'
import { branch, compose, lifecycle, renderComponent, withState } from 'recompose'
import { withSnackbar } from 'notistack'

const Admin = ({ accounts }) => <Accounts accounts={accounts} />

export default compose(
  withSnackbar,
  withState('accounts', 'setAccounts', {}),
  lifecycle({
    async componentDidMount() {
      const { setAccounts, enqueueSnackbar } = this.props
      const { json, requestError } = await apiRequest(apiAccounts, [])
      requestError ? enqueueSnackbar(requestError, { variant: 'error' }) : setAccounts(json)
    },
  }),
  branch(({ accounts }) => !(accounts && accounts.length), renderComponent(CircularProgress))
)(Admin)
