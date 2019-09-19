import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import ImageUploader from 'shared/image-uploader'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import useForm from 'ext/hooks/use-form'
import { apiMe, apiMeUpdate, apiRequest, atLeastOneNonBlankCharInputProps } from 'utils'
import { Field, FormHelperText } from 'shared/form-elements'
import { Prompt } from 'react-router'
import { Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const ActionContainer = styled.div`
  margin: 16px 0 10px;
`

const formObjectTransformer = json => {
  return {
    imgUrl: json.img.url || '',
    imgRect: json.imgRect || {},
    bio: json.bio || '',
  }
}

const Content = ({ handleClose, sendUpgradeRequest }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [isCropping, setIsCropping] = useState(false)
  const [isUploaderLoading, setIsUploaderLoading] = useState(false)

  const saveFormObject = useCallback(
    async form => {
      const { json, errors, requestError } = await apiRequest(apiMeUpdate, [{ user: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        auth.setUser(json)
        sendUpgradeRequest()
        handleClose()
      }
      return json
    },
    [enqueueSnackbar, handleClose, sendUpgradeRequest]
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
      <Typography variant="body2">{"We'll need the following data for you to become a seller:"}</Typography>
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
        disabled={isFormLoading || isCropping || isUploaderLoading}
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Bio"
        name="bio"
        onChange={setFieldValue}
        required
        value={form.bio}
      />
      <FormHelperText>{'A short text that will be shown near your name.'}</FormHelperText>
      <ActionContainer>
        <Button
          color="primaryGradient"
          disabled={isFormLoading || isCropping || isFormPristine || isFormSubmitting || isUploaderLoading}
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          type="submit"
          variant="contained"
        >
          {'Submit Request'}
        </Button>
      </ActionContainer>
    </form>
  )
}

export default Content
