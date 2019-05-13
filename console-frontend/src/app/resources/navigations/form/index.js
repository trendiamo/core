import BaseNavigationForm from './base'
import CircularProgress from 'shared/circular-progress'
import PluginPreview from 'shared/plugin-preview'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { findIndex } from 'lodash'
import { Grid } from '@material-ui/core'
import { Navigation } from 'plugin-base'
import { uploadPicture } from 'shared/picture-uploader'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

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
    lockVersion: json.lockVersion,
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
    mergeForm,
    mergeFormCallback,
    onFormSubmit,
    setFieldValue,
    setIsFormSubmitting,
  } = useForm({ afterFormMount, formObjectTransformer, defaultForm, loadFormObject, saveFormObject: newSaveFormObject })

  const addNavigationItem = useCallback(
    () => {
      mergeFormCallback(form => ({
        navigationItemsAttributes: [
          ...form.navigationItemsAttributes,
          {
            text: '',
            url: '',
            picUrl: '',
          },
        ],
      }))
    },
    [mergeFormCallback]
  )

  const setNavigationItemForm = useCallback(
    (navigationItem, index) => {
      mergeFormCallback(form => {
        const newNavigationItemsAttributes = [...form.navigationItemsAttributes]
        newNavigationItemsAttributes[index] = navigationItem
        return { navigationItemsAttributes: newNavigationItemsAttributes }
      })
    },
    [mergeFormCallback]
  )

  const selectPersona = useCallback(
    selected => {
      selected &&
        mergeForm({
          personaId: selected.value.id,
        })
      selected && setPersona(convertPersona(selected.value))
    },
    [mergeForm]
  )

  const newOnFormSubmit = useCallback(
    async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      setIsFormSubmitting(false)
      if (!result || result.error || result.errors) return
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
      mergeFormCallback(form => {
        const orderedNavigationItems = arrayMove(form.navigationItemsAttributes, oldIndex, newIndex)
        return { navigationItemsAttributes: orderedNavigationItems }
      })
    },
    [mergeFormCallback]
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
