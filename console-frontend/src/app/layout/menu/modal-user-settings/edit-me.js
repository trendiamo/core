import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import ImageUploader from 'shared/image-uploader'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import useForm from 'ext/hooks/use-form'
import WhiteButton from 'shared/white-button'
import { apiMe, apiMeUpdate, apiRequest, atLeastOneNonBlankCharInputProps } from 'utils'
import { Field, Select } from 'shared/form-elements'
import { Prompt } from 'react-router'
import { TextField } from '@material-ui/core'
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
    imgUrl: json.imgUrl || '',
    imgRect: json.imgRect || {},
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
      <TextField
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
      <TextField
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
      {auth.isAffiliate && (
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
        <WhiteButton inline onClick={togglePasswordForm} variant="contained">
          {'Change Password'}
        </WhiteButton>
      </ActionContainer>
    </form>
  )
}

export default EditMe
