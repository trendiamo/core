import CircularProgress from 'shared/circular-progress'
import PluginPreview from 'shared/plugin-preview'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import Select from 'shared/select'
import Spotlight from './spotlight'
import styled from 'styled-components'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import withForm from 'ext/recompose/with-form'
import { Actions, AddItemContainer, Form } from 'shared/form-elements'
import { apiPersonasAutocomplete, apiSpotlightSort } from 'utils'
import { arrayMove, SortableContainer, SortableElement } from 'react-sortable-hoc'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { createGlobalStyle } from 'styled-components'
import { FormHelperText, Grid, TextField } from '@material-ui/core'
import { history as pluginHistory, routes as pluginRoutes, Showcase as ShowcaseBase } from 'plugin-base'
import { uploadImage } from 'shared/picture-uploader'
import { withOnboardingHelp } from 'ext/recompose/with-onboarding'
import { withRouter } from 'react-router'

const SpotlightsList = styled.ul`
  padding: 0;
`

const SortableSpotlight = SortableElement(({ spotlightIndex, ...props }) => (
  <Spotlight index={spotlightIndex} {...props} />
))

const SpotlightsContainer = compose(
  withProps(() => ({
    lockAxis: 'y',
    lockToContainerEdges: true,
    lockOffset: '0%',
  }))
)(
  SortableContainer(
    ({
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
      <SpotlightsList>
        {form.spotlightsAttributes.map((spotlight, index) => (
          <SortableSpotlight
            allowDelete={form.spotlightsAttributes.length > 1}
            index={index}
            isCropping={isCropping}
            isFormLoading={isFormLoading}
            key={spotlight.id}
            onChange={setSpotlightForm}
            onFocus={onFocus({ spotlight: { ...spotlight, id: spotlight.id || index } })}
            personas={personas}
            productPicksPictures={productPicksPictures}
            setIsCropping={setIsCropping}
            setProductPicksPictures={setProductPicksPictures}
            spotlight={spotlight}
            spotlightIndex={index}
          />
        ))}
      </SpotlightsList>
    )
  )
)

const SpotlightsRowStyle = createGlobalStyle`
  .sortable-spotlight-row {
    z-index: 1;
  }
`

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
    <Section title={title}>
      <SpotlightsRowStyle />
      <TextField
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
      <FormHelperText>{'The name is useful for you to reference this module in a trigger.'}</FormHelperText>
      <Select
        autocomplete={apiPersonasAutocomplete}
        defaultValue={form.__persona && { value: form.__persona.id, label: form.__persona.name }}
        disabled={isCropping || isFormLoading}
        label="Persona"
        onChange={selectPersona}
        onFocus={onBackClick}
        placeholder="Choose a persona"
        required
      />
      <FormHelperText>{'The persona will appear in the launcher, and in the cover.'}</FormHelperText>
      <TextField
        disabled={isCropping || isFormLoading}
        fullWidth
        label="Title"
        margin="normal"
        name="title"
        onChange={setFieldValue}
        onFocus={onBackClick}
        required
        value={form.title}
      />
      <FormHelperText>{'The title is shown in the cover.'}</FormHelperText>
      <TextField
        disabled={isCropping || isFormLoading}
        fullWidth
        label="Subtitle"
        margin="normal"
        name="subtitle"
        onChange={setFieldValue}
        onFocus={onBackClick}
        required
        value={form.subtitle}
      />
      <FormHelperText>{'The subtitle is shown in the cover, below the title.'}</FormHelperText>
    </Section>
    <SpotlightsContainer
      form={form}
      helperClass="sortable-spotlight-row"
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
  spotlightText: 'Spotlight text',
  productName: 'Product Name',
  productDescription: 'Product Description',
  productPrice: '$0.00',
  title: 'Title',
  subtitle: 'Subtitle',
}

const preview = {
  spotlights(showcase) {
    const newSpotlights = showcase.spotlightsAttributes.map((spotlight, spotlightId) => {
      const productPicks = this.productPicks(spotlight)
      const profilePic = spotlight.__persona && (spotlight.__persona.profilePic || spotlight.__persona.profilePicUrl)
      const personaName = spotlight.__persona && spotlight.__persona.name
      return {
        ...spotlight,
        id: spotlight.id || spotlightId,
        productPicks,
        text: spotlight.text || defaults.spotlightText,
        persona: {
          ...spotlight.__persona,
          name: personaName || defaults.spotlightName,
          profilePic: { url: profilePic || defaults.avatarPic },
        },
        translation: {
          selectedBy: `Products selected by ${personaName && personaName.split(' ')[0]}`,
        },
      }
    })
    return { ...showcase, spotlights: newSpotlights }
  },
  productPicks(spotlight) {
    return spotlight.productPicksAttributes.map((product, productId) => {
      return {
        ...product,
        id: product.id || productId,
        name: product.name || defaults.productName,
        description: product.description || defaults.productDescription,
        displayPrice: product.displayPrice || defaults.productPrice,
        picture: { url: product.picUrl || defaults.productPic },
      }
    })
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
      const productPickPhotoUrl = await uploadImage({
        blob,
        setProgress,
        type: 'products-pics',
        defaultValue: subform.picUrl,
      })
      return {
        ...subform,
        picUrl: productPickPhotoUrl,
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
    saveFormObject: ({ saveFormObject, setErrors, uploadSubImages }) => async form => {
      await Promise.all(uploadSubImages(form))
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
    setSpotlightForm: ({ form, setForm }) => (spotlight, index) => {
      const newSpotlightsAttributes = [...form.spotlightsAttributes]
      newSpotlightsAttributes[index] = spotlight
      setForm({ ...form, spotlightsAttributes: newSpotlightsAttributes })
    },
  }),
  withRouter,
  withHandlers({
    selectPersona: ({ form, setForm }) => ({ value }) => {
      setForm({
        ...form,
        personaId: value.id,
      })
    },
    onFormSubmit: ({ formRef, history, onFormSubmit }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      if (!result.error && !result.errors) history.push(routes.showcasesList())
      return result
    },
    onSortEnd: ({ setForm, form }) => async ({ oldIndex, newIndex }) => {
      const orderedSpotlights = arrayMove(form.spotlightsAttributes, oldIndex, newIndex)
      const orderedIds = orderedSpotlights.map(spotlight => spotlight.id)
      setForm({ ...form, spotlightsAttributes: orderedSpotlights })
      await apiSpotlightSort({ ids: orderedIds })
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
  withAppBarContent(({ breadcrumbs, isCropping, isFormLoading, onFormSubmit }) => ({
    Actions: <Actions onFormSubmit={onFormSubmit} saveDisabled={isCropping || isFormLoading} />,
    breadcrumbs,
  })),
  lifecycle({
    componentDidMount() {
      const { form } = this.props
      pluginHistory.replace(pluginRoutes.showcase(form.id))
    },
  }),
  withProps(({ breadcrumbs }) => ({
    title: breadcrumbs.slice(-1)[0].text,
  }))
)(Showcase)
