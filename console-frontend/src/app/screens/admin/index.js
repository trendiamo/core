import AccountsList from './accounts-list'
import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'app/layout/loading'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import HostnamesForm from 'shared/hostnames-form'
import React, { useCallback, useEffect, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { apiAccount, apiAccountCreate, apiRequest, apiSignOut, atLeastOneNonBlankCharRegexp } from 'utils'
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

  const [accounts, setAccounts] = useState({})
  const [isNewAccount, setIsNewAccount] = useState(false)
  const [accountForm, setAccountForm] = useState({ name: '', websitesAttributes: [{ hostnames: [''] }] })

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

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiAccount, [])
        requestError ? enqueueSnackbar(requestError, { variant: 'error' }) : setAccounts(json)
      })()
    },
    [enqueueSnackbar]
  )

  if (!(accounts && accounts.length)) return <CircularProgress />

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
                inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
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
          <List component="nav">
            <AccountsList accounts={accounts} setAccounts={setAccounts} />
          </List>
        )}
      </Section>
    </SectionContainer>
  )
}

export default Admin
