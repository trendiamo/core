import Showcase from './showcase'
import SimpleChat from './scripted-chat'
import { Router as BaseRouter, history } from 'plugin-base'
import { h } from 'preact'

const Router = ({ persona, isTransitioning, onRouteChange, onToggleContent, setShowAssessmentContent }) => (
  <BaseRouter history={history} onChange={onRouteChange}>
    <Showcase
      isTransitioning={isTransitioning}
      onRouteChange={onRouteChange}
      path="/showcase/:id*"
      setShowAssessmentContent={setShowAssessmentContent}
    />
    <SimpleChat onToggleContent={onToggleContent} path="/simple-chat/:id" persona={persona} />
  </BaseRouter>
)

export default Router
