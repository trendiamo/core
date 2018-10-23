import { Authenticated } from 'react-admin'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import React from 'react'
import { apiAccountShow, apiAccountUpdate } from 'app/auth/utils'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { Main, StyledPaper } from '../shared'
import { Notification, StyledButton, StyledForm } from '../shared'

const Account = ({ info, accountForm, accountFormSubmit, setFieldValue, location }) => (
  <React.Fragment>
    <CssBaseline />
    <Main>
      <StyledPaper>
        <Authenticated location={location}>
          <StyledForm onSubmit={accountFormSubmit}>
            <Notification data={info} />
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="id">{'ID'}</InputLabel>
              <Input name="id" onChange={setFieldValue} value={accountForm.id} />
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="name">{'Name'}</InputLabel>
              <Input autoFocus name="name" onChange={setFieldValue} value={accountForm.name} />
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="title">{'Title'}</InputLabel>
              <Input name="title" onChange={setFieldValue} value={accountForm.title} />
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel htmlFor="subtitle">{'Subtitle'}</InputLabel>
              <Input name="subtitle" onChange={setFieldValue} value={accountForm.subtitle} />
            </FormControl>
            <StyledButton color="primary" fullWidth type="submit" variant="raised">
              {'Save'}
            </StyledButton>
          </StyledForm>
        </Authenticated>
      </StyledPaper>
    </Main>
  </React.Fragment>
)

export default compose(
  withState('accountForm', 'setAccountForm', {
    id: '',
    name: '',
    subtitle: '',
    title: '',
  }),
  withState('info', 'setInfo', null),
  withHandlers({
    accountFormSubmit: ({ accountForm, setInfo }) => async event => {
      event.preventDefault()
      await apiAccountUpdate(
        {
          id: accountForm.id,
          name: accountForm.name,
          subtitle: accountForm.subtitle,
          title: accountForm.title,
        },
        setInfo
      )
    },
    setFieldValue: ({ setAccountForm, accountForm }) => event => {
      event.preventDefault()
      const value = event.target.value
      setAccountForm({ ...accountForm, [event.target.name]: value })
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setAccountForm, setInfo } = this.props
      const json = await apiAccountShow(setInfo)
      setAccountForm({
        id: json.id,
        name: json.name,
        subtitle: json.subtitle,
        title: json.title,
      })
    },
  })
)(Account)
