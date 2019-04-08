import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import PluginPreview from 'shared/plugin-preview'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import Spotlight from './spotlight'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemContainer, Field, Form, HelperText } from 'shared/form-elements'
import { apiPersonasAutocomplete } from 'utils'
import { arrayMove } from 'react-sortable-hoc'
import {
  branch,
  compose,
  lifecycle,
  renderComponent,
  shouldUpdate,
  withHandlers,
  withProps,
  withState,
} from 'recompose'
import { Grid } from '@material-ui/core'
import { isEqual, omit } from 'lodash'
import { history as pluginHistory, routes as pluginRoutes, Showcase as ShowcaseBase } from 'plugin-base'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'
import { uploadImage } from 'shared/picture-uploader'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const SortableSpotlight = compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onChange', 'setProductPicksPictures', 'setIsCropping', 'onFocus', 'spotlight']
    return (
      !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps)) || !isEqual(props.spotlight, nextProps.spotlight)
    )
  })
)(SortableElement(Spotlight))

const Spotlights = ({
  allowDelete,
  isFormLoading,
  isCropping,
  setIsCropping,
  form,
  personas,
  setProductPicksPictures,
  productPicksPictures,
  setSpotlightForm,
  onFocus,
}) => (
  <div>
    {form.spotlightsAttributes.map((spotlight, index) => (
      <SortableSpotlight
        allowDelete={allowDelete}
        folded={spotlight.id}
        index={index}
        isCropping={isCropping}
        isFormLoading={isFormLoading}
        key={spotlight.id || `new-${index}`}
        onChange={setSpotlightForm}
        onFocus={onFocus({ spotlight: { ...spotlight, id: spotlight.id || `new-${index}` } })}
        personas={personas}
        productPicksPictures={productPicksPictures}
        setIsCropping={setIsCropping}
        setProductPicksPictures={setProductPicksPictures}
        sortIndex={index}
        spotlight={spotlight}
      />
    ))}
  </div>
)

const SpotlightsContainer = compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onFocus', 'onSortEnd', 'form', 'setIsCropping', 'setProductPicksPictures', 'setSpotlightForm']
    return (
      !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps)) ||
      !isEqual(props.form.spotlightsAttributes, nextProps.form.spotlightsAttributes)
    )
  }),
  withProps(({ form }) => ({ allowDelete: form.spotlightsAttributes.length > 1 }))
)(SortableContainer(Spotlights))

const MainFormTemplate = ({ title, isCropping, setFieldValue, onBackClick, form, isFormLoading, selectPersona }) => (
  <Section title={title}>
    <Field
      autoFocus
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Name"
      margin="normal"
      name="name"
      onChange={setFieldValue}
      onFocus={onBackClick}
      required
      value={form.name}
    />
    <HelperText>{'The name is useful for you to reference this module in a trigger.'}</HelperText>
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
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Title"
      margin="normal"
      max={characterLimits.main.title}
      name="title"
      onChange={setFieldValue}
      onFocus={onBackClick}
      required
      value={form.title}
    />
    <HelperText>{'The title is shown in the cover.'}</HelperText>
    <Field
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Subtitle"
      margin="normal"
      max={characterLimits.main.subtitle}
      name="subtitle"
      onChange={setFieldValue}
      onFocus={onBackClick}
      required
      value={form.subtitle}
    />
    <HelperText>{'The subtitle is shown in the cover, below the title.'}</HelperText>
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
    const ignoreProps = ['setFieldValue', 'selectPersona', 'onBackClick']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  })
)(MainFormTemplate)

const ShowcaseForm = ({
  selectPersona,
  onSpotlightClick,
  form,
  formRef,
  errors,
  isFormLoading,
  isFormPristine,
  onFormSubmit,
  setFieldValue,
  setSpotlightForm,
  addSpotlight,
  productPicksPictures,
  setProductPicksPictures,
  isCropping,
  setIsCropping,
  onBackClick,
  title,
  onSortEnd,
  personas,
}) => (
  <Form errors={errors} formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
    <MainForm
      form={omit(form, ['spotlightsAttributes'])}
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      onBackClick={onBackClick}
      selectPersona={selectPersona}
      setFieldValue={setFieldValue}
      title={title}
    />
    <SpotlightsContainer
      form={form}
      helperClass="sortable-element"
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      onFocus={onSpotlightClick}
      onSortEnd={onSortEnd}
      personas={personas}
      productPicksPictures={productPicksPictures}
      setIsCropping={setIsCropping}
      setProductPicksPictures={setProductPicksPictures}
      setSpotlightForm={setSpotlightForm}
      useDragHandle
    />
    <AddItemContainer disabled={isCropping || isFormLoading} message="Add new spotlight" onClick={addSpotlight} />
  </Form>
)

