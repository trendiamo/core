import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import NavigationItem from './navigation-item'
import PluginPreview from 'shared/plugin-preview'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, AddItemContainer, Field, Form, HelperText } from 'shared/form-elements'
import { apiPersonasAutocomplete, atLeastOneNonBlankCharRegexp } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import { findIndex, omit } from 'lodash'
import { Grid } from '@material-ui/core'
import { Navigation } from 'plugin-base'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'
import { uploadPicture } from 'shared/picture-uploader'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
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

const options = { suggestionItem: 'withAvatar' }

const MainSection = ({ title, isFormLoading, setFieldValue, form, isCropping, selectPersona }) => (
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
      options={options}
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

const BaseNavigationForm = ({
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
    <MainSection
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

const onTileClick = ({ url }) => window.open(url, '_blank')

const defaultForm = {
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
}

const convertPersona = persona => ({
  name: persona ? persona.name : defaults.persona.name,
  description: persona ? persona.description : defaults.persona.description,
  profilePic: {
    url: persona ? persona.profilePicUrl : defaults.persona.profilePic.url,
  },
  instagramUrl: persona ? persona.instagramUrl : '',
})

const uploadSubPicture = async ({ blob, setProgress, subform }) => {
  if (blob) {
    const picUrl = await uploadPicture({
      blob,
      setProgress,
    })
    return {
      ...subform,
      picUrl,
    }
  }
}

const formObjectTransformer = json => {
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
}

const NavigationForm = ({ backRoute, title, loadFormObject, location, saveFormObject }) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'navigations', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)

  const formRef = useRef()

  const [isCropping, setIsCropping] = useState(false)
  const [navigationItemsPictures, setNavigationItemsPictures] = useState([])
  const [persona, setPersona] = useState(defaults.persona)

  const uploadSubPictures = useCallback(
    form => {
      return navigationItemsPictures.map(async ({ blob, index, setProgress }) => {
        form.navigationItemsAttributes[index] = await uploadSubPicture({
          subform: form.navigationItemsAttributes[index],
          blob,
          setProgress,
        })
      })
    },
    [navigationItemsPictures]
  )

  const newSaveFormObject = useCallback(
    async form => {
      await Promise.all(uploadSubPictures(form))
      setNavigationItemsPictures([])
      return saveFormObject(form)
    },
    [saveFormObject, uploadSubPictures]
  )

  const afterFormMount = useCallback(formObject => {
    setPersona(convertPersona(formObject.__persona))
  }, [])

  const {
    form,
    isFormLoading,
    isFormPristine,
    isFormSubmitting,
    setForm,
    onFormSubmit,
    setFieldValue,
    setIsFormSubmitting,
  } = useForm({ afterFormMount, formObjectTransformer, defaultForm, loadFormObject, saveFormObject: newSaveFormObject })

  const addNavigationItem = useCallback(
    () => {
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
    [form, setForm]
  )

  const setNavigationItemForm = useCallback(
    (navigationItem, index) => {
      const newNavigationItemsAttributes = [...form.navigationItemsAttributes]
      newNavigationItemsAttributes[index] = navigationItem
      setForm({ ...form, navigationItemsAttributes: newNavigationItemsAttributes })
    },
    [form, setForm]
  )

  const selectPersona = useCallback(
    selected => {
      selected &&
        setForm({
          ...form,
          personaId: selected.value.id,
        })
      selected && setPersona(convertPersona(selected.value))
    },
    [form, setForm]
  )

  const newOnFormSubmit = useCallback(
    async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      setIsFormSubmitting(false)
      if (result.error || result.errors) return
      if (location.pathname !== routes.navigationEdit(result.id)) history.push(routes.navigationEdit(result.id))
      return result
    },
    [location.pathname, onFormSubmit, setIsFormSubmitting]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={newOnFormSubmit}
          saveDisabled={isFormSubmitting || isCropping || isFormLoading}
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isCropping, isFormLoading, isFormSubmitting, newOnFormSubmit, title]
  )
  useAppBarContent(appBarContent)

  const setPicture = useCallback(
    (index, blob, setProgress) => {
      const picture = { index, blob, setProgress }
      let newNavigationItemsPictures = [...navigationItemsPictures]
      const navigationItemsPictureIndex = findIndex(newNavigationItemsPictures, { index })
      navigationItemsPictureIndex >= 0
        ? newNavigationItemsPictures.splice(navigationItemsPictureIndex, 1, picture)
        : newNavigationItemsPictures.push(picture)
      setNavigationItemsPictures(newNavigationItemsPictures)
    },
    [navigationItemsPictures]
  )

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const orderedNavigationItems = arrayMove(form.navigationItemsAttributes, oldIndex, newIndex)
      setForm({ ...form, navigationItemsAttributes: orderedNavigationItems })
    },
    [form, setForm]
  )

  if (isFormLoading) return <CircularProgress />

  return (
    <Grid container spacing={24}>
      <Grid item md={6} xs={12}>
        <BaseNavigationForm
          addNavigationItem={addNavigationItem}
          form={form}
          isFormPristine={isFormPristine}
          onFormSubmit={newOnFormSubmit}
          onSortEnd={onSortEnd}
          selectPersona={selectPersona}
          setFieldValue={setFieldValue}
          setIsCropping={setIsCropping}
          setNavigationItemForm={setNavigationItemForm}
          setPicture={setPicture}
        />
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
  )
}

export default withRouter(NavigationForm)
