import AccountsListBase from './accounts-list-base'
import CircularProgress from 'app/layout/loading'
import debounce from 'debounce-promise'
import Layout from './layout'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { apiAccountList, apiRequest } from 'utils'
import { extractCountFromHeaders } from 'shared/pagination'
import { Field } from 'shared/form-elements'
import { List } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const AccountsList = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [page, setPage] = useState(0)
  const [totalAccountsCount, setTotalAccountsCount] = useState(0)
  const [accounts, setAccounts] = useState({})
  const [searchValue, setSearchValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [fetched, setFetched] = useState(false)

  const query = useMemo(
    () => ({
      range: JSON.stringify([page * 10, (page + 1) * 10 - 1]),
    }),
    [page]
  )

  const debouncedAutocomplete = useMemo(
    () =>
      debounce(searchValue => {
        setSearchQuery(searchValue)
      }, 250),
    []
  )

  const fetchAccounts = useCallback(
    async () => {
      const { json, requestError, response } = await apiRequest(apiAccountList, [{ ...query, searchQuery }])
      requestError ? enqueueSnackbar(requestError, { variant: 'error' }) : setAccounts(json)
      setTotalAccountsCount(extractCountFromHeaders(response.headers))
      setFetched(true)
    },
    [enqueueSnackbar, query, searchQuery]
  )

  const onChangeSearchField = useCallback(
    async event => {
      setPage(0)
      setSearchValue(event.target.value)
      debouncedAutocomplete(event.target.value)
    },
    [debouncedAutocomplete, setSearchValue, setPage]
  )

  useEffect(
    () => {
      ;(async () => {
        fetchAccounts()
      })()
    },
    [fetchAccounts]
  )

  if (!fetched) return <CircularProgress />

  return (
    <Layout>
      <Field
        autoFocus
        label="Search"
        name="search"
        onChange={onChangeSearchField}
        required
        type="search"
        value={searchValue}
      />
      <List component="nav">
        {accounts && accounts.length ? (
          <AccountsListBase
            accounts={accounts}
            fetchAccounts={fetchAccounts}
            page={page}
            setPage={setPage}
            totalAccountsCount={totalAccountsCount}
          />
        ) : (
          <p>{'No accounts match your search...'}</p>
        )}
      </List>
    </Layout>
  )
}

export default AccountsList
