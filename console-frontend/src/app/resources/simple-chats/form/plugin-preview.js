import BasePluginPreview from 'shared/plugin-preview/base'
import launcherConfig from 'shared/plugin-preview/launcher-config'
import React, { useCallback, useMemo } from 'react'
import { Launcher as BaseLauncher, SimpleChat } from 'plugin-base'
import { previewConverter } from './data-utils'

const PluginPreview = ({ form, onToggleContent, showingContent }) => {
  const onLauncherClick = useCallback(() => onToggleContent(), [onToggleContent])

  const Base = useMemo(
    () => (
      <SimpleChat
        backButtonLabel="Back"
        data={previewConverter.mainData(form.simpleChatStepsAttributes)}
        persona={previewConverter.persona(form.__persona)}
        showBackButton={false}
      />
    ),
    [form.__persona, form.simpleChatStepsAttributes]
  )

  const Launcher = useMemo(
    () => (
      <BaseLauncher
        onClick={onLauncherClick}
        personaPicUrl={previewConverter.persona(form.__persona).profilePic.url}
        pulsating
        showingContent={showingContent}
      />
    ),
    [form.__persona, onLauncherClick, showingContent]
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
