import BasePluginPreview from 'shared/plugin-preview/base'
import launcherConfig from 'shared/plugin-preview/launcher-config'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest, apiWebsiteSettingsShow } from 'utils'
import { Launcher as BaseLauncher, sellerPic, SimpleChat } from 'plugin-base'
import { previewConverter } from './data-utils'
import { useSnackbar } from 'notistack'

const PluginPreview = ({ form, onToggleContent, showingContent }) => {
  const onLauncherClick = useCallback(() => onToggleContent(), [onToggleContent])

  const Base = useMemo(
    () => (
      <SimpleChat
        backButtonLabel="Back"
        data={previewConverter.mainData(form.title, form.useSellerAnimation, form.simpleChatStepsAttributes)}
        seller={previewConverter.seller(form.__seller)}
        showBackButton={false}
      />
    ),
    [form.__seller, form.simpleChatStepsAttributes, form.title, form.useSellerAnimation]
  )

  const Launcher = useMemo(
    () => (
      <BaseLauncher
        onClick={onLauncherClick}
        pulsating
        sellerPic={sellerPic(form.__seller, form.useSellerAnimation)}
        showingContent={showingContent}
      />
    ),
    [form.__seller, form.useSellerAnimation, onLauncherClick, showingContent]
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
