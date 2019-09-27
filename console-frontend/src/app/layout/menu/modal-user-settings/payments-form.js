import ActionContainer from './action-container'
import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import ImageUploader from 'shared/image-uploader'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import useForm from 'ext/hooks/use-form'
import { apiMeDetails, apiMeUpdateDetails, apiRequest, atLeastOneNonBlankCharInputProps } from 'utils'
import { Field, Select } from 'shared/form-elements'
import { format } from 'date-fns'
import { Prompt } from 'react-router'
import { useSnackbar } from 'notistack'

const ImageContainer = styled.div`
  display: flex;
  > div {
    margin-right: 10px;
  }
`

const formObjectTransformer = json => {
  return {
    paymentFirstName: json.paymentFirstName || json.firstName || '',
    paymentLastName: json.paymentLastName || json.lastName || '',
    currency: json.currency || 'EUR',
    dateOfBirth: (json.dateOfBirth && format(new Date(json.dateOfBirth), 'yyyy-MM-dd')) || '',
    phoneNumber: json.phoneNumber || '',
    paymentAddress: json.paymentAddress || '',
    iban: json.iban || '',
    photoIdFrontUrl: json.photoIdFrontUrl || '',
    photoIdBackUrl: json.photoIdBackUrl || '',
  }
}

const currencyOptions = ['EUR', 'GBP', 'CHF', 'USD']

const ProfileForm = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [isCropping, setIsCropping] = useState(false)
  const [isUploaderLoading, setIsUploaderLoading] = useState(false)

  const saveFormObject = useCallback(
    async form => {
      if (!form.photoIdFrontUrl || !form.photoIdBackUrl) {
        enqueueSnackbar('The photos of your ID are required', { variant: 'error' })
        return
      }
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

  const { form, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, setFieldValue, mergeForm } = useForm({
    formObjectTransformer,
    loadFormObject,
    saveFormObject,
  })

  const setPhotoIdFrontUrl = useCallback(
    photo => {
      mergeForm({ photoIdFrontUrl: photo.url })
    },
    [mergeForm]
  )

  const setPhotoIdBackUrl = useCallback(
    photo => {
      mergeForm({ photoIdBackUrl: photo.url })
    },
    [mergeForm]
  )

  const photoIdFrontUrlValue = useMemo(() => ({ url: form.photoIdFrontUrl }), [form.photoIdFrontUrl])
  const photoIdBackUrlValue = useMemo(() => ({ url: form.photoIdBackUrl }), [form.photoIdBackUrl])

  const disabled = useMemo(() => isFormLoading || isCropping || isUploaderLoading, [
    isCropping,
    isFormLoading,
    isUploaderLoading,
  ])

  if (isFormLoading) return <CircularProgress />

  return (
    <form onSubmit={onFormSubmit}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <Field
        autoFocus
        disabled={disabled}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="First Name"
        name="paymentFirstName"
        onChange={setFieldValue}
        required
        value={form.paymentFirstName}
      />
      <Field
        disabled={disabled}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Last Name"
        name="paymentLastName"
        onChange={setFieldValue}
        required
        value={form.paymentLastName}
      />
      <Field
        disabled={disabled}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Date of birth"
        labelProps={{ shrink: true }}
        name="dateOfBirth"
        onChange={setFieldValue}
        required
        type="date"
        value={form.dateOfBirth}
      />
      <ImageContainer>
        <ImageUploader
          disabled={disabled}
          label="Photo ID Front"
          onChange={setPhotoIdFrontUrl}
          setDisabled={setIsCropping}
          setIsUploaderLoading={setIsUploaderLoading}
          value={photoIdFrontUrlValue}
        />
        <ImageUploader
          disabled={disabled}
          label="Photo ID Back"
          onChange={setPhotoIdBackUrl}
          setDisabled={setIsCropping}
          setIsUploaderLoading={setIsUploaderLoading}
          value={photoIdBackUrlValue}
        />
      </ImageContainer>
      <Field
        disabled={disabled}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Phone Number"
        name="phoneNumber"
        onChange={setFieldValue}
        required
        value={form.phoneNumber}
      />
      <Field
        disabled={disabled}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Complete Address"
        name="paymentAddress"
        onChange={setFieldValue}
        required
        value={form.paymentAddress}
      />
      {auth.isAffiliate() && (
        <Select
          disabled={disabled}
          fullWidth
          label="Currency"
          name="currency"
          onChange={setFieldValue}
          options={currencyOptions}
          required
          value={form.currency}
        />
      )}
      <Field
        disabled={disabled}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="IBAN"
        name="iban"
        onChange={setFieldValue}
        required
        value={form.iban}
      />
      <ActionContainer>
        <Button
          color="primaryGradient"
          disabled={disabled || isFormPristine || isFormSubmitting}
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
