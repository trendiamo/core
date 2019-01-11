import CircularProgress from 'shared/circular-progress'
import NavigationItem from './navigation-item'
import PluginPreview from 'shared/plugin-preview'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import Select from 'shared/select'
import styled from 'styled-components'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemContainer, Form } from 'shared/form-elements'
import { apiNavigationItemSort, apiPersonasAutocomplete } from 'utils'
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { createGlobalStyle } from 'styled-components'
import { findIndex } from 'lodash'
import { FormHelperText, Grid, TextField } from '@material-ui/core'
import { Navigation } from 'plugin-base'
import { uploadImage } from 'shared/picture-uploader'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const NavigationItemsList = styled.ul`
  padding: 0;
`

const SortableNavigationItem = SortableElement(({ navigationItemIndex, ...props }) => (
  <NavigationItem index={navigationItemIndex} {...props} />
))

const NavigationItemsContainer = compose(
  withProps(() => ({
    lockAxis: 'y',
    lockToContainerEdges: true,
    lockOffset: '0%',
  }))
)(
  SortableContainer(
    ({
      isFormLoading,
      setNavigationItemForm,
      navigationItemsPictures,
      setNavigationItemsPictures,
      isCropping,
      setIsCropping,
      setPicture,
      form,
    }) => (
      <NavigationItemsList>
        {form.navigationItemsAttributes.map((navigationItem, index) => (
          <SortableNavigationItem
            allowDelete={form.navigationItemsAttributes.length > 1}
            index={index}
            isCropping={isCropping}
            isFormLoading={isFormLoading}
            key={navigationItem.id}
            navigationItem={navigationItem}
            navigationItemIndex={index}
            navigationItemsPictures={navigationItemsPictures}
            onChange={setNavigationItemForm}
            setIsCropping={setIsCropping}
            setNavigationItemsPictures={setNavigationItemsPictures}
            setPicture={setPicture}
          />
        ))}
      </NavigationItemsList>
    )
  )
)

const NavigationsRowStyle = createGlobalStyle`
  .sortable-navigation-row {
    z-index: 1;
  }
`

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
      <NavigationsRowStyle />
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
      <Select
        autocomplete={apiPersonasAutocomplete}
        defaultValue={form.__persona && { value: form.__persona.id, label: form.__persona.name }}
        disabled={isFormLoading}
        label="Persona"
        onChange={selectPersona}
        placeholder="Choose a persona..."
        required
      />
      <FormHelperText>{'The persona will appear in the launcher, and in the cover.'}</FormHelperText>
    </Section>
    <NavigationItemsContainer
      form={form}
      helperClass="sortable-navigation-row"
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

const transform = navigationItems =>
  navigationItems.map(e => ({
    id: e.id || 'new',
    text: e.text,
    url: e.url,
    picture: { url: e.picUrl || '/img/icons/placeholder_product.png' },
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
      <PluginPreview>
        <Navigation
          navigationItems={transform(form.navigationItemsAttributes)}
          onTileClick={onTileClick}
          persona={persona}
        />
      </PluginPreview>
    </Grid>
  </Grid>
))

const emptyPersona = {
  name: '',
  profilePic: {
    url: '/img/icons/placeholder_avatar.png',
  },
}

export default compose(
  withOnboardingHelp({ single: true, stepName: 'navigations', stageName: 'initial' }),
  withProps({ formRef: React.createRef() }),
  withState('errors', 'setErrors', null),
  withState('isCropping', 'setIsCropping', false),
  withState('navigationItemsPictures', 'setNavigationItemsPictures', []),
  withState('persona', 'setPersona', emptyPersona),
  withHandlers({
    convertPersona: () => persona => ({
      name: persona ? persona.name : '',
      description: persona ? persona.description : '',
      profilePic: {
        url: persona ? persona.profilePicUrl : emptyPersona.profilePic.url,
      },
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
    loadFormObject: ({ convertPersona, loadFormObject, setPersona }) => async () => {
      const result = await loadFormObject()
      setPersona(convertPersona(result.__persona))
      return result
    },
    saveFormObject: ({ saveFormObject, setErrors, uploadSubImages }) => async form => {
      await Promise.all(uploadSubImages(form))
      return saveFormObject(form, { setErrors })
    },
  }),
  withForm({
    personaId: '',
    name: '',
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
    selectPersona: ({ convertPersona, form, setForm, setPersona }) => ({ value }) => {
      setForm({
        ...form,
        personaId: value.id,
      })
      setPersona(convertPersona(value))
    },
    onFormSubmit: ({ formRef, history, onFormSubmit }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result.error && !result.errors) history.push(routes.navigationsList())
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
    onSortEnd: ({ setForm, form }) => async ({ oldIndex, newIndex }) => {
      const orderedNavigationItems = arrayMove(form.navigationItemsAttributes, oldIndex, newIndex)
      const orderedIds = orderedNavigationItems.map(item => item.id)
      setForm({ ...form, navigationItemsAttributes: orderedNavigationItems })
      await apiNavigationItemSort({ ids: orderedIds })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ breadcrumbs, isCropping, isFormLoading, onFormSubmit }) => ({
    Actions: <Actions onFormSubmit={onFormSubmit} saveDisabled={isCropping || isFormLoading} />,
    breadcrumbs,
  })),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  }))
)(NavigationSuperForm)
