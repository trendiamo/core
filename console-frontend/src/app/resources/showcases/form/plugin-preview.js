import launcherConfig from 'shared/plugin-preview/launcher-config'
import PluginPreview from 'shared/plugin-preview/index'
import React from 'react'
import { Launcher } from 'plugin-base'
import { history as pluginHistory, Showcase as ShowcaseBase } from 'plugin-base'
import { previewConverter } from './data-utils'

const Preview = ({
  previewCallbacks,
  routeToShowcase,
  position,
  routeToSpotlight,
  form,
  onToggleContent,
  showingContent,
}) => (
  <PluginPreview
    Base={
      <ShowcaseBase
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
        onClick={() => onToggleContent()}
        personaPicUrl={form.personaProfilePic || (form.__persona && form.__persona.profilePicUrl)}
        position={position}
        pulsating
        showingContent={showingContent}
      />
    }
    launcherConfig={launcherConfig}
    onToggleContent={onToggleContent}
    position={position}
    showingContent={showingContent}
  />
)

export default Preview