const defaults = {
  avatarPic: '/img/icons/placeholder_avatar.png',
  productPic: '/img/icons/placeholder_product.png',
  spotlightName: 'Persona Name',
  spotlightDescription: 'Persona Description',
  productName: 'Product Name',
  productDescription: 'Product Description',
  productPrice: '$0.00',
  title: 'Title',
  subtitle: 'Subtitle',
}

const preview = {
  spotlights(showcase) {
    const spotlights = showcase.spotlightsAttributes
      .map((spotlight, i) => {
        const productPicks = this.productPicks(spotlight)
        const profilePic = spotlight.__persona && (spotlight.__persona.profilePic || spotlight.__persona.profilePicUrl)
        const personaName = spotlight.__persona && spotlight.__persona.name
        const personaDescription = spotlight.__persona && spotlight.__persona.description
        if (spotlight._destroy) return null
        return {
          ...spotlight,
          id: spotlight.id || `new-${i}`,
          productPicks,
          persona: {
            ...spotlight.__persona,
            name: personaName || defaults.spotlightName,
            description: personaDescription || defaults.spotlightDescription,
            profilePic: { url: profilePic || defaults.avatarPic },
            profilePicUrl: profilePic || defaults.avatarPic,
          },
          translation: {
            selectedBy: `Products selected by ${personaName && personaName.split(' ')[0]}`,
          },
        }
      })
      .filter(e => e)
    return { ...showcase, spotlights }
  },
  productPicks(spotlight) {
    return spotlight.productPicksAttributes
      .map((productPick, i) => {
        if (productPick._destroy) return null
        return {
          ...productPick,
          id: productPick.id || `new-${i}`,
          name: productPick.name || defaults.productName,
          description: productPick.description || defaults.productDescription,
          displayPrice: productPick.displayPrice || defaults.productPrice,
          picture: { url: productPick.picUrl || defaults.productPic },
        }
      })
      .filter(e => e)
  },
}

const Showcase = ({ form, routeToSpotlight, routeToShowcase, previewCallbacks, ...props }) => (
  <Grid container spacing={24}>
    <Grid item md={6} xs={12}>
      <ShowcaseForm form={form} {...props} />
    </Grid>
    <Grid item md={6} xs={12}>
      <PluginPreview>
        <ShowcaseBase
          callbacks={previewCallbacks}
          history={pluginHistory}
          routeToShowcase={routeToShowcase}
          routeToSpotlight={routeToSpotlight}
          showcase={form}
          spotlights={preview.spotlights(form).spotlights}
          subtitle={form.subtitle || defaults.subtitle}
          title={form.title || defaults.title}
        />
      </PluginPreview>
    </Grid>
  </Grid>
)

