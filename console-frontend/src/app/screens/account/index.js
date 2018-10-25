import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import { Authenticated } from 'react-admin'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import RACancel from '@material-ui/icons/Cancel'
import RATextField from '@material-ui/core/TextField'
import React from 'react'
import { apiAccountShow, apiAccountUpdate } from 'app/auth/utils'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { Main, StyledPaper } from '../shared'
import { Notification, StyledButton, StyledForm } from '../shared'

const AccountLayout = ({ children }) => (
  <React.Fragment>
    <CssBaseline />
    <Main>
      <StyledPaper>{children}</StyledPaper>
    </Main>
  </React.Fragment>
)

const TextField = compose(
  withHandlers({
    editHostnameValue: ({ index, onChange }) => event => {
      onChange(index, event.target.value)
    },
  })
)(({ editHostnameValue, value, ...props }) => <RATextField {...props} onChange={editHostnameValue} value={value} />)

const Cancel = compose(
  withHandlers({
    deleteHostname: ({ index, onClick }) => () => {
      onClick(index)
    },
  })
)(({ deleteHostname, ...props }) => <RACancel {...props} onClick={deleteHostname} />)

const Account = ({
  addHostnameSelect,
  deleteHostname,
  editHostnameValue,
  info,
  accountForm,
  accountFormSubmit,
  setFieldValue,
  location,
}) => (
  <Authenticated location={location}>
    <AccountLayout>
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
        <InputLabel htmlFor="hostname">{'Hostnames'}</InputLabel>
        <FormControl fullWidth margin="normal">
          {accountForm.hostnames.map((hostname, index) => (
            <React.Fragment key={index}>
              <TextField index={index} onChange={editHostnameValue} value={hostname} />
              <IconButton>
                <Cancel index={index} onClick={deleteHostname} style={{ marginRight: '0.5rem' }} />
              </IconButton>
            </React.Fragment>
          ))}
        </FormControl>
        <IconButton>
          <AddCircleOutline onClick={addHostnameSelect} style={{ marginRight: '0.5rem' }} /> {'Add Hostname'}
        </IconButton>
        <StyledButton color="primary" fullWidth type="submit" variant="raised">
          {'Save'}
        </StyledButton>
      </StyledForm>
    </AccountLayout>
  </Authenticated>
)

export default compose(
  withState('accountForm', 'setAccountForm', {
    hostnames: [''],
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
          hostnames: accountForm.hostnames,
          id: accountForm.id,
          name: accountForm.name,
          subtitle: accountForm.subtitle,
          title: accountForm.title,
        },
        setInfo
      )
    },
    addHostnameSelect: ({ accountForm, setAccountForm }) => () => {
      setAccountForm({ ...accountForm, hostnames: [...accountForm.hostnames, ''] })
    },
    deleteHostname: ({ accountForm, setAccountForm }) => index => {
      let newHostnames = [...accountForm.hostnames]
      newHostnames.splice(index, 1)
      setAccountForm({ ...accountForm, hostnames: newHostnames })
    },
    editHostnameValue: ({ accountForm, setAccountForm }) => (index, newValue) => {
      const newHostnames = [...accountForm.hostnames]
      newHostnames[index] = newValue
      setAccountForm({ ...accountForm, hostnames: newHostnames })
    },
    setFieldValue: ({ accountForm, setAccountForm }) => event => {
      setAccountForm({ ...accountForm, [event.target.name]: event.target.value })
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setAccountForm, setInfo, info } = this.props
      const json = await apiAccountShow(setInfo)
      setAccountForm({
        hostnames: json.hostnames,
        id: json.id,
        name: json.name,
        subtitle: json.subtitle,
        title: json.title,
      })
    },
  })
)(Account)
