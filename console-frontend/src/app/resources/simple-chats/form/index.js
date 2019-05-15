import CircularProgress from 'shared/circular-progress'
import FormContainer from './form-container'
import PluginPreview from './plugin-preview'
import React, { useMemo } from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { formObject, formObjectTransformer } from './data-utils'
import { Grid } from '@material-ui/core'
import { useOnboardingHelp } from 'ext/hooks/use-onboarding'
import { withRouter } from 'react-router'

const SimpleChatForm = props => {
  const { backRoute, title, isFormLoading, isFormSubmitting, onFormSubmit, isFormPristine } = props
  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={onFormSubmit}
          saveDisabled={isFormSubmitting || isFormLoading || isFormPristine}
          tooltipEnabled
          tooltipText="No changes to save"
        />
      ),
      backRoute,
      title,
    }),
    [backRoute, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, title]
  )
  useAppBarContent(appBarContent)
  return (
    <Grid container spacing={24}>
      <Grid item md={6} xs={12}>
        <FormContainer {...props} />
      </Grid>
      <Grid item md={6} xs={12}>
        <PluginPreview {...props} />
      </Grid>
    </Grid>
  )
}

const SimpleChatForm1 = compose(
  withHandlers({
    setSimpleChatStepsForm: ({ form, setForm }) => (simpleChatStep, simpleChatStepIndex) => {
      let newsimpleChatStepsAttributes = [...form.simpleChatStepsAttributes]
      newsimpleChatStepsAttributes[simpleChatStepIndex] = simpleChatStep
      setForm({ ...form, simpleChatStepsAttributes: newsimpleChatStepsAttributes })
    },
    addSimpleChatStep: ({ form, setForm }) => () => {
      setForm({
        ...form,
        simpleChatStepsAttributes: [
          ...form.simpleChatStepsAttributes,
          { key: '', __key: `new-${form.simpleChatStepsAttributes.length}` },
        ],
      })
    },
  }),
  withHandlers({
    selectPersona: ({ form, setForm }) => selected => {
      selected &&
        setForm({
          ...form,
          personaId: selected.value.id,
          __persona: selected.value,
        })
    },
    onFormSubmit: ({ formRef, history, location, onFormSubmit, setIsFormSubmitting }) => async event => {
      if (!formRef.current.reportValidity()) return
      const result = await onFormSubmit(event)
      setIsFormSubmitting(false)
      if (!result || result.error || result.errors) return
      if (location.pathname !== routes.simpleChatEdit(result.id)) history.push(routes.simpleChatEdit(result.id))
      return result
    },
    onSortEnd: ({ setForm, form }) => ({ oldIndex, newIndex }) => {
      const orderedSimpleChatSteps = arrayMove(form.simpleChatStepsAttributes, oldIndex, newIndex)
      setForm({ ...form, simpleChatStepsAttributes: orderedSimpleChatSteps })
    },
    onToggleContent: ({ setShowingContent, showingContent }) => value => {
      setShowingContent(value !== undefined ? value : !showingContent)
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress))
)(SimpleChatForm)

const SimpleChatForm2 = props => {
  const formProps = useForm({ ...props, formObject })
  return <SimpleChatForm1 {...props} {...formProps} />
}

const SimpleChatForm3 = compose(
  withProps({ formRef: React.createRef() }),
  withState('showingContent', 'setShowingContent', false),
  withHandlers({ formObjectTransformer })
)(SimpleChatForm2)

const SimpleChatForm4 = ({ location, ...props }) => {
  const onboardingHelp = useMemo(
    () => ({ single: true, stepName: 'simpleChats', stageName: 'initial', pathname: location.pathname }),
    [location.pathname]
  )
  useOnboardingHelp(onboardingHelp)
  return <SimpleChatForm3 {...props} location={location} />
}

export default withRouter(SimpleChatForm4)