export default compose(
  withProps({ formRef: React.createRef() }),
  withOnboardingHelp({ single: true, stepName: 'showcases', stageName: 'initial' }),
  withState('errors', 'setErrors', null),
  withState('isCropping', 'setIsCropping', false),
  withState('productPicksPictures', 'setProductPicksPictures', []),
  withHandlers({
    uploadSubImage: () => async ({ blob, setProgress, subform }) => {
      if (blob) {
        const productPickPhotoUrl = await uploadImage({
          blob,
          setProgress,
          type: 'products-pics',
        })
        return {
          ...subform,
          picUrl: productPickPhotoUrl,
        }
      }
    },
  }),
  withHandlers({
    uploadSubImages: ({ productPicksPictures, uploadSubImage }) => form => {
      return productPicksPictures.map(async ({ blob, productPickIndex, setProgress, spotlightIndex }) => {
        const { productPicksAttributes } = form.spotlightsAttributes[spotlightIndex]
        productPicksAttributes[productPickIndex] = await uploadSubImage({
          subform: productPicksAttributes[productPickIndex],
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
        name: json.name || '',
        personaId: (json.persona && json.persona.id) || '',
        title: json.title || '',
        subtitle: json.subtitle || '',
        chatBubbleText: json.chatBubbleText || '',
        chatBubbleExtraText: json.chatBubbleExtraText || '',
        __persona: json.persona,
        spotlightsAttributes: json.spotlightsAttributes.map(spotlight => ({
          id: spotlight.id,
          personaId: (spotlight.persona && spotlight.persona.id) || '',
          __persona: spotlight.persona,
          productPicksAttributes: spotlight.productPicksAttributes
            ? spotlight.productPicksAttributes.map(productPick => ({
                id: productPick.id,
                url: productPick.url || '',
                name: productPick.name || '',
                description: productPick.description || '',
                displayPrice: productPick.displayPrice || '',
                picUrl: productPick.picUrl || '',
              }))
            : [
                {
                  url: '',
                  name: '',
                  description: '',
                  displayPrice: '',
                  picUrl: '',
                },
              ],
        })),
      }
    },
    saveFormObject: ({ saveFormObject, setErrors, uploadSubImages, setProductPicksPictures }) => async form => {
      await Promise.all(uploadSubImages(form))
      setProductPicksPictures([])
      return saveFormObject(form, { setErrors })
    },
  }),
  withForm({
    name: '',
    chatBubbleText: '',
    chatBubbleExtraText: '',
    personaId: '',
    title: '',
    subtitle: '',
    spotlightsAttributes: [
      {
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
    setSpotlightForm: ({ form, setForm }) => (spotlight, index) => {
      const newSpotlightsAttributes = [...form.spotlightsAttributes]
      newSpotlightsAttributes[index] = spotlight
      setForm({ ...form, spotlightsAttributes: newSpotlightsAttributes })
    },
  }),
  withRouter,
  withHandlers({
    selectPersona: ({ form, setForm }) => selected => {
      selected &&
        setForm({
          ...form,
          personaId: selected.value.id,
        })
    },
    onFormSubmit: ({ location, formRef, history, onFormSubmit, setIsFormSubmitting }) => async event => {
      if (!formRef.current.reportValidity()) return
      setIsFormSubmitting(true)
      const result = await onFormSubmit(event)
      if (result.error || result.errors) return setIsFormSubmitting(false)
      pluginHistory.replace(pluginRoutes.showcase(result.id))
      if (location.pathname !== routes.showcaseEdit(result.id)) history.push(routes.showcaseEdit(result.id))
      setIsFormSubmitting(false)
      return result
    },
    onSortEnd: ({ setForm, form }) => ({ oldIndex, newIndex }) => {
      const orderedSpotlights = arrayMove(form.spotlightsAttributes, oldIndex, newIndex)
      setForm({ ...form, spotlightsAttributes: orderedSpotlights })
    },
    routeToShowcase: ({ form }) => () => pluginHistory.replace(pluginRoutes.showcase(form.id)),
    routeToSpotlight: ({ form }) => spotlight => pluginHistory.replace(pluginRoutes.spotlight(form.id, spotlight.id)),
  }),
  withHandlers({
    onBackClick: ({ form }) => () => {
      pluginHistory.replace(pluginRoutes.showcase(form.id))
    },
    onSpotlightClick: ({ routeToSpotlight }) => ({ spotlight }) => () => {
      if (spotlight.personaId) routeToSpotlight(spotlight)
    },
    onProductClick: () => ({ product }) => () => {
      window.open(product.url, '_blank')
    },
  }),
  withProps(({ onSpotlightClick, onProductClick }) => ({
    previewCallbacks: {
      onSpotlightClick,
      onProductClick,
    },
  })),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress)),
  withAppBarContent(({ backRoute, title, isCropping, isFormLoading, isFormSubmitting, onFormSubmit }) => ({
    Actions: <Actions onFormSubmit={onFormSubmit} saveDisabled={isFormSubmitting || isCropping || isFormLoading} />,
    backRoute,
    title,
  })),
  lifecycle({
    componentDidMount() {
      const { form } = this.props
      pluginHistory.replace(pluginRoutes.showcase(form.id))
    },
  })
)(Showcase)
