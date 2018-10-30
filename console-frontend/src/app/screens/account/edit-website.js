import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import auth from 'auth'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import { isEqual } from 'lodash'
import Notification from 'shared/notification'
import { Prompt } from 'react-router'
import RACancel from '@material-ui/icons/Cancel'
import RATextField from '@material-ui/core/TextField'
import React from 'react'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { apiWebsiteShow, apiWebsiteUpdate } from 'utils'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'

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
  isLoading,
  editHostnameValue,
  info,
  isPristine,
  websiteForm,
  onSubmit,
  setFieldValue,
}) => (
  <form onSubmit={onSubmit}>
    <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isPristine} />
    <Notification data={info} />
    <TextField
      disabled={isLoading}
      fullWidth
      label="Name"
      margin="normal"
      name="name"
      onChange={setFieldValue}
      required
      value={websiteForm.name}
    />
    <TextField
      disabled={isLoading}
      fullWidth
      label="Title"
      margin="normal"
      name="title"
      onChange={setFieldValue}
      required
      value={websiteForm.title}
    />
    <TextField
      disabled={isLoading}
      fullWidth
      label="Subtitle"
      margin="normal"
      name="subtitle"
      onChange={setFieldValue}
      value={websiteForm.subtitle}
    />
    <LabelContainer>
      <InputLabel>{'Hostnames'}</InputLabel>
    </LabelContainer>
    <MultiFormControl margin="normal">
      {websiteForm.hostnames.map((hostname, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <FlexDiv key={index}>
          <StyledHostnameTextField
            disabled={isLoading}
            index={index}
            onChange={editHostnameValue}
            required
            value={hostname}
          />
          {websiteForm.hostnames.length > 1 && (
            <IconButton>
              <Cancel disabled={isLoading} index={index} onClick={deleteHostname} />
            </IconButton>
          )}
        </FlexDiv>
      ))}
    </MultiFormControl>
    <AddHostnameButton addHostnameSelect={addHostnameSelect} disabled={isLoading} />
    <div style={{ marginTop: '1rem' }}>
      <Button color="primary" disabled={isLoading} type="submit" variant="contained">
        {'Save'}
      </Button>
    </div>
  </form>
)

export default compose(
  withState('initialWebsiteForm', 'setInitialWebsiteForm', {
    hostnames: [''],
    name: '',
    subtitle: '',
    title: '',
  }),
  withState('isLoading', 'setIsLoading', true),
  withState('websiteForm', 'setWebsiteForm', ({ initialWebsiteForm }) => initialWebsiteForm),
  withState('info', 'setInfo', null),
  withProps(({ websiteForm, initialWebsiteForm }) => ({
    isPristine: isEqual(websiteForm, initialWebsiteForm),
  })),
  withProps(() => ({
    websiteId: auth.getUser().account.websiteIds[0],
  })),
  withHandlers({
    addHostnameSelect: ({ websiteForm, setWebsiteForm }) => () => {
      setWebsiteForm({ ...websiteForm, hostnames: [...websiteForm.hostnames, ''] })
    },
    deleteHostname: ({ websiteForm, setWebsiteForm }) => index => {
      let newHostnames = [...websiteForm.hostnames]
      newHostnames.splice(index, 1)
      setWebsiteForm({ ...websiteForm, hostnames: newHostnames })
    },
    editHostnameValue: ({ websiteForm, setWebsiteForm }) => (index, newValue) => {
      const newHostnames = [...websiteForm.hostnames]
      newHostnames[index] = newValue
      setWebsiteForm({ ...websiteForm, hostnames: newHostnames })
    },
    onSubmit: ({ websiteForm, websiteId, setInfo, setInitialWebsiteForm }) => async event => {
      event.preventDefault()
      const website = await apiWebsiteUpdate(websiteId, { website: websiteForm }, setInfo)
      setInitialWebsiteForm(websiteForm)
      return website
    },
    setFieldValue: ({ websiteForm, setWebsiteForm }) => event => {
      setWebsiteForm({ ...websiteForm, [event.target.name]: event.target.value })
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { websiteId, setWebsiteForm, setInfo, setInitialWebsiteForm, setIsLoading } = this.props
      const json = await apiWebsiteShow(websiteId, setInfo)
      setIsLoading(false)
      const websiteObject = {
        hostnames: json.hostnames || [''],
        name: json.name || '',
        subtitle: json.subtitle || '',
        title: json.title || '',
      }
      setInitialWebsiteForm(websiteObject)
      setWebsiteForm(websiteObject)
    },
  })
)(EditWebsite)
