import launcherConfig from 'shared/plugin-preview/launcher-config'
import PluginPreview from 'shared/plugin-preview/index'
import React, { useCallback } from 'react'
import { Launcher, SimpleChat } from 'plugin-base'
import { previewConverter } from './data-utils'

const Preview = ({ form, onToggleContent, showingContent }) => {
  const onLauncherClick = useCallback(() => onToggleContent(), [onToggleContent])

  return (
    <PluginPreview
      Base={
        <SimpleChat
          backButtonLabel="Back"
          data={previewConverter.mainData(form)}
          persona={previewConverter.persona(form)}
          showBackButton={false}
        />
      }
      bubbleExtraText={form.chatBubbleExtraText}
      bubbleText={form.chatBubbleText}
      Launcher={
        <Launcher
          onClick={onLauncherClick}
          personaPicUrl={previewConverter.persona(form).profilePic.url}
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
