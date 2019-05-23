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
    () => <BaseLauncher personaPicUrl={form.personaProfilePic || (form.__persona && form.__persona.profilePicUrl)} />,
    [form.__persona, form.personaProfilePic]
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
