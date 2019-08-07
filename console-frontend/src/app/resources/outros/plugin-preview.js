import BasePluginPreview from 'shared/plugin-preview/base'
import launcherConfig from 'shared/plugin-preview/launcher-config'
import React, { useEffect, useMemo, useState } from 'react'
import { apiRequest, apiWebsiteSettingsShow } from 'utils'
import { Launcher as BaseLauncher, sellerImg } from 'plugin-base'
import { useSnackbar } from 'notistack'

const PluginPreview = ({ form }) => {
  const bubbleButtons = useMemo(
    () => ({
      chatBubbleButtonYes: form.chatBubbleButtonYes,
      chatBubbleButtonNo: form.chatBubbleButtonNo,
    }),
    [form.chatBubbleButtonNo, form.chatBubbleButtonYes]
  )

  const Launcher = useMemo(() => <BaseLauncher sellerImg={sellerImg(form.__seller, form.useSellerAnimation)} />, [
    form.__seller,
    form.useSellerAnimation,
  ])

  const { enqueueSnackbar } = useSnackbar()

  const [pluginTheme, setPluginTheme] = useState(null)

  useEffect(
    () => {
      ;(async () => {
        const { json, requestError } = await apiRequest(apiWebsiteSettingsShow, [])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        setPluginTheme(json)
      })()
    },
    [enqueueSnackbar]
  )

  if (!pluginTheme) return null

  return (
    <BasePluginPreview
      bubbleButtons={bubbleButtons}
      Launcher={Launcher}
      launcherConfig={launcherConfig}
      pluginTheme={pluginTheme}
      teaserMessage={form.teaserMessage}
    />
  )
}

export default PluginPreview
