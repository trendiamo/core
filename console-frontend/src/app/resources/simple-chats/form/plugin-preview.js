import launcherConfig from 'shared/plugin-preview/launcher-config'
import PluginPreview from 'shared/plugin-preview/index'
import React from 'react'
import { Launcher, SimpleChat } from 'plugin-base'
import { previewConverter } from './data-utils'

const Preview = ({ position, form, onToggleContent, showingContent }) => (
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
        onClick={() => onToggleContent()}
        personaPicUrl={previewConverter.persona(form).profilePic.url}
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