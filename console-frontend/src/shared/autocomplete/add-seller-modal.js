import BaseSellerForm from 'shared/base-seller-form'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import Dialog from 'shared/dialog'
import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import useForm from 'ext/hooks/use-form'
import { apiRequest, apiSellerCreate } from 'utils'
import { useSnackbar } from 'notistack'

const StyledButton = styled(Button)`
  margin: 2rem 0 0.5rem;
`

const formObjectTransformer = json => {
  return {
    id: json.id,
    name: json.name || '',
    bio: json.bio || '',
    profilePic: { url: json.profilePic.url || '' },
    picRect: json.picRect || {},
    profilePicAnimation: { url: json.profilePicAnimation.url || '' },
    instagramUrl: json.instagramUrl || '',
    lockVersion: json.lockVersion,
  }
}

const loadFormObject = () => {
  return {
    name: '',
    bio: '',
    profilePic: { url: '' },
    profilePicAnimation: { url: '' },
    instagramUrl: '',
    picRect: {},
  }
}

const AddSellerForm = ({ closeModal, selectSeller }) => {
  const formRef = useRef()
  const [isCropping, setIsCropping] = useState(false)
  const [isUploaderLoading, setIsUploaderLoading] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const saveFormObject = useCallback(
    form => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiSellerCreate, [{ seller: form }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError)
          enqueueSnackbar('Successfully created and selected seller', { variant: 'success' })
        return json
      })()
    },
    [enqueueSnackbar]
  )

  const { form, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, setFieldValue, mergeForm } = useForm({
    formObjectTransformer,
    loadFormObject,
    saveFormObject,
  })

  const newOnFormSubmit = useCallback(
    event => {
      return (async () => {
        if (!formRef.current.reportValidity()) return
        const seller = await onFormSubmit(event)
        if (!seller || seller.error || seller.errors) return
        selectSeller({ label: seller.name, value: seller })
        closeModal()
        return seller
      })()
    },
    [closeModal, onFormSubmit, selectSeller]
  )

  if (isFormLoading) return <CircularProgress />

  return (
    <>
      <BaseSellerForm
        form={form}
        formRef={formRef}
        isCropping={isCropping}
        isFormLoading={isFormLoading}
        isFormPristine={isFormPristine}
        isUploaderLoading={isUploaderLoading}
        mergeForm={mergeForm}
        onFormSubmit={newOnFormSubmit}
        setFieldValue={setFieldValue}
        setIsCropping={setIsCropping}
        setIsUploaderLoading={setIsUploaderLoading}
      />
      <StyledButton
        color="primaryGradient"
        disabled={isFormLoading || isCropping || isFormPristine || isFormSubmitting || isUploaderLoading}
        isFormPristine={isFormPristine}
        isFormSubmitting={isFormSubmitting}
        onClick={newOnFormSubmit}
        type="submit"
        variant="contained"
      >
        {'Add seller'}
      </StyledButton>
    </>
  )
}

const AddSellerModal = ({ onChange, open, selectItem, setOpen }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  const selectSeller = useCallback(
    selected => {
      onChange(selected)
      selectItem(selected)
    },
    [onChange, selectItem]
  )

  return (
    <Dialog
      content={<AddSellerForm closeModal={handleClose} selectSeller={selectSeller} />}
      fullWidth
      handleClose={handleClose}
      maxWidth="sm"
      open={open}
      title="Add a new seller"
    />
  )
}

export default AddSellerModal
