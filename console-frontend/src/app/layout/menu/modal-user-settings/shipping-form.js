import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import useForm from 'ext/hooks/use-form'
import { apiMeDetails, apiMeUpdateDetails, apiRequest, atLeastOneNonBlankCharInputProps } from 'utils'
import { Field } from 'shared/form-elements'
import { Prompt } from 'react-router'
import { useSnackbar } from 'notistack'

const ActionContainer = styled.div`
  margin: 16px 0 10px;
`

const formObjectTransformer = json => {
  return {
    shippingFirstName: json.shippingFirstName || json.firstName || '',
    shippingLastName: json.shippingLastName || json.lastName || '',
    addressLine1: json.addressLine1 || '',
    addressLine2: json.addressLine2 || '',
    zipCode: json.zipCode || '',
    city: json.city || '',
    country: json.country || '',
  }
}

const ProfileForm = () => {
  const { enqueueSnackbar } = useSnackbar()

  const saveFormObject = useCallback(
    async form => {
      const { json, errors, requestError } = await apiRequest(apiMeUpdateDetails, [{ user: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        enqueueSnackbar('Successfully updated personal info', { variant: 'success' })
      }
      return json
    },
    [enqueueSnackbar]
  )

  const loadFormObject = useCallback(
    async () => {
      const { json, requestError } = await apiRequest(apiMeDetails, [])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
        return {}
      }
      return json
    },
    [enqueueSnackbar]
  )

  const { form, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, setFieldValue } = useForm({
    formObjectTransformer,
    loadFormObject,
    saveFormObject,
  })

  if (isFormLoading) return <CircularProgress />

  return (
    <form onSubmit={onFormSubmit}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <Field
        autoFocus
        disabled={isFormLoading}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="First Name"
        name="shippingFirstName"
        onChange={setFieldValue}
        required
        value={form.shippingFirstName}
      />
      <Field
        disabled={isFormLoading}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Last Name"
        name="shippingLastName"
        onChange={setFieldValue}
        required
        value={form.shippingLastName}
      />
      <Field
        disabled={isFormLoading}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Address Line 1"
        name="addressLine1"
        onChange={setFieldValue}
        required
        value={form.addressLine1}
      />
      <Field
        disabled={isFormLoading}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Address Line 2"
        name="addressLine2"
        onChange={setFieldValue}
        value={form.addressLine2}
      />
      <Field
        disabled={isFormLoading}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="ZIP Code"
        name="zipCode"
        onChange={setFieldValue}
        required
        value={form.zipCode}
      />
      <Field
        disabled={isFormLoading}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="City"
        name="city"
        onChange={setFieldValue}
        required
        value={form.city}
      />
      <Field
        disabled={isFormLoading}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Country"
        name="country"
        onChange={setFieldValue}
        required
        value={form.country}
      />
      <ActionContainer>
        <Button
          color="primaryGradient"
          disabled={isFormLoading || isFormPristine || isFormSubmitting}
          inline
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          tooltipEnabled
          tooltipPlacement="right"
          tooltipText="No changes to save"
          type="submit"
          variant="contained"
        >
          {'Save'}
        </Button>
      </ActionContainer>
    </form>
  )
}

export default ProfileForm
