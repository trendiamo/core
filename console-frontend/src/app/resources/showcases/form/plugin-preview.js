import BasePluginPreview from 'shared/plugin-preview/base'
import launcherConfig from 'shared/plugin-preview/launcher-config'
import React, { useCallback, useMemo } from 'react'
import { Launcher as BaseLauncher } from 'plugin-base'
import { history as pluginHistory, Showcase as ShowcaseBase } from 'plugin-base'
import { previewConverter } from './data-utils'

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
        showcase={form}
        spotlights={previewConverter.spotlights(form.spotlightsAttributes)}
        subtitle={previewConverter.subtitle(form.subtitle)}
        title={previewConverter.title(form.title)}
      />
    ),
    [form, previewCallbacks, routeToShowcase, routeToSpotlight]
  )

  const Launcher = useMemo(
    () => (
      <BaseLauncher
        onClick={onLauncherClick}
        personaPic={{
          url: (form.persona && form.persona.profilePic.url) || (form.__persona && form.__persona.profilePic.url),
          picRect: (form.persona && form.persona.picRect) || (form.__persona && form.__persona.picRect),
        }}
        pulsating
        showingContent={showingContent}
      />
    ),
    [form, onLauncherClick, showingContent]
  )

  return (
    <BasePluginPreview
      Base={Base}
      bubbleExtraText={form.chatBubbleExtraText}
      bubbleText={form.chatBubbleText}
      Launcher={Launcher}
      launcherConfig={launcherConfig}
      onToggleContent={onToggleContent}
      showingContent={showingContent}
    />
  )
}

export default PluginPreview
