import BasePluginPreview from 'shared/plugin-preview/base'
import launcherConfig from 'shared/plugin-preview/launcher-config'
import React, { useEffect, useMemo, useState } from 'react'
import { apiRequest, apiWebsiteSettingsShow } from 'utils'
import { Launcher as BaseLauncher, personaPic } from 'plugin-base'
import { useSnackbar } from 'notistack'

const PluginPreview = ({ form }) => {
  const bubbleButtons = useMemo(
    () => ({
      chatBubbleButtonYes: form.chatBubbleButtonYes,
      chatBubbleButtonNo: form.chatBubbleButtonNo,
    }),
    [form.chatBubbleButtonNo, form.chatBubbleButtonYes]
  )

  const Launcher = useMemo(() => <BaseLauncher personaPic={personaPic(form.__persona, form.usePersonaAnimation)} />, [
    form.__persona,
    form.usePersonaAnimation,
  ])

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
      bubbleButtons={bubbleButtons}
      bubbleText={form.chatBubbleText}
      Launcher={Launcher}
      launcherConfig={launcherConfig}
      pluginTheme={pluginTheme}
    />
  )
}

export default PluginPreview
