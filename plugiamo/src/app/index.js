import Content from './content'
import { h } from 'preact'
import Launcher from './launcher'
import { compose, withHandlers, withState } from 'recompose'

const App = ({ onToggleContent, showingContent }) => (
  <div>
    {showingContent && <Content />}
    <Launcher onToggleContent={onToggleContent} showingContent={showingContent} />
  </div>
)

export default compose(
  withState('showingContent', 'setShowingContent', false),
  withHandlers({
    onToggleContent: ({ setShowingContent, showingContent }) => () => setShowingContent(!showingContent),
  })
)(App)
