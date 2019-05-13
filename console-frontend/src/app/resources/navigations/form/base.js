import Autocomplete from 'shared/autocomplete'
import characterLimits from 'shared/character-limits'
import NavigationItem from './navigation-item'
import React from 'react'
import Section from 'shared/section'
import { AddItemContainer, Field, Form } from 'shared/form-elements'
import { apiPersonasAutocomplete, atLeastOneNonBlankCharRegexp } from 'utils'
import { FormHelperText } from '@material-ui/core'
import { omit } from 'lodash'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const options = { suggestionItem: 'withAvatar' }

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
    <FormHelperText>{'The name is useful for you to reference this module in a trigger.'}</FormHelperText>
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
    <FormHelperText>{'The title will appear at the top of the navigation.'}</FormHelperText>
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
    <FormHelperText>{'The persona will appear in the launcher, and in the cover.'}</FormHelperText>
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
    <FormHelperText>{'Shows as a text bubble next to the plugin launcher.'}</FormHelperText>
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
    <FormHelperText>{'Additional text bubble. Pops up after the first one.'}</FormHelperText>
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

export default BaseNavigationForm
