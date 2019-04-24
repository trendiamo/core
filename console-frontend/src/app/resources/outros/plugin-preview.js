import launcherConfig from 'shared/plugin-preview/launcher-config'
import PluginPreview from 'shared/plugin-preview/index'
import React from 'react'
import { Launcher } from 'plugin-base'

const Preview = ({ position, form, onToggleContent, showingContent }) => (
  <PluginPreview
    bubbleButtons={{
      chatBubbleButtonYes: form.chatBubbleButtonYes,
      chatBubbleButtonNo: form.chatBubbleButtonNo,
    }}
    bubbleText={form.chatBubbleText}
    Launcher={
      <Launcher
        personaPicUrl={form.personaProfilePic || (form.__persona && form.__persona.profilePicUrl)}
        position={position}
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
