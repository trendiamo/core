import AppBase from 'app/base'
import ChatModals from 'shared/chat-modals'
import data from 'special/assessment/data'
import Launcher from 'app/launcher'
import mixpanel from 'ext/mixpanel'
import useChatActions from 'ext/hooks/use-chat-actions'
import withHotkeys, { escapeKey } from 'ext/hooks/with-hotkeys'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'
import { isSmall } from 'utils'
import { timeout } from 'plugin-base'

const Plugin = ({
  disappear,
  isUnmounting,
  modalsProps,
  module,
  onToggleContent,
  pluginState,
  showingContent,
  showingLauncher,
  setShowingContent,
  setShowingLauncher,
  showAssessmentContent,
  setShowAssessmentContent,
  showingBubbles,
}) => (
  <div>
    <ChatModals flowType={module.flowType} {...modalsProps} />
    <AppBase
      assessmentIsMainFlow
      data={module}
      disappear={disappear}
      isUnmounting={isUnmounting}
      Launcher={showingLauncher && Launcher}
      onToggleContent={onToggleContent}
      persona={module.launcher.persona}
      pluginState={pluginState}
      setShowAssessmentContent={setShowAssessmentContent}
      setShowingContent={setShowingContent}
      setShowingLauncher={setShowingLauncher}
      showAssessmentContent={showAssessmentContent}
      showingBubbles={showingBubbles}
      showingContent={showingContent}
      showingLauncher={showingLauncher}
    />
  </div>
)

const Plugin0 = compose(
  withHandlers({
    onToggleContent: ({
      disappear,
      setDisappear,
      setIsUnmounting,
      setPluginState,
      setShowingBubbles,
      setShowingContent,
      showingContent,
      setShowAssessmentContent,
      setShowingLauncher,
    }) => (event, isModal) => {
      !showingContent && setShowAssessmentContent(!showingContent)
      if (isModal) {
        setShowAssessmentContent(false)
        setShowingLauncher(true)
        setShowingContent(false)
      } else {
        mixpanel.track('Toggled Plugin', { hostname: location.hostname, action: showingContent ? 'close' : 'open' })
        mixpanel.time_event('Toggled Plugin')
      }
      if (showingContent || isModal) {
        setPluginState('closed')
        timeout.set('hideLauncher', () => setDisappear(true), 10000)
      } else {
        setPluginState('opened')
        timeout.clear('hideLauncher')
      }

      if (showingContent && isSmall()) {
        setIsUnmounting(true)
        return timeout.set(
          'exitOnMobile',
          () => {
            setIsUnmounting(false)
            setShowingContent(false)
            setShowAssessmentContent(false)
          },
          400
        )
      } else if (!isModal) {
        setShowingContent(disappear ? false : !showingContent)
        setShowAssessmentContent(!showingContent)
      }

      setShowingBubbles(false)
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(Plugin)

const Plugin1 = props => {
  const { module } = props
  const { clickActions, modalsProps } = useChatActions(module.flowType)
  return <Plugin0 {...props} clickActions={clickActions} modalsProps={modalsProps} />
}

export default compose(
  withProps({ module: data['www.delius-contract.de'].assessment }),
  withState('showingContent', 'setShowingContent', false),
  withState('pluginState', 'setPluginState', 'default'),
  withState('disappear', 'setDisappear', false),
  withState('isUnmounting', 'setIsUnmounting', false),
  withState('showingBubbles', 'setShowingBubbles', true),
  withState('showingLauncher', 'setShowingLauncher', true),
  withState('showAssessmentContent', 'setShowAssessmentContent', false)
)(Plugin1)
