import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import { Authenticated } from 'react-admin'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Notification from 'shared/notification'
import RACancel from '@material-ui/icons/Cancel'
import RATextField from '@material-ui/core/TextField'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { apiAccountShow, apiAccountUpdate } from 'app/auth/utils'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { Main, StyledButton, StyledForm, StyledPaper } from '../shared'

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
`

const StyledTypography = styled(Typography)`
  margin-left: 10px;
`

const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`

const AccountLayout = ({ children }) => (
  <React.Fragment>
    <CssBaseline />
    <Main>
      <StyledPaper>
        <StyledDiv>{children}</StyledDiv>
      </StyledPaper>
    </Main>
  </React.Fragment>
)

const AddHostnameButton = ({ addHostnameSelect }) => (
  <Button onClick={addHostnameSelect} size={'small'}>
    <StyledAddCircleOutline />
    <StyledTypography>{'Add Hostname'}</StyledTypography>
  </Button>
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

const StyledTextField = styled(TextField)`
  width: 70%;
`

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
          <InputLabel htmlFor="name">{'Name'}</InputLabel>
          <Input autoFocus name="name" onChange={setFieldValue} value={accountForm.name} />
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="title">{'Title'}</InputLabel>
          <Input name="title" onChange={setFieldValue} value={accountForm.title} />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="subtitle">{'Subtitle'}</InputLabel>
          <Input name="subtitle" onChange={setFieldValue} value={accountForm.subtitle} />
        </FormControl>
        <InputLabel htmlFor="hostname">{'Hostnames'}</InputLabel>
        <FormControl fullWidth margin="normal">
          {accountForm.hostnames.map((hostname, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <StyledTextField index={index} onChange={editHostnameValue} value={hostname} />
              <IconButton>
                <Cancel index={index} onClick={deleteHostname} />
              </IconButton>
            </div>
          ))}
        </FormControl>
        <AddHostnameButton addHostnameSelect={addHostnameSelect} />
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
      const { setAccountForm, setInfo } = this.props
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
