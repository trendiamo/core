import AccountsList from './accounts-list'
import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'app/layout/loading'
import ExitIcon from '@material-ui/icons/PowerSettingsNew'
import HostnamesForm from 'shared/hostnames-form'
import React from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { apiAccount, apiAccountCreate, apiRequest, apiSignOut } from 'utils'
import { branch, compose, lifecycle, renderComponent, withHandlers, withState } from 'recompose'
import { FormControl, IconButton, List, TextField, Tooltip } from '@material-ui/core'
import { withSnackbar } from 'notistack'

const SectionContainer = styled.div`
  max-width: 1200px;
  align-self: center;
  min-width: 100%;
  @media (min-width: 800px) {
    min-width: 800px;
  }
`

const StyledButton = styled(Button)`
  width: 140px;
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

const Admin = ({
  addHostnameSelect,
  deleteHostname,
  accounts,
  signOutButtonClick,
  accountForm,
  toggleNewAccountForm,
  editHostnameValue,
  onAccountFormSubmit,
  isNewAccount,
  setAccountFormField,
}) => (
  <SectionContainer>
    <Section>
      <ButtonsContainer>
        <LogoutButton signOutButtonClick={signOutButtonClick} />
        <StyledButton color="primaryGradient" onClick={toggleNewAccountForm} type="submit" variant="contained">
          {isNewAccount ? 'Close Form' : 'New Account'}
        </StyledButton>
      </ButtonsContainer>
      {isNewAccount ? (
        <form onSubmit={onAccountFormSubmit}>
          <h2>{'New Account'}</h2>
          <FormControl fullWidth margin="normal" required>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              name="name"
              onChange={setAccountFormField}
              required
              value={accountForm.name}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <HostnamesForm
              addHostnameSelect={addHostnameSelect}
              deleteHostname={deleteHostname}
              editHostnameValue={editHostnameValue}
              form={accountForm.websitesAttributes[0]}
            />
          </FormControl>
          <Button color="primaryGradient" type="submit" variant="contained">
            {'Save'}
          </Button>
        </form>
      ) : (
        <List component="nav">
          <AccountsList accounts={accounts} />
        </List>
      )}
    </Section>
  </SectionContainer>
)

export default compose(
  withSnackbar,
  withState('accounts', 'setAccounts', {}),
  withState('isNewAccount', 'setIsNewAccount', false),
  withState('accountForm', 'setAccountForm', { name: '', websitesAttributes: [{ hostnames: [''] }] }),
  withHandlers({
    toggleNewAccountForm: ({ isNewAccount, setIsNewAccount }) => () => {
      setIsNewAccount(!isNewAccount)
    },
    signOutButtonClick: () => async () => {
      await apiSignOut()
      auth.clear()
    },
    setAccountFormField: ({ accountForm, setAccountForm }) => event => {
      setAccountForm({ ...accountForm, [event.target.name]: event.target.value })
    },
    addHostnameSelect: ({ accountForm, setAccountForm }) => () => {
      setAccountForm({
        ...accountForm,
        websitesAttributes: [{ hostnames: [...accountForm.websitesAttributes[0].hostnames, ''] }],
      })
    },
    deleteHostname: ({ accountForm, setAccountForm }) => index => {
      let newHostnames = [...accountForm.websitesAttributes[0].hostnames]
      newHostnames.splice(index, 1)
      setAccountForm({ ...accountForm, websitesAttributes: [{ hostnames: newHostnames }] })
    },
    editHostnameValue: ({ accountForm, setAccountForm }) => (index, newValue) => {
      const newHostnames = [...accountForm.websitesAttributes[0].hostnames]
      newHostnames[index] = newValue
      setAccountForm({ ...accountForm, websitesAttributes: [{ hostnames: newHostnames }] })
    },
    onAccountFormSubmit: ({ accountForm, enqueueSnackbar, setErrors }) => async () => {
      const { json, errors, requestError } = await apiRequest(apiAccountCreate, [
        {
          account: {
            ...accountForm,
            websitesAttributes: [{ name: accountForm.name, ...accountForm.websitesAttributes[0] }],
          },
        },
      ])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
      return json
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setAccounts, enqueueSnackbar } = this.props
      const { json, requestError } = await apiRequest(apiAccount, [])
      requestError ? enqueueSnackbar(requestError, { variant: 'error' }) : setAccounts(json)
    },
  }),
  branch(({ accounts }) => !(accounts && accounts.length), renderComponent(CircularProgress))
)(Admin)
