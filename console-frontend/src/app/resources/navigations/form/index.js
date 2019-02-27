import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import NavigationItem from './navigation-item'
import PluginPreview from 'shared/plugin-preview'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemContainer, Form, Field as LimitedField } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { findIndex } from 'lodash'
import { FormHelperText, Grid, TextField } from '@material-ui/core'
import { Navigation } from 'plugin-base'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'
import { uploadImage } from 'shared/picture-uploader'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const SortableNavigationItem = SortableElement(NavigationItem)
const NavigationItems = ({
  isFormLoading,
  setNavigationItemForm,
  navigationItemsPictures,
  setNavigationItemsPictures,
  isCropping,
  setIsCropping,
  setPicture,
  form,
}) => (
  <div>
    {form.navigationItemsAttributes.map((navigationItem, index) => (
      <SortableNavigationItem
        allowDelete={form.navigationItemsAttributes.length > 1}
        folded={navigationItem.id}
        index={index}
        isCropping={isCropping}
        isFormLoading={isFormLoading}
        key={navigationItem.id || `new-${index}`}
        navigationItem={navigationItem}
        navigationItemsPictures={navigationItemsPictures}
        onChange={setNavigationItemForm}
        setIsCropping={setIsCropping}
        setNavigationItemsPictures={setNavigationItemsPictures}
        setPicture={setPicture}
        sortIndex={index}
      />
    ))}
  </div>
)
const NavigationItemsContainer = SortableContainer(NavigationItems)

const NavigationForm = ({
  addNavigationItem,
  formRef,
  form,
  setFieldValue,
  selectPersona,
  errors,
  isCropping,
  isFormLoading,
  isFormPristine,
  navigationItemsPictures,
  onFormSubmit,
  setIsCropping,
  setNavigationItemForm,
  setNavigationItemsPictures,
  setPicture,
  onSortEnd,
  title,
}) => (
  <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
    <Section title={title}>
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
      <FormHelperText>{'The name is useful for you to reference this module in a trigger.'}</FormHelperText>
      <LimitedField
        disabled={isFormLoading}
        fullWidth
        label="Title"
        margin="normal"
        max={characterLimits.main.title}
        name="title"
        onChange={setFieldValue}
        required
        value={form.title}
      />
      <FormHelperText>{'The title will appear at the top of the navigation.'}</FormHelperText>
      <Autocomplete
        autocomplete={apiPersonasAutocomplete}
        defaultPlaceholder="Choose a persona"
        disabled={isCropping || isFormLoading}
        fullWidth
        initialSelectedItem={form.__persona && { value: form.__persona, label: form.__persona.name }}
        label="Persona"
        onChange={selectPersona}
        options={{ suggestionItem: 'withAvatar' }}
        required
      />
      <FormHelperText>{'The persona will appear in the launcher, and in the cover.'}</FormHelperText>
      <LimitedField
        disabled={isFormLoading}
        fullWidth
        label="Chat Bubble Text"
        margin="normal"
        max={characterLimits.main.chatBubble}
        name="chatBubbleText"
        onChange={setFieldValue}
        value={form.chatBubbleText}
      />
      <FormHelperText>{'Shows as a text bubble next to the plugin launcher.'}</FormHelperText>
    </Section>
    <NavigationItemsContainer
      form={form}
      helperClass="sortable-element"
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      navigationItemsPictures={navigationItemsPictures}
      onSortEnd={onSortEnd}
      setIsCropping={setIsCropping}
      setNavigationItemForm={setNavigationItemForm}
      setNavigationItemsPictures={setNavigationItemsPictures}
      setPicture={setPicture}
      useDragHandle
    />
    <AddItemContainer
      disabled={isCropping || isFormLoading}
      message="Add new Navigation Item"
      onClick={addNavigationItem}
    />
  </Form>
)

const defaults = {
  persona: {
    name: "Persona's Name",
    description: "Persona's description",
    profilePic: {
      url: '/img/icons/placeholder_avatar.png',
    },
    instagramUrl: '',
  },
  product: {
    text: 'Product Text',
    pictureUrl: '/img/icons/placeholder_product.png',
  },
}

const transform = navigationItems =>
  navigationItems.map(e => ({
    id: e.id,
    text: e.text || defaults.product.text,
    url: e.url,
    picture: { url: e.picUrl || defaults.product.pictureUrl },
  }))

const NavigationSuperForm = compose(
  withHandlers({
    onTileClick: () => ({ url }) => window.open(url, '_blank'),
  })
)(({ form, onTileClick, persona, ...props }) => (
  <Grid container spacing={24}>
    <Grid item md={6} xs={12}>
      <NavigationForm form={form} {...props} />
    </Grid>
    <Grid item md={6} xs={12}>
      <PluginPreview persona={persona}>
        <Navigation
          navigationItems={transform(form.navigationItemsAttributes)}
          onTileClick={onTileClick}
          title={form.title}
        />
      </PluginPreview>
    </Grid>
  </Grid>
))

