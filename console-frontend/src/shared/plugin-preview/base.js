import Content from './content'
import LauncherBubbles from './bubbles'
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'
import { ThemeContext } from 'plugin-base'
import { withWidth } from '@material-ui/core'

const StickyContainer = styled.div`
  ${({ width }) =>
    width === 'xs' || width === 'sm'
      ? ''
      : `position: sticky;
  top: 50%;
  margin-bottom: 45px;`}
`

const Alignment = styled.div`
  width: 360px;
  height: 600px;
  margin: auto;
  position: absolute;
  right: 50%;
  top: 0;
  transform: ${({ width }) => (width === 'xs' || width === 'sm' ? 'translate(50%)' : 'translate(50%, -50%)')};
`

const BasePluginPreview = ({
  Base,
  Launcher,
  launcherConfig,
  onToggleContent,
  teaserMessage,
  extraTeaserMessage,
  bubbleButtons,
  position = 'right',
  pluginTheme,
  showingContent,
  width,
}) => {
  const compiledLauncherConfig = useMemo(
    () => ({
      ...launcherConfig,
      size: showingContent ? launcherConfig.smallSize : launcherConfig.size,
      frameSize: showingContent ? launcherConfig.smallFrameSize : launcherConfig.frameSize,
      offsetX: 15,
      offsetY: 0,
    }),
    [launcherConfig, showingContent]
  )

  return (
    <StickyContainer>
      <Alignment width={width}>
        <ThemeContext.Provider value={pluginTheme}>
          <Content Base={Base} pluginTheme={pluginTheme} position={position} showingContent={showingContent} />
          {!showingContent && (
            <LauncherBubbles
              bubbleButtons={bubbleButtons}
              extraTeaserMessage={extraTeaserMessage}
              launcherConfig={compiledLauncherConfig}
              onToggleContent={onToggleContent}
              position={position}
              teaserMessage={teaserMessage}
            />
          )}
          {React.cloneElement(Launcher, { launcherConfig: compiledLauncherConfig })}
        </ThemeContext.Provider>
      </Alignment>
    </StickyContainer>
  )
}

export default withWidth({ noSSR: true })(memo(BasePluginPreview))
