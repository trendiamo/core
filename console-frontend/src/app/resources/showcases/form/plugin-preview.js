import BasePluginPreview from 'shared/plugin-preview/base'
import launcherConfig from 'shared/plugin-preview/launcher-config'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { apiRequest, apiWebsiteSettingsShow } from 'utils'
import { Launcher as BaseLauncher, sellerPic } from 'plugin-base'
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
        heading={previewConverter.heading(form.heading)}
        history={pluginHistory}
        routeToShowcase={routeToShowcase}
        routeToSpotlight={routeToSpotlight}
        spotlights={previewConverter.spotlights(form.spotlightsAttributes)}
        subheading={previewConverter.subheading(form.subheading)}
      />
    ),
    [form.spotlightsAttributes, form.subheading, form.heading, previewCallbacks, routeToShowcase, routeToSpotlight]
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
      extraTeaserMessage={form.extraTeaserMessage}
      Launcher={Launcher}
      launcherConfig={launcherConfig}
      onToggleContent={onToggleContent}
      pluginTheme={pluginTheme}
      showingContent={showingContent}
      teaserMessage={form.teaserMessage}
    />
  )
}

export default PluginPreview
