import Curation from './curation'
import history from 'ext/history'
import ScriptedChat from './scripted-chat'
import { h } from 'preact'
import { Outro } from 'plugin-base'
import { Router as SimpleRouter } from 'ext/simple-router'

const Router = ({ persona, isTransitioning, onRouteChange, onToggleContent }) => (
  <SimpleRouter history={history} onChange={onRouteChange}>
    <Curation isTransitioning={isTransitioning} onRouteChange={onRouteChange} path="/curation/:id*" />
    <ScriptedChat onToggleContent={onToggleContent} path="/scripted-chat/:id" persona={persona} />
    <Outro path="/outro/:id" persona={persona} />
  </SimpleRouter>
)

export default Router