export default compose(
  withOnboardingHelp({ single: true, stepName: 'navigations', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withState('isCropping', 'setIsCropping', false),
  withState('navigationItemsPictures', 'setNavigationItemsPictures', []),
  withState('persona', 'setPersona', defaults.persona),
  withHandlers({
    convertPersona: () => persona => ({
      name: persona ? persona.name : defaults.persona.name,
      description: persona ? persona.description : defaults.persona.description,
      profilePic: {
        url: persona ? persona.profilePicUrl : defaults.persona.profilePic.url,
      },
      instagramUrl: persona ? persona.instagramUrl : '',
    }),
  }),
  withHandlers({
    uploadSubImage: () => async ({ blob, setProgress, subform }) => {
      const picUrl = await uploadImage({
        blob,
        setProgress,
        type: 'navigation-items-pics',
        defaultValue: subform.picUrl,
      })
      return {
        ...subform,
        picUrl,
      }
    },
  }),
  withHandlers({
    uploadSubImages: ({ navigationItemsPictures, uploadSubImage }) => form => {
      return navigationItemsPictures.map(async ({ blob, index, setProgress }) => {
        form.navigationItemsAttributes[index] = await uploadSubImage({
          subform: form.navigationItemsAttributes[index],
          blob,
          setProgress,
        })
      })
    },
  }),
  withHandlers({
    formObjectTransformer: () => json => {
      return {
        id: json.id,
        personaId: (json.persona && json.persona.id) || '',
        name: json.name || '',
        title: json.title || '',
        chatBubbleText: json.chatBubbleText || '',
        __persona: json.persona,
        navigationItemsAttributes: json.navigationItemsAttributes.map(navigationItem => ({
          id: navigationItem.id,
          text: navigationItem.text || '',
          url: navigationItem.url || '',
          picUrl: navigationItem.picUrl || '',
        })),
      }
    },
    saveFormObject: ({ saveFormObject, setErrors, uploadSubImages }) => async form => {
      await Promise.all(uploadSubImages(form))
      return saveFormObject(form, { setErrors })
    },
    afterFormMount: ({ convertPersona, setPersona }) => formObject => {
      setPersona(convertPersona(formObject.__persona))
    },
  }),
  withForm({
    personaId: '',
    name: '',
    chatBubbleText: '',
    navigationItemsAttributes: [
      {
        text: '',
        url: '',
        picUrl: '',
      },
    ],
  }),
  withHandlers({
    addNavigationItem: ({ form, setForm }) => () => {
      setForm({
        ...form,
        navigationItemsAttributes: [
          ...form.navigationItemsAttributes,
          {
            text: '',
            url: '',
            picUrl: '',
          },
        ],
      })
    },
    setNavigationItemForm: ({ form, setForm }) => (navigationItem, index) => {
      const newNavigationItemsAttributes = [...form.navigationItemsAttributes]
      newNavigationItemsAttributes[index] = navigationItem
      setForm({ ...form, navigationItemsAttributes: newNavigationItemsAttributes })
    },
  }),
  withRouter,
  withHandlers({
    selectPersona: ({ convertPersona, form, setForm, setPersona }) => selected => {
      selected &&
        setForm({
          ...form,
          personaId: selected.value.id,
        })
      selected && setPersona(convertPersona(selected.value))
    },
    onFormSubmit: ({ location, formRef, history, onFormSubmit, setIsFormSubmitting }) => async event => {
      if (!formRef.current.reportValidity()) return
      setIsFormSubmitting(true)
      const result = await onFormSubmit(event)
      if (result.error || result.errors) return setIsFormSubmitting(false)
      if (location.pathname !== routes.navigationEdit(result.id)) history.push(routes.navigationEdit(result.id))
      setIsFormSubmitting(false)
      return result
    },
    setPicture: ({ navigationItemsPictures, setNavigationItemsPictures }) => (index, blob, setProgress) => {
      const picture = { index, blob, setProgress }
      let newNavigationItemsPictures = [...navigationItemsPictures]
      const navigationItemsPictureIndex = findIndex(newNavigationItemsPictures, { index })
      navigationItemsPictureIndex >= 0
        ? newNavigationItemsPictures.splice(navigationItemsPictureIndex, 1, picture)
        : newNavigationItemsPictures.push(picture)
      setNavigationItemsPictures(newNavigationItemsPictures)
    },
    onSortEnd: ({ setForm, form }) => ({ oldIndex, newIndex }) => {
      const orderedNavigationItems = arrayMove(form.navigationItemsAttributes, oldIndex, newIndex)
      setForm({ ...form, navigationItemsAttributes: orderedNavigationItems })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ backRoute, title, isCropping, isFormLoading, isFormSubmitting, onFormSubmit }) => ({
    Actions: <Actions onFormSubmit={onFormSubmit} saveDisabled={isFormSubmitting || isCropping || isFormLoading} />,
    backRoute,
    title,
  }))
)(NavigationSuperForm)
