import BaseSellerForm from 'shared/base-seller-form'
import CircularProgress from 'shared/circular-progress'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions } from 'shared/form-elements'
import { useHistory, useLocation } from 'react-router-dom'
import { useOnboardingConsumer, useOnboardingHelp } from 'ext/hooks/use-onboarding'

const formObjectTransformer = json => {
  return {
    id: json.id,
    name: json.name || '',
    bio: json.bio || '',
    img: { url: json.img.url || '' },
    imgRect: json.imgRect || {},
    animatedImg: { url: json.animatedImg.url || '' },
    instagramUrl: json.instagramUrl || '',
    lockVersion: json.lockVersion,
  }
}

const SellerForm = ({ backRoute, loadFormObject, onboardingCreate, saveFormObject, title }) => {
  const history = useHistory()
  const location = useLocation()

  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'sellers', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)

  const formRef = useRef()
  const [isCropping, setIsCropping] = useState(false)
  const [isUploaderLoading, setIsUploaderLoading] = useState(false)

  const { form, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, setFieldValue, mergeForm } = useForm({
    formObjectTransformer,
    loadFormObject,
    saveFormObject,
  })

  const { onboarding, setOnboarding } = useOnboardingConsumer()

  const newOnFormSubmit = useCallback(
    event => {
      return (async () => {
        if (!formRef.current.reportValidity()) return
        const result = await onFormSubmit(event)
        if (!result || result.error || result.errors) return
        setTimeout(() => {
          if (onboardingCreate && onboarding.stageIndex < 2 && !onboarding.run) {
            setOnboarding({ ...onboarding, stageIndex: 1, run: true })
          }
        }, 0)
        if (location.pathname !== routes.sellerEdit(result.id)) history.push(routes.sellerEdit(result.id))
        return result
      })()
    },
    [history, location.pathname, onFormSubmit, onboarding, onboardingCreate, setOnboarding]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={newOnFormSubmit}
          saveDisabled={isFormSubmitting || isFormLoading || isCropping || isFormPristine || isUploaderLoading}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isCropping, isFormLoading, isFormPristine, isFormSubmitting, isUploaderLoading, newOnFormSubmit, title]
  )
  useAppBarContent(appBarContent)

  if (isFormLoading) return <CircularProgress />

  return (
    <Section title={title}>
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
    </Section>
  )
}

export default SellerForm
