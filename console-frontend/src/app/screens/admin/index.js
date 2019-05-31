import AccountsList from './accounts-list'
import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'app/layout/loading'
import debounce from 'debounce-promise'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import HostnamesForm from 'shared/hostnames-form'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { apiAccountCreate, apiAccountList, apiRequest, apiSignOut, atLeastOneNonBlankCharInputProps } from 'utils'
import { extractCountFromHeaders } from 'shared/pagination'
import { FormControl, IconButton, List, TextField, Tooltip } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const SectionContainer = styled.div`
  max-width: 1200px;
  align-self: center;
  min-width: 100%;
  @media (min-width: 800px) {
    min-width: 800px;
  }
`

const ToggleFormButton = styled(Button)`
  width: 140px;
`

const SaveButton = styled(Button)`
  margin-top: 1rem;
`

const StyledPowerButton = styled(IconButton)`
  margin-right: 20px;
`

const ButtonsContainer = styled.div`
  margin-bottom: 30px;
`

const LogoutButton = ({ signOutButtonClick }) => (
  <Tooltip placement="top" title="Logout">
    <StyledPowerButton onClick={signOutButtonClick}>
      <ExitIcon />
    </StyledPowerButton>
  </Tooltip>
)

const signOutButtonClick = async () => {
  await apiSignOut()
  auth.clear()
}

const Admin = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [page, setPage] = useState(0)
  const [totalAccountsCount, setTotalAccountsCount] = useState(0)
  const [accounts, setAccounts] = useState({})
  const [isNewAccount, setIsNewAccount] = useState(false)
  const [accountForm, setAccountForm] = useState({ name: '', websitesAttributes: [{ hostnames: [''] }] })
  const [searchValue, setSearchValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [fetched, setFetched] = useState(false)

  const toggleNewAccountForm = useCallback(
    () => {
      setIsNewAccount(!isNewAccount)
    },
    [isNewAccount]
  )

  const setAccountFormField = useCallback(
    event => {
      setAccountForm({ ...accountForm, [event.target.name]: event.target.value })
    },
    [accountForm]
  )

  const addHostnameSelect = useCallback(
    () => {
      setAccountForm({
        ...accountForm,
        websitesAttributes: [{ hostnames: [...accountForm.websitesAttributes[0].hostnames, ''] }],
      })
    },
    [accountForm]
  )

  const deleteHostname = useCallback(
    index => {
      let newHostnames = [...accountForm.websitesAttributes[0].hostnames]
      newHostnames.splice(index, 1)
      setAccountForm({ ...accountForm, websitesAttributes: [{ hostnames: newHostnames }] })
    },
    [accountForm]
  )

  const editHostnameValue = useCallback(
    (index, newValue) => {
      const newHostnames = [...accountForm.websitesAttributes[0].hostnames]
      newHostnames[index] = newValue
      setAccountForm({ ...accountForm, websitesAttributes: [{ hostnames: newHostnames }] })
    },
    [accountForm, setAccountForm]
  )

  const onAccountFormSubmit = useCallback(
    async () => {
      const { json, errors, requestError } = await apiRequest(apiAccountCreate, [
        {
          account: {
            ...accountForm,
            websitesAttributes: [{ name: accountForm.name, ...accountForm.websitesAttributes[0] }],
          },
        },
      ])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      return json
    },
    [accountForm, enqueueSnackbar]
  )

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

  const fetchRecords = useCallback(
    () => {
      ;(async () => {
        const { json, requestError, response } = await apiRequest(apiAccountList, [{ ...query, searchQuery }])
        requestError ? enqueueSnackbar(requestError, { variant: 'error' }) : setAccounts(json)
        setTotalAccountsCount(extractCountFromHeaders(response.headers))
        setFetched(true)
      })()
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

  useEffect(fetchRecords, [fetchRecords])

  if (!fetched) return <CircularProgress />

  return (
    <SectionContainer>
      <Section>
        <ButtonsContainer>
          <LogoutButton signOutButtonClick={signOutButtonClick} />
          <ToggleFormButton color="primaryGradient" onClick={toggleNewAccountForm} type="submit" variant="contained">
            {isNewAccount ? 'Close Form' : 'New Account'}
          </ToggleFormButton>
        </ButtonsContainer>
        {isNewAccount ? (
          <form onSubmit={onAccountFormSubmit}>
            <h2>{'New Account'}</h2>
            <FormControl fullWidth margin="normal" required>
              <TextField
                fullWidth
                inputProps={atLeastOneNonBlankCharInputProps}
                label="Name"
                margin="normal"
                name="name"
                onChange={setAccountFormField}
                required
                value={accountForm.name}
              />
            </FormControl>
            <HostnamesForm
              addHostnameSelect={addHostnameSelect}
              deleteHostname={deleteHostname}
              editHostnameValue={editHostnameValue}
              form={accountForm.websitesAttributes[0]}
            />
            <SaveButton color="primaryGradient" type="submit" variant="contained">
              {'Save'}
            </SaveButton>
          </form>
        ) : (
          <>
            <FormControl margin="normal" required>
              <TextField
                fullWidth
                label="Search"
                margin="normal"
                name="search"
                onChange={onChangeSearchField}
                type="search"
                value={searchValue}
              />
            </FormControl>
            <List component="nav">
              {accounts && accounts.length ? (
                <AccountsList
                  accounts={accounts}
                  fetchRecords={fetchRecords}
                  page={page}
                  setPage={setPage}
                  totalAccountsCount={totalAccountsCount}
                />
              ) : (
                <p>{'No accounts match your search...'}</p>
              )}
            </List>
          </>
        )}
      </Section>
    </SectionContainer>
  )
}

export default Admin
