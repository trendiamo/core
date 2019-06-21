import AppBase from 'app/base'
import ChatBase from 'app/content/simple-chat/chat-base'
import ChatModals from 'shared/chat-modals'
import data from 'special/assessment/data/delius'
import getFrekklsConfig from 'frekkls-config'
import mixpanel from 'ext/mixpanel'
import useChatActions from 'ext/hooks/use-chat-actions'
import { h } from 'preact'
import { isSmall } from 'utils'
import { SimpleChat, timeout } from 'plugin-base'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

const validateForm = form => {
  const formKeys = Object.keys(form)
  const requiredFields = formKeys.filter(itemKey => form[itemKey].required)
  if (requiredFields.length === 0) return
  return requiredFields.find(itemKey => form[itemKey].value === '')
}

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
    form => {
      const newForm = { ...assessmentForm, ...form }
      setAssessmentForm(newForm)
      const formIsEmpty = validateForm(newForm)
      if (!ctaButtonDisabled && formIsEmpty) {
        setCtaButtonDisabled(true)
      }
      if (ctaButtonDisabled && !formIsEmpty) {
        setCtaButtonDisabled(false)
      }
    },
    [assessmentForm, ctaButtonDisabled]
  )

  const { clickActions, modalsProps } = useChatActions({ flowType: module.flowType, mergeAssessmentForm })

  useEffect(() => {
    const assessmentOptions = localStorage.getItem('trnd-assessment-data')
    if (assessmentOptions) setShowingContent(true)
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
  }, [module.flowType, module.simpleChat.simpleChatSteps, setAssessmentForm, setShowingContent])

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
    setIsMessageSent(true)
    onToggleContent()
    setPluginState('closed')
    timeout.set('hideLauncher', () => setDisappear(true), 10000)
  }, [onToggleContent, setDisappear])

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