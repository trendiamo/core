import CloseButton from './close-button'
import ErrorBoundaries from 'ext/error-boundaries'
import omit from 'lodash.omit'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/hooks/with-hotkeys'
import { DEFAULT_ZINDEX, Frame, positioning, ThemeContext } from 'plugin-base'
import { forwardRef } from 'preact/compat'
import { h } from 'preact'
import { MAIN_BREAKPOINT, WIDTH } from 'config'
import { useContext, useEffect } from 'preact/hooks'

const IFrame = (props, ref) => (
  <Frame {...omit(props, ['entry', 'launcherConfig', 'position', 'showingContent', 'theme'])} ref={ref} />
)

const StyledFrame = styled(forwardRef(IFrame)).attrs({
  title: 'Frekkls Content',
})`
  z-index: ${({ pluginZIndex }) => pluginZIndex || DEFAULT_ZINDEX};
  position: fixed;
  overflow-x: hidden;
  background-color: #fff;
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transform: ${({ entry, isUnmounting }) => (entry || isUnmounting ? 'translateY(100%)' : 'none')};
  transition: opacity 0.25s ease, transform 0.4s ease;
  overscroll-behavior: contain;
  display: ${({ hidden, showingContent }) => (hidden || !showingContent ? 'none' : 'block')};
  border-radius: ${({ theme }) => (theme.roundEdges ? '8px' : 0)};

  border: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;

  @media (min-width: ${MAIN_BREAKPOINT}px) {
    ${({ position, launcherConfig }) => positioning.get({ type: 'content', position, launcherConfig })}
    width: ${WIDTH}px;
    height: calc(100vh - 150px);
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
    max-height: 500px;
    transform: ${({ entry }) => (entry ? 'translateY(20px)' : 'none')};
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
`

const ContentFrame = (
  {
    entry,
    children,
    frameStyleStr,
    isUnmounting,
    hidden,
    onToggleContent,
    position,
    launcherConfig,
    showingContent,
    pluginZIndex,
  },
  ref
) => {
  useEffect(() => ref.current.focus(), [ref])
  const theme = useContext(ThemeContext)

  return (
    <StyledFrame
      entry={entry}
      hidden={hidden}
      isUnmounting={isUnmounting}
      launcherConfig={launcherConfig}
      onToggleContent={onToggleContent}
      pluginZIndex={pluginZIndex}
      position={position}
      ref={ref}
      showingContent={showingContent}
      styleStr={frameStyleStr}
      theme={theme}
    >
      {/* We don't know why, but both ErrorBoundaries and the div are required here, to catch errors in content */}
      <ErrorBoundaries>
        <div>
          {children}
          <CloseButton onToggleContent={onToggleContent} />
        </div>
      </ErrorBoundaries>
    </StyledFrame>
  )
}

export default withHotkeys({
  [escapeKey]: ({ onToggleContent, showingContent }) => () => {
    if (showingContent) onToggleContent()
  },
})(forwardRef(ContentFrame))
