import CloseButton from './close-button'
import ErrorBoundaries from 'ext/recompose/error-boundaries'
import styled from 'styled-components'
import withHotkeys, { escapeKey } from 'ext/hooks/with-hotkeys'
import { compose } from 'recompose'
import { Frame, positioning, useAnimateOnMount } from 'plugin-base'
import { h } from 'preact'
import { MAIN_BREAKPOINT, WIDTH } from 'config'

const IFrame = compose(
  withHotkeys({
    [escapeKey]: ({ onToggleContent }) => onToggleContent,
  })
)(styled(Frame).attrs({
  title: 'Frekkls Content',
})`
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`)

export const StyledDiv = styled.div`
  z-index: 2147483000;
  position: fixed;
  overflow-x: hidden;
  background-color: #fff;
  opacity: ${({ entry }) => (entry ? 0 : 1)};
  transform: ${({ entry, isUnmounting }) => (entry || isUnmounting ? 'translateY(100%)' : 'none')};
  transition: opacity 0.25s ease, transform 0.4s ease;
  overscroll-behavior: contain;
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};

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
    <StyledDiv
      entry={entry}
      hidden={hidden}
      isUnmounting={isUnmounting}
      launcherConfig={launcherConfig}
      position={position}
      skipEntry={skipEntry}
    >
      <IFrame onToggleContent={onToggleContent} styleStr={frameStyleStr}>
        <ErrorBoundaries>
          <div>
            {children}
            <CloseButton onToggleContent={onToggleContent} />
          </div>
        </ErrorBoundaries>
      </IFrame>
    </StyledDiv>
  )
}

export default ContentFrame
