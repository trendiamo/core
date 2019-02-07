import ContentFrame from './content-frame'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { compose, lifecycle } from 'recompose'
import { ContentWrapper, history } from 'plugin-base'
import { h } from 'preact'

const Content = ({ Component, darkClose, isUnmounting, onToggleContent, position, persona }) => (
  <ContentFrame darkClose={darkClose} isUnmounting={isUnmounting} onToggleContent={onToggleContent} position={position}>
    <ContentWrapper onToggleContent={onToggleContent} persona={persona}>
      {Component}
    </ContentWrapper>
  </ContentFrame>
)

export default compose(
  lifecycle({
    componentDidMount() {
      if (window.__trndInitialPath) history.replace(window.__trndInitialPath)
    },
    componentWillUnmount() {
      history.removeListeners()
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Content)
