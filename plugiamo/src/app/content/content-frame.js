import CloseButton from './close-button'
import ErrorBoundaries from 'ext/error-boundaries'
import omit from 'lodash.omit'
import styled from 'styled-components'
import { Frame, positioning, useAnimateOnMount } from 'plugin-base'
import { h } from 'preact'
import { MAIN_BREAKPOINT, WIDTH } from 'config'

const IFrame = styled(props => <Frame {...omit(props, ['launcherConfig', 'position', 'skipEntry'])} />).attrs({
  title: 'Frekkls Content',
})`
  z-index: 2147483000;
  position: fixed;
  overflow-x: hidden;
  background-color: #fff;
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transform: ${({ entry, isUnmounting }) => (entry || isUnmounting ? 'translateY(100%)' : 'none')};
  transition: opacity 0.25s ease, transform 0.4s ease;
  overscroll-behavior: contain;
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};

  border: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;

  @media (min-width: ${MAIN_BREAKPOINT}px) {
    border-radius: 8px;
    ${({ position, launcherConfig }) => positioning.get({ type: 'content', position, launcherConfig })}
    width: ${WIDTH}px;
    height: calc(100vh - 150px);
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
    max-height: 500px;
    transform: ${({ entry }) => (entry ? 'translateY(20px)' : 'none')};
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
`

const ContentFrame = ({
  skipEntry,
  children,
  frameStyleStr,
  isUnmounting,
  hidden,
  onToggleContent,
  position,
  launcherConfig,
}) => {
  const { entry } = useAnimateOnMount({ skipEntry })

  return (
    <IFrame
      entry={entry}
      hidden={hidden}
      isUnmounting={isUnmounting}
      launcherConfig={launcherConfig}
      onToggleContent={onToggleContent}
      position={position}
      skipEntry={skipEntry}
      styleStr={frameStyleStr}
    >
      {/* We don't know why, but both ErrorBoundaries and the div are required here, to catch errors in content */}
      <ErrorBoundaries>
        <div>
          {children}
          <CloseButton onToggleContent={onToggleContent} />
        </div>
      </ErrorBoundaries>
    </IFrame>
  )
}

export default ContentFrame
