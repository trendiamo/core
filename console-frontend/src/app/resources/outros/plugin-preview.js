import BasePluginPreview from 'shared/plugin-preview/base'
import launcherConfig from 'shared/plugin-preview/launcher-config'
import React, { useMemo } from 'react'
import { Launcher as BaseLauncher } from 'plugin-base'

const PluginPreview = ({ form }) => {
  const bubbleButtons = useMemo(
    () => ({
      chatBubbleButtonYes: form.chatBubbleButtonYes,
      chatBubbleButtonNo: form.chatBubbleButtonNo,
    }),
    [form.chatBubbleButtonNo, form.chatBubbleButtonYes]
  )

  const Launcher = useMemo(
    () => (
      <BaseLauncher
        personaPic={{
          url: (form.persona && form.persona.profilePic.url) || (form.__persona && form.__persona.profilePic.url),
          picRect: (form.persona && form.persona.picRect) || (form.__persona && form.__persona.picRect),
        }}
      />
    ),
    [form.__persona, form.persona]
  )

  return (
    <BasePluginPreview
      bubbleButtons={bubbleButtons}
      bubbleText={form.chatBubbleText}
      Launcher={Launcher}
      launcherConfig={launcherConfig}
    />
  )
}

export default PluginPreview
