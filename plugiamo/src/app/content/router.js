import history from 'ext/history'
import Navigation from './navigation'
import ScriptedChat from './scripted-chat'
import Showcase from './showcase'
import { h } from 'preact'
import { Outro } from 'plugin-base'
import { Router as SimpleRouter } from 'ext/simple-router'

const Router = ({ persona, isTransitioning, onRouteChange, onToggleContent }) => (
  <SimpleRouter history={history} onChange={onRouteChange}>
    <Showcase isTransitioning={isTransitioning} onRouteChange={onRouteChange} path="/showcase/:id*" />
    <Navigation path="/navigation/:id" persona={persona} />
    <ScriptedChat onToggleContent={onToggleContent} path="/scripted-chat/:id" persona={persona} />
    <Outro path="/outro/:id" persona={persona} />
  </SimpleRouter>
)

export default Router
