import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Cancel from './shared/cancel'
import CircularProgress from 'shared/circular-progress'
import Notification from 'shared/notification'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import SaveIcon from '@material-ui/icons/Save'
import Spotlight from './spotlight'
import styled from 'styled-components'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { apiPersonaSimpleList } from 'utils'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { Prompt, withRouter } from 'react-router'

const StyledAvatar = styled(Avatar)`
  display: inline-block;
`

const StyledTypography = styled(Typography)`
  display: inline-block;
  margin-left: 20px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
`

const Actions = ({ isFormLoading, onFormSubmit }) => (
  <Button color="primary" disabled={isFormLoading} onClick={onFormSubmit} type="submit" variant="contained">
    <SaveIcon />
    {'Save'}
  </Button>
)

const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`

const AddSpotlightButton = ({ disabled, addSpotlight }) => (
  <Button disabled={disabled} onClick={addSpotlight} size="small">
    <StyledAddCircleOutline />
    <StyledTypography>{'Add Another Spotlight'}</StyledTypography>
  </Button>
)

const selectValue = (form, personas) => {
  if (form.personaId === '') return ''
  const personaIndex = personas.findIndex(persona => persona.id === form.personaId)
  return `Persona ${personaIndex}: ${personas[personaIndex].name}`
}

const CurationForm = ({
  setFieldValue,
  personas,
  form,
  formRef,
  errors,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  selectPersona,
  deleteSpotlight,
  editSpotlightValue,
  addSpotlight,
  setForm,
  title,
}) => (
  <PaperContainer>
    <Typography variant="subtitle1">{title}</Typography>
    <form onSubmit={onFormSubmit} ref={formRef}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <Notification data={errors} />
      <TextField
        autoFocus
        disabled={isFormLoading}
        fullWidth
        label="Name"
        margin="normal"
        name="name"
        onChange={setFieldValue}
        required
        value={form.name}
      />
      <FormControl disabled={isFormLoading} fullWidth>
        <InputLabel htmlFor="persona-label-placeholder" shrink>
          {'Persona'}
        </InputLabel>
        <Select
          displayEmpty
          input={<Input id="persona-label-placeholder" name="persona" />}
          name="persona"
          onChange={selectPersona}
          value={selectValue(form, personas)}
        >
          {personas.map((persona, index) => (
            <MenuItem id={persona.id} key={`persona-${persona.id}`} value={`Persona ${index}: ${persona.name}`}>
              <Item>
                <StyledAvatar alt={persona.name} src={persona.profilePicUrl} />
                <StyledTypography>{persona.name}</StyledTypography>
              </Item>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Curation Title"
        margin="normal"
        name="title"
        onChange={setFieldValue}
        required
        value={form.title}
      />
      <TextField
        disabled={isFormLoading}
        fullWidth
        label="Curation Subtitle"
        margin="normal"
        name="subtitle"
        onChange={setFieldValue}
        required
        value={form.subtitle}
      />
      <Typography variant="h6">{'Curation Spotlights'}</Typography>
      <div>
        {form.spotlightsAttributes.map((spotlight, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">{`Spotlight #${index + 1}`}</Typography>
                <Spotlight
                  form={form}
                  index={index}
                  onChange={editSpotlightValue}
                  personas={personas}
                  setForm={setForm}
                />
                {form.spotlightsAttributes.length > 1 && (
                  <IconButton>
                    <Cancel disabled={isFormLoading} index={index} onClick={deleteSpotlight} />
                  </IconButton>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
        <AddSpotlightButton addSpotlight={addSpotlight} disabled={isFormLoading} />{' '}
      </div>
    </form>
  </PaperContainer>
)

export default compose(
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withState('personas', 'setPersonas', []),
  withHandlers({
    loadFormObject: ({ loadFormObject, setPersonas }) => async () => {
      const personas = await apiPersonaSimpleList()
      setPersonas(personas)
      return loadFormObject()
    },
    saveFormObject: ({ saveFormObject, setErrors }) => form => {
      return saveFormObject(form, { setErrors })
    },
  }),
  withForm({
    personaId: '',
    title: '',
    subtitle: '',
    spotlightsAttributes: [
      {
        text: '',
        personaId: '',
        productPicksAttributes: [
          {
            url: '',
            name: '',
            description: '',
            displayPrice: '',
            picUrl: '',
          },
        ],
      },
    ],
  }),
  withHandlers({
    addSpotlight: ({ form, setForm }) => () => {
      setForm({
        ...form,
        spotlightsAttributes: [
          ...form.spotlightsAttributes,
          {
            text: '',
            personaId: '',
            productPicksAttributes: [
              {
                url: '',
                name: '',
                description: '',
                displayPrice: '',
                picUrl: '',
              },
            ],
          },
        ],
      })
    },
    editSpotlightValue: ({ form, setForm }) => (index, newValue) => {
      const newSpotlights = [...form.spotlightsAttributes]
      newSpotlights[index][newValue.name] = newValue.value
      setForm({ ...form, spotlightsAttributes: newSpotlights })
    },
    deleteSpotlight: ({ form, setForm }) => index => {
      let newSpotlights = [...form.spotlightsAttributes]
      newSpotlights.splice(index, 1)
      setForm({ ...form, spotlightsAttributes: newSpotlights })
    },
  }),
  withRouter,
  withHandlers({
    selectPersona: ({ form, setForm }) => (index, newValue) => {
      setForm({
        ...form,
        personaId: newValue.props.id,
      })
    },
    onFormSubmit: ({ formRef, history, onFormSubmit }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result.error && !result.errors) history.push(routes.curationsList())
      return result
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ breadcrumbs, isFormLoading, onFormSubmit }) => ({
    Actions: <Actions isFormLoading={isFormLoading} onFormSubmit={onFormSubmit} />,
    breadcrumbs,
  })),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  }))
)(CurationForm)
