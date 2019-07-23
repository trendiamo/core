import BasePluginPreview from 'shared/plugin-preview/base'
import launcherConfig from 'shared/plugin-preview/launcher-config'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest, apiWebsiteSettingsShow } from 'utils'
import { Launcher as BaseLauncher, personaPic, SimpleChat } from 'plugin-base'
import { previewConverter } from './data-utils'
import { useSnackbar } from 'notistack'

const PluginPreview = ({ form, onToggleContent, showingContent }) => {
  const onLauncherClick = useCallback(() => onToggleContent(), [onToggleContent])

  const Base = useMemo(
    () => (
      <SimpleChat
        backButtonLabel="Back"
        data={previewConverter.mainData(form.title, form.usePersonaAnimation, form.simpleChatStepsAttributes)}
        persona={previewConverter.persona(form.__persona)}
        showBackButton={false}
      />
    ),
    [form.__persona, form.simpleChatStepsAttributes, form.title, form.usePersonaAnimation]
  )

  const Launcher = useMemo(
    () => (
      <BaseLauncher
        onClick={onLauncherClick}
        personaPic={personaPic(form.__persona, form.usePersonaAnimation)}
        pulsating
        showingContent={showingContent}
      />
    ),
    [form.__persona, form.usePersonaAnimation, onLauncherClick, showingContent]
  )

  const { enqueueSnackbar } = useSnackbar()

  const [pluginTheme, setPluginTheme] = useState(null)

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiWebsiteSettingsShow, [])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        setPluginTheme(json)
      })()
    },
    [enqueueSnackbar]
  )

  if (!pluginTheme) return null

  return (
    <BasePluginPreview
      Base={Base}
      bubbleExtraText={form.chatBubbleExtraText}
      bubbleText={form.chatBubbleText}
      Launcher={Launcher}
      launcherConfig={launcherConfig}
      onToggleContent={onToggleContent}
      pluginTheme={pluginTheme}
      showingContent={showingContent}
    />
  )
}

export default PluginPreview
