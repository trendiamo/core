import launcherConfig from 'shared/plugin-preview/launcher-config'
import PluginPreview from 'shared/plugin-preview/index'
import React, { useCallback } from 'react'
import { Launcher } from 'plugin-base'
import { history as pluginHistory, Showcase as ShowcaseBase } from 'plugin-base'
import { previewConverter } from './data-utils'

const Preview = ({ previewCallbacks, routeToShowcase, routeToSpotlight, form, onToggleContent, showingContent }) => {
  const onLauncherClick = useCallback(() => onToggleContent(), [onToggleContent])

  return (
    <PluginPreview
      Base={
        <ShowcaseBase
          backButtonLabel="Back"
          callbacks={previewCallbacks}
          history={pluginHistory}
          routeToShowcase={routeToShowcase}
          routeToSpotlight={routeToSpotlight}
          showcase={form}
          spotlights={previewConverter.spotlights(form).spotlights}
          subtitle={previewConverter.subtitle(form)}
          title={previewConverter.title(form)}
        />
      }
      bubbleExtraText={form.chatBubbleExtraText}
      bubbleText={form.chatBubbleText}
      Launcher={
        <Launcher
          onClick={onLauncherClick}
          personaPicUrl={form.personaProfilePic || (form.__persona && form.__persona.profilePicUrl)}
          pulsating
          showingContent={showingContent}
        />
      }
      launcherConfig={launcherConfig}
      onToggleContent={onToggleContent}
      showingContent={showingContent}
    />
  )
}

export default Preview
