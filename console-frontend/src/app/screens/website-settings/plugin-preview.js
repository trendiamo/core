import BasePluginPreview from 'shared/plugin-preview/base'
import launcherConfig from 'shared/plugin-preview/launcher-config'
import React, { useEffect, useMemo } from 'react'
import { Launcher as BaseLauncher } from 'plugin-base'
import { history as pluginHistory, routes as pluginRoutes, Showcase as ShowcaseBase } from 'plugin-base'

const personaUrl = 'https://placeimg.com/101/101/people'

const previewCallbacks = {
  onSpotlightClick: () => 0,
  onProductClick: () => 0,
}

const spotlights = [
  {
    id: 'spotlight-1',
    persona: {
      profilePic: { url: personaUrl },
      name: 'Mr. Steven',
      description: 'Check the plugin style. Corners around this, and colors of header and launcher.',
    },
  },
]

const routeToShowcase = () => pluginHistory.replace(pluginRoutes.showcase('spotlight-1'))

const routeToSpotlight = () => 0

const PluginPreview = ({ form }) => {
  const Base = useMemo(
    () => (
      <ShowcaseBase
        backButtonLabel="Back"
        callbacks={previewCallbacks}
        history={pluginHistory}
        routeToShowcase={routeToShowcase}
        routeToSpotlight={routeToSpotlight}
        spotlights={spotlights}
        subtitle="Subtitle here"
        theme={form}
        title="Title here"
      />
    ),
    [form]
  )

  const Launcher = useMemo(() => <BaseLauncher personaPic={{ url: personaUrl }} showingContent theme={form} />, [form])

  useEffect(() => {
    pluginHistory.replace(pluginRoutes.showcase('some-id'))
  }, [])

  return (
    <BasePluginPreview
      Base={Base}
      Launcher={Launcher}
      launcherConfig={launcherConfig}
      pluginTheme={form}
      showingContent
    />
  )
}

export default PluginPreview
