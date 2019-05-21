import launcherConfig from 'shared/plugin-preview/launcher-config'
import PluginPreview from 'shared/plugin-preview/index'
import React, { useMemo } from 'react'
import { Launcher } from 'plugin-base'

const Preview = ({ position, form, onToggleContent, showingContent }) => {
  const bubbleButtons = useMemo(
    () => ({
      chatBubbleButtonYes: form.chatBubbleButtonYes,
      chatBubbleButtonNo: form.chatBubbleButtonNo,
    }),
    [form.chatBubbleButtonNo, form.chatBubbleButtonYes]
  )

  const personaPicUrl = useMemo(() => form.personaProfilePic || (form.__persona && form.__persona.profilePicUrl), [
    form.__persona,
    form.personaProfilePic,
  ])

  return (
    <PluginPreview
      bubbleButtons={bubbleButtons}
      bubbleText={form.chatBubbleText}
      Launcher={<Launcher personaPicUrl={personaPicUrl} position={position} showingContent={showingContent} />}
      launcherConfig={launcherConfig}
      onToggleContent={onToggleContent}
      position={position}
      showingContent={showingContent}
    />
  )
}

export default Preview
