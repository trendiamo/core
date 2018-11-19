import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import auth from 'auth'
import Button from '@material-ui/core/Button'
import CircularProgress from 'shared/circular-progress'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import Notification from 'shared/notification'
import RACancel from '@material-ui/icons/Cancel'
import RATextField from '@material-ui/core/TextField'
import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import withForm from 'ext/recompose/with-form'
import { apiWebsiteShow, apiWebsiteUpdate } from 'utils'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Prompt } from 'react-router'

const StyledTypography = styled(Typography)`
  margin-left: 10px;
`

const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`

const AddHostnameButton = ({ disabled, addHostnameSelect }) => (
  <Button disabled={disabled} onClick={addHostnameSelect} size="small">
    <StyledAddCircleOutline />
    <StyledTypography>{'Add Another Hostname'}</StyledTypography>
  </Button>
)

const HostnameTextField = compose(
  withHandlers({
    editHostnameValue: ({ index, onChange }) => event => {
      onChange(index, event.target.value)
    },
  })
)(({ editHostnameValue, value, ...props }) => <RATextField {...props} onChange={editHostnameValue} value={value} />)

const Cancel = compose(
  withHandlers({
    deleteHostname: ({ index, onClick, disabled }) => () => {
      if (!disabled) onClick(index)
    },
  })
)(({ deleteHostname, ...props }) => <RACancel {...props} onClick={deleteHostname} />)

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`

const StyledHostnameTextField = styled(HostnameTextField)`
  flex: 1;
  margin: 8px 0;
`

const LabelContainer = styled.div`
  margin-top: 1rem;
`

const MultiFormControl = styled.div`
  margin-top: 0;
`

const EditWebsite = ({
  addHostnameSelect,
  deleteHostname,
  isFormLoading,
  editHostnameValue,
  info,
  isFormPristine,
  form,
  onFormSubmit,
  setFieldValue,
}) => (
  <form onSubmit={onFormSubmit}>
    <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
    <Notification data={info} />
    <TextField
      disabled={isFormLoading}
      fullWidth
      label="Name"
      margin="normal"
      name="name"
      onChange={setFieldValue}
      required
      value={form.name}
    />
    <TextField
      disabled={isFormLoading}
      fullWidth
      label="Title"
      margin="normal"
      name="title"
      onChange={setFieldValue}
      required
      value={form.title}
    />
    <TextField
      disabled={isFormLoading}
      fullWidth
      label="Subtitle"
      margin="normal"
      name="subtitle"
      onChange={setFieldValue}
      value={form.subtitle}
    />
    <LabelContainer>
      <InputLabel>{'Hostnames'}</InputLabel>
    </LabelContainer>
    <MultiFormControl margin="normal">
      {form.hostnames.map((hostname, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <FlexDiv key={index}>
          <StyledHostnameTextField
            disabled={isFormLoading}
            index={index}
            onChange={editHostnameValue}
            required
            value={hostname}
          />
          {form.hostnames.length > 1 && (
            <IconButton>
              <Cancel disabled={isFormLoading} index={index} onClick={deleteHostname} />
            </IconButton>
          )}
        </FlexDiv>
      ))}
    </MultiFormControl>
    <AddHostnameButton addHostnameSelect={addHostnameSelect} disabled={isFormLoading} />
    <div style={{ marginTop: '1rem' }}>
      <Button color="primary" disabled={isFormLoading} type="submit" variant="contained">
        {'Save'}
      </Button>
    </div>
  </form>
)

export default compose(
  withState('info', 'setInfo', null),
  withProps(() => ({
    websiteId: auth.getUser().account.websiteIds[0],
  })),
  withHandlers({
    loadFormObject: ({ websiteId, setInfo }) => async () => {
      const json = await apiWebsiteShow(websiteId, setInfo)
      return {
        hostnames: json.hostnames || [''],
        name: json.name || '',
        subtitle: json.subtitle || '',
        title: json.title || '',
      }
    },
    saveFormObject: ({ websiteId, setInfo }) => async form => {
      return await apiWebsiteUpdate(websiteId, { website: form }, setInfo)
    },
  }),
  withForm({
    hostnames: [''],
    name: '',
    subtitle: '',
    title: '',
  }),
  withHandlers({
    addHostnameSelect: ({ form, setForm }) => () => {
      setForm({ ...form, hostnames: [...form.hostnames, ''] })
    },
    deleteHostname: ({ form, setForm }) => index => {
      let newHostnames = [...form.hostnames]
      newHostnames.splice(index, 1)
      setForm({ ...form, hostnames: newHostnames })
    },
    editHostnameValue: ({ form, setForm }) => (index, newValue) => {
      const newHostnames = [...form.hostnames]
      newHostnames[index] = newValue
      setForm({ ...form, hostnames: newHostnames })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress))
)(EditWebsite)
