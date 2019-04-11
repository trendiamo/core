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
import { Actions, AddItemContainer, Field, Form, HelperText } from 'shared/form-elements'
import { apiPersonasAutocomplete, atLeastOneNonBlankCharRegexp } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import {
  branch,
  compose,
  renderComponent,
  shallowEqual,
  shouldUpdate,
  withHandlers,
  withProps,
  withState,
} from 'recompose'
import { findIndex, omit } from 'lodash'
import { Grid } from '@material-ui/core'
import { Navigation } from 'plugin-base'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'
import { uploadPicture } from 'shared/picture-uploader'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const SortableNavigationItem = compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['navigationItem', 'onChange', 'setIsCropping', 'setPicture', 'setNavigationItemsPictures']
    return (
      !shallowEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps)) ||
      !shallowEqual(props.navigationItem, nextProps.navigationItem)
    )
  })
)(SortableElement(NavigationItem))
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
const NavigationItemsContainer = compose(
  shouldUpdate((props, nextProps) => {
    return (
      props.isCropping !== nextProps.isCropping ||
      props.isFormLoading !== nextProps.isFormLoading ||
      props.form.navigationItemsAttributes.length !== nextProps.form.navigationItemsAttributes.length ||
      props.form.navigationItemsAttributes.filter((item, index) => {
        const nextItem = nextProps.form.navigationItemsAttributes && nextProps.form.navigationItemsAttributes[index]
        return !shallowEqual(item, nextItem)
      }).length > 0
    )
  })
)(SortableContainer(NavigationItems))

const MainFormTemplate = ({ title, isFormLoading, setFieldValue, form, isCropping, selectPersona }) => (
  <Section title={title}>
    <Field
      autoFocus
      disabled={isFormLoading}
      fullWidth
      inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
      label="Name"
      margin="normal"
      name="name"
      onChange={setFieldValue}
      required
      value={form.name}
    />
    <HelperText>{'The name is useful for you to reference this module in a trigger.'}</HelperText>
    <Field
      disabled={isFormLoading}
      fullWidth
      inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
      label="Title"
      margin="normal"
      max={characterLimits.main.title}
      name="title"
      onChange={setFieldValue}
      required
      value={form.title}
    />
    <HelperText>{'The title will appear at the top of the navigation.'}</HelperText>
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
    <HelperText>{'The persona will appear in the launcher, and in the cover.'}</HelperText>
    <Field
      disabled={isFormLoading}
      fullWidth
      label="Chat Bubble Text"
      margin="normal"
      max={characterLimits.main.chatBubble}
      name="chatBubbleText"
      onChange={setFieldValue}
      value={form.chatBubbleText}
    />
    <HelperText>{'Shows as a text bubble next to the plugin launcher.'}</HelperText>
    <Field
      disabled={isFormLoading}
      fullWidth
      label="Extra Chat Bubble Text"
      margin="normal"
      max={characterLimits.main.chatBubble}
      name="chatBubbleExtraText"
      onChange={setFieldValue}
      value={form.chatBubbleExtraText}
    />
    <HelperText>{'Additional text bubble. Pops up after the first one.'}</HelperText>
  </Section>
)

const MainForm = compose(
  shouldUpdate((props, nextProps) => {
    const ignoreForm = ['navigationItemsAttributes', '__persona']
    return (
      props.isCropping !== nextProps.isCropping ||
      props.isFormLoading !== nextProps.isFormLoading ||
      !shallowEqual(omit(props.form, ignoreForm), omit(nextProps.form, ignoreForm)) ||
      !shallowEqual(props.form.__persona, nextProps.form.__persona)
    )
  })
)(MainFormTemplate)

const NavigationForm = ({
  addNavigationItem,
  formRef,
  form,
  setFieldValue,
  selectPersona,
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
  <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
    <MainForm
      form={omit(form, ['navigationItemsAttributes'])}
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      selectPersona={selectPersona}
      setFieldValue={setFieldValue}
      title={title}
    />
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
    uploadSubPicture: () => async ({ blob, setProgress, subform }) => {
      if (blob) {
        const picUrl = await uploadPicture({
          blob,
          setProgress,
          type: 'navigation-items-pics',
        })
        return {
          ...subform,
          picUrl,
        }
      }
    },
  }),
  withHandlers({
    uploadSubPictures: ({ navigationItemsPictures, uploadSubPicture }) => form => {
      return navigationItemsPictures.map(async ({ blob, index, setProgress }) => {
        form.navigationItemsAttributes[index] = await uploadSubPicture({
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
        chatBubbleExtraText: json.chatBubbleExtraText || '',
        __persona: json.persona,
        navigationItemsAttributes: json.navigationItemsAttributes.map(navigationItem => ({
          id: navigationItem.id,
          text: navigationItem.text || '',
          url: navigationItem.url || '',
          picUrl: navigationItem.picUrl || '',
        })),
      }
    },
    saveFormObject: ({ saveFormObject, uploadSubPictures, setNavigationItemsPictures }) => async form => {
      await Promise.all(uploadSubPictures(form))
      setNavigationItemsPictures([])
      return saveFormObject(form)
    },
    afterFormMount: ({ convertPersona, setPersona }) => formObject => {
      setPersona(convertPersona(formObject.__persona))
    },
  }),
  withForm({
    personaId: '',
    name: '',
    chatBubbleText: '',
    chatBubbleExtraText: '',
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
    Actions: (
      <Actions
        isFormSubmitting={isFormSubmitting}
        onFormSubmit={onFormSubmit}
        saveDisabled={isFormSubmitting || isCropping || isFormLoading}
      />
    ),
    backRoute,
    title,
  }))
)(NavigationSuperForm)
