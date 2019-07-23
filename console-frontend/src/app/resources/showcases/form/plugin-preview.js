import BasePluginPreview from 'shared/plugin-preview/base'
import launcherConfig from 'shared/plugin-preview/launcher-config'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest, apiWebsiteSettingsShow } from 'utils'
import { Launcher as BaseLauncher, personaPic } from 'plugin-base'
import { history as pluginHistory, Showcase as ShowcaseBase } from 'plugin-base'
import { previewConverter } from './data-utils'
import { useSnackbar } from 'notistack'

const PluginPreview = ({
  previewCallbacks,
  routeToShowcase,
  routeToSpotlight,
  form,
  onToggleContent,
  showingContent,
}) => {
  const onLauncherClick = useCallback(() => onToggleContent(), [onToggleContent])

  const Base = useMemo(
    () => (
      <ShowcaseBase
        backButtonLabel="Back"
        callbacks={previewCallbacks}
        history={pluginHistory}
        routeToShowcase={routeToShowcase}
        routeToSpotlight={routeToSpotlight}
        spotlights={previewConverter.spotlights(form.spotlightsAttributes)}
        subtitle={previewConverter.subtitle(form.subtitle)}
        title={previewConverter.title(form.title)}
      />
    ),
    [form.spotlightsAttributes, form.subtitle, form.title, previewCallbacks, routeToShowcase, routeToSpotlight]
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
