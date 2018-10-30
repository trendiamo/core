import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import auth from 'auth'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { isEqual } from 'lodash'
import Notification from 'shared/notification'
import { Prompt } from 'react-router'
import RACancel from '@material-ui/icons/Cancel'
import RATextField from '@material-ui/core/TextField'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { apiWebsiteShow, apiWebsiteUpdate } from 'utils'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'

const StyledTypography = styled(Typography)`
  margin-left: 10px;
`

const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`

const AddHostnameButton = ({ addHostnameSelect }) => (
  <Button onClick={addHostnameSelect} size="small">
    <StyledAddCircleOutline />
    <StyledTypography>{'Add Another Hostname'}</StyledTypography>
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

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`

const StyledTextField = styled(TextField)`
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
    <FormControl fullWidth margin="normal" required>
      <InputLabel htmlFor="name">{'Name'}</InputLabel>
      <Input name="name" onChange={setFieldValue} value={websiteForm.name} />
    </FormControl>
    <FormControl fullWidth margin="normal" required>
      <InputLabel htmlFor="title">{'Title'}</InputLabel>
      <Input name="title" onChange={setFieldValue} value={websiteForm.title} />
    </FormControl>
    <FormControl fullWidth margin="normal">
      <InputLabel htmlFor="subtitle">{'Subtitle'}</InputLabel>
      <Input name="subtitle" onChange={setFieldValue} value={websiteForm.subtitle} />
    </FormControl>
    <LabelContainer>
      <InputLabel>{'Hostnames'}</InputLabel>
    </LabelContainer>
    <MultiFormControl margin="normal">
      {websiteForm.hostnames.map((hostname, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <FlexDiv key={index}>
          <StyledTextField index={index} onChange={editHostnameValue} required value={hostname} />
          {websiteForm.hostnames.length > 1 && (
            <IconButton>
              <Cancel index={index} onClick={deleteHostname} />
            </IconButton>
          )}
        </FlexDiv>
      ))}
    </MultiFormControl>
    <AddHostnameButton addHostnameSelect={addHostnameSelect} />
    <div style={{ marginTop: '1rem' }}>
      <Button color="primary" type="submit" variant="contained">
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
      const { websiteId, setWebsiteForm, setInfo, setInitialWebsiteForm } = this.props
      const json = await apiWebsiteShow(websiteId, setInfo)
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
