import Navigation from './navigation'
import Showcase from './showcase'
import SimpleChat from './scripted-chat'
import { h } from 'preact'
import { history, Router as SimpleRouter } from 'plugin-base'

const Router = ({ persona, isTransitioning, onRouteChange, onToggleContent, setShowAssessmentContent }) => (
  <SimpleRouter history={history} onChange={onRouteChange}>
    <Showcase
      isTransitioning={isTransitioning}
      onRouteChange={onRouteChange}
      path="/showcase/:id*"
      setShowAssessmentContent={setShowAssessmentContent}
    />
    <Navigation path="/navigation/:id" persona={persona} />
    <SimpleChat onToggleContent={onToggleContent} path="/simple-chat/:id" persona={persona} />
  </SimpleRouter>
)

export default Router
