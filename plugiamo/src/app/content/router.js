import Showcase from './showcase'
import SimpleChat from './simple-chat'
import { Router as BaseRouter, history } from 'plugin-base'
import { h } from 'preact'

const Router = ({
  seller,
  isTransitioning,
  onRouteChange,
  onToggleContent,
  setModalProps,
  setShowAssessmentContent,
  modalProps,
}) => (
  <BaseRouter history={history} onChange={onRouteChange}>
    <Showcase
      isTransitioning={isTransitioning}
      onRouteChange={onRouteChange}
      path="/showcase/:id*"
      setShowAssessmentContent={setShowAssessmentContent}
    />
    <SimpleChat
      modalProps={modalProps}
      onToggleContent={onToggleContent}
      path="/simple-chat/:id"
      seller={seller}
      setModalProps={setModalProps}
    />
  </BaseRouter>
)

export default Router
