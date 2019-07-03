import AppBase from 'app/base'
import ChatBase from 'app/content/simple-chat/chat-base'
import ChatModals from 'shared/chat-modals'
import data from 'special/assessment/data/delius'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import useChatActions from 'ext/hooks/use-chat-actions'
import { client, gql } from 'ext/hooks/use-graphql'
import { h } from 'preact'
import { isSmall } from 'utils'
import { SimpleChat, timeout, validateEmail } from 'plugin-base'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

const validateForm = (form, data) => {
  const requiredFields = data.filter(e => e.required).map(e => e.name)
  return !requiredFields.find(itemKey => form[itemKey] === '') && validateEmail(form.email)
}

const buildInquiryVariables = assessmentForm => {
  const fields = { ...assessmentForm }

  fields.url = location.href
  const sessionStorageTags = sessionStorage.getItem('frekkls-asmt-tags')
  fields.asmt = !!sessionStorageTags
  if (sessionStorageTags) {
    const tags = JSON.parse(sessionStorageTags)
    tags[0]
      .split('>')
      .slice(0, -1)
      .forEach((e, i) => {
        fields[`asmtStep${i + 1}Choice`] = e
      })
    fields.asmtStep3Choices = tags.map(tag => tag.split('>').pop()).join(', ')
  }

  return { fields }
}

const inquiryMutation = variables =>
  client
    .request(
      gql`
        mutation inquiry($fields: DeliusAsmtInquiryInput!) {
          inquiry(fields: $fields) {
            errors
          }
        }
      `,
      variables
    )
    .then(data => data)
    .catch(error => error)

const Plugin = ({ setShowingContent, showingBubbles, showingContent, showingLauncher }) => {
  const [isUnmounting, setIsUnmounting] = useState(false)
  const [assessmentForm, setAssessmentForm] = useState({})
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [ctaButtonDisabled, setCtaButtonDisabled] = useState(true)
  const [pluginState, setPluginState] = useState('closed')
  const [disappear, setDisappear] = useState(false)

  const module = useMemo(
    () => ({
      ...data.assessmentForm,
      launcher: isMessageSent ? data.assessmentForm.closedLauncher : data.assessmentForm.launcher,
    }),
    [isMessageSent]
  )

  const mergeAssessmentForm = useCallback(
    ({ item, data }) => {
      const newForm = { ...assessmentForm, ...item }
      setAssessmentForm(newForm)
      const isFormValid = validateForm(newForm, data)
      setCtaButtonDisabled(!isFormValid)
    },
    [assessmentForm]
  )

  const { clickActions, modalsProps } = useChatActions({ flowType: module.flowType, mergeAssessmentForm })

  useEffect(() => {
    const assessmentTags = sessionStorage.getItem('frekkls-asmt-tags')
    if (assessmentTags) setShowingContent(true)
    mixpanel.track('Loaded Plugin', {
      autoOpen: false,
      flowType: module.flowType,
      hash: location.hash,
      hostname: location.hostname,
    })

    const finalForm = {}
    const formMessages = []
    module.simpleChat.simpleChatSteps.forEach(step =>
      step.simpleChatMessages.forEach(
        message =>
          message.type === 'assessmentForm' && message.assessmentForm.forEach(field => formMessages.push(field))
      )
    )
    formMessages.map(item => (finalForm[item.name] = { value: '', required: item.required }))
    setAssessmentForm(finalForm)
  }, [module.flowType, module.simpleChat.simpleChatSteps, setShowingContent])

  const onToggleContent = useCallback(() => {
    if (isMessageSent) return
    mixpanel.track('Toggled Plugin', { hostname: location.hostname, action: showingContent ? 'close' : 'open' })
    mixpanel.time_event('Toggled Plugin')

    if (showingContent && isSmall()) {
      setIsUnmounting(true)
      return timeout.set(
        'exitOnMobile',
        () => {
          setIsUnmounting(false)
          setShowingContent(false)
        },
        400
      )
    }
    return setShowingContent(!showingContent)
  }, [isMessageSent, setShowingContent, showingContent])

  const onCtaButtonClick = useCallback(() => {
    const inquiryVariables = buildInquiryVariables(assessmentForm)
    const { country, message } = inquiryVariables.fields
    const tags = Object.keys(inquiryVariables.fields)
      .filter(key => key.startsWith('asmtStep'))
      .reduce((obj, key) => ({ ...obj, [key]: inquiryVariables.fields[key] }), {})

    inquiryMutation(inquiryVariables).then(() => {
      mixpanel.track('Submitted Form', { hostname: location.hostname, country, message, tags })
      setIsMessageSent(true)
      onToggleContent()
      setPluginState('closed')
      timeout.set('hideLauncher', () => setDisappear(true), 10000)
      sessionStorage.removeItem('frekkls-asmt-tags')
    })
  }, [assessmentForm, onToggleContent])

  return (
    <div>
      <ChatModals flowType={module.flowType} {...modalsProps} />
      <AppBase
        Component={
          <SimpleChat
            backButtonLabel={getFrekklsConfig().i18n.backButton}
            ChatBase={ChatBase}
            chatBaseProps={{ assessment: true }}
            clickActions={clickActions}
            coverMinimized={module.header.minimized}
            ctaButton={module.ctaButton}
            ctaButtonDisabled={ctaButtonDisabled}
            data={module}
            onCtaButtonClick={onCtaButtonClick}
          />
        }
        data={module}
        disappear={disappear}
        isUnmounting={isUnmounting}
        onToggleContent={onToggleContent}
        persona={module.launcher.persona}
        pluginState={pluginState}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
      />
    </div>
  )
}

export default Plugin
