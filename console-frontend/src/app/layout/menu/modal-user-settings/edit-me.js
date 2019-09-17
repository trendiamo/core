import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import ImageUploader from 'shared/image-uploader'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import useForm from 'ext/hooks/use-form'
import { apiMe, apiMeUpdate, apiRequest, atLeastOneNonBlankCharInputProps } from 'utils'
import { Field, FormHelperText, Select } from 'shared/form-elements'
import { Prompt } from 'react-router'
import { useSnackbar } from 'notistack'

const ActionContainer = styled.div`
  margin: 16px 0 10px;
`

const formObjectTransformer = json => {
  return {
    email: json.email || '',
    firstName: json.firstName || '',
    lastName: json.lastName || '',
    currency: json.currency || 'EUR',
    imgUrl: json.img.url || '',
    imgRect: json.imgRect || {},
    socialMediaUrl: json.socialMediaUrl || '',
    bio: json.bio || '',
  }
}

const currencyOptions = ['EUR', 'GBP', 'CHF', 'USD']

const inputProps = { pattern: '.*S+.*' }

const EditMe = ({ togglePasswordForm }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [isCropping, setIsCropping] = useState(false)
  const [isUploaderLoading, setIsUploaderLoading] = useState(false)

  const saveFormObject = useCallback(
    async form => {
      const { json, errors, requestError } = await apiRequest(apiMeUpdate, [{ user: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        enqueueSnackbar('Successfully updated personal info', { variant: 'success' })
        auth.setUser(json)
      }
      return json
    },
    [enqueueSnackbar]
  )

  const loadFormObject = useCallback(
    async () => {
      const { json, requestError } = await apiRequest(apiMe, [])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
        return {}
      }
      auth.setUser(json)
      return json
    },
    [enqueueSnackbar]
  )

  const { form, isFormLoading, isFormPristine, isFormSubmitting, mergeForm, onFormSubmit, setFieldValue } = useForm({
    formObjectTransformer,
    loadFormObject,
    saveFormObject,
  })

  const setImage = useCallback(
    image => {
      mergeForm({ imgUrl: image.url, imgRect: image.imgRect })
    },
    [mergeForm]
  )

  const imageUploaderValue = useMemo(() => ({ url: form.imgUrl, imgRect: form.imgRect }), [form.imgRect, form.imgUrl])

  if (isFormLoading) return <CircularProgress />

  return (
    <form onSubmit={onFormSubmit}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <ImageUploader
        aspectRatio={1}
        circle
        disabled={isFormLoading || isCropping || isUploaderLoading}
        isUserProfileImage
        label="Picture"
        onChange={setImage}
        setDisabled={setIsCropping}
        setIsUploaderLoading={setIsUploaderLoading}
        value={imageUploaderValue}
      />
      <Field
        disabled
        fullWidth
        id="email"
        inputProps={inputProps}
        label="Email"
        margin="normal"
        required
        value={form.email}
      />
      <Field
        autoFocus
        disabled={isFormLoading || isCropping || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="First Name"
        margin="normal"
        name="firstName"
        onChange={setFieldValue}
        required
        value={form.firstName}
      />
      <Field
        disabled={isFormLoading || isCropping || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Last Name"
        margin="normal"
        name="lastName"
        onChange={setFieldValue}
        required
        value={form.lastName}
      />
      {auth.isAffiliate() && (
        <>
          <Select
            disabled={isFormLoading || isCropping || isUploaderLoading}
            fullWidth
            label="Currency"
            margin="normal"
            name="currency"
            onChange={setFieldValue}
            options={currencyOptions}
            required
            value={form.currency}
          />
          <FormHelperText>
            {
              <>
                <b>{'Disclaimer: '}</b>
                {`Note that revenues and prices displayed throughout the platform are unified from different currencies
                the products may be sold in, thus they may slightly vary from day to day as they are calculated based on
                the daily updated exchange rate of that currency.`}
              </>
            }
          </FormHelperText>
          <Field
            disabled={isFormLoading || isCropping || isUploaderLoading}
            fullWidth
            label="Social Media URL"
            margin="normal"
            name="socialMediaUrl"
            onChange={setFieldValue}
            required
            type="URL"
            value={form.socialMediaUrl}
          />
        </>
      )}
      {auth.isSeller() && (
        <>
          <Field
            disabled={isFormLoading || isCropping || isUploaderLoading}
            fullWidth
            inputProps={atLeastOneNonBlankCharInputProps}
            label="Bio"
            margin="normal"
            name="bio"
            onChange={setFieldValue}
            required
            value={form.bio}
          />
          <FormHelperText>{'A short text that will be shown near your name.'}</FormHelperText>
        </>
      )}
      <ActionContainer>
        <Button
          color="primaryGradient"
          disabled={isFormLoading || isCropping || isFormPristine || isFormSubmitting || isUploaderLoading}
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
        <Button color="white" inline onClick={togglePasswordForm} variant="contained">
          {'Change Password'}
        </Button>
      </ActionContainer>
    </form>
  )
}

export default EditMe
