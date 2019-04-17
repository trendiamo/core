import Content from './content'
import LauncherBubbles from './bubbles'
import React from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
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

const PluginPreview = ({
  Base,
  width,
  Launcher,
  showingContent,
  onToggleContent,
  compiledConfig,
  bubbleText,
  bubbleExtraText,
  position = 'right',
}) => (
  <StickyContainer>
    <Alignment width={width}>
      <Content Base={Base} position={position} showingContent={showingContent} />
      <LauncherBubbles
        bubbleExtraText={bubbleExtraText}
        bubbleText={bubbleText}
        config={compiledConfig}
        onToggleContent={onToggleContent}
        position={position}
        showingContent={showingContent}
      />
      {React.cloneElement(Launcher, { config: compiledConfig })}
    </Alignment>
  </StickyContainer>
)

export default compose(
  withWidth({ noSSR: true }),
  withProps(({ launcherConfig, showingContent }) => ({
    compiledConfig: {
      ...launcherConfig,
      size: showingContent ? launcherConfig.smallSize : launcherConfig.size,
      frameSize: showingContent ? launcherConfig.smallFrameSize : launcherConfig.frameSize,
      offsetX: 15,
      offsetY: 0,
    },
  }))
)(PluginPreview)
