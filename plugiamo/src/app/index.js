import AppBase from './base'
import AssessmentCart from 'special/assessment/cart'
import AssessmentSizeGuide from 'special/assessment/size-guide'
import getFrekklsConfig from 'frekkls-config'
import googleAnalytics from 'ext/google-analytics'
import Launcher from './launcher'
import mixpanel from 'ext/mixpanel'
import Router from './content/router'
import setup, { optionsFromHash } from './setup'
import setupFlowHistory from './setup/flow-history'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { assessmentCart, assessmentHack } from 'special/assessment/utils'
import {
  branch,
  compose,
  lifecycle,
  renderComponent,
  renderNothing,
  withHandlers,
  withProps,
  withState,
} from 'recompose'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { infoMsgHof } from 'shared/info-msg'
import { isSmall } from 'utils'
import { location } from 'config'
import { timeout } from 'plugin-base'

export default compose(
  withProps({ Component: <Router /> }),
  withProps({ Launcher }),
  withProps({ pathFromNav: setupFlowHistory() }),
  graphql(
    gql`
      query($pathname: String!, $hasPersona: Boolean!, $personaId: ID, $pluginPath: String) {
        website {
          name
          previewMode
        }
        flow(pathname: $pathname, pluginPath: $pluginPath) {
          id
          flowType
          chatBubbleText
          chatBubbleExtraText
          chatBubbleButtonYes
          chatBubbleButtonNo
          persona {
            id
            name
            description
            profilePic {
              url
            }
            picRect {
              x
              y
              width
              height
            }
            instagramUrl
          }
        }
        persona(id: $personaId) @include(if: $hasPersona) {
          id
          name
          description
          profilePic {
            url
          }
          picRect {
            x
            y
            width
            height
          }
        }
      }
    `,
    {
      hasPersona: !!optionsFromHash().persona,
      pathname:
        location.hostname === 'www.pionier-workwear.com' ? `${location.pathname}${location.search}` : location.pathname,
      personaId: optionsFromHash().persona,
      pluginPath: optionsFromHash().path,
    }
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  branch(() => assessmentCart(), renderComponent(AssessmentCart)),
  branch(({ data }) => !data.flow && assessmentHack(), renderComponent(AssessmentSizeGuide)),
  branch(({ data }) => !data.flow, infoMsgHof(`no data found for hostname ${location.hostname}`)),
  branch(({ data }) => data.website.previewMode && !localStorage.getItem('trnd-plugin-enable-preview'), renderNothing),
  withState('pluginState', 'setPluginState', 'default'),
  withState('persona', 'setPersona'),
  withState('isUnmounting', 'setIsUnmounting', false),
  withState('showingContent', 'setShowingContent', false),
  withState('showAssessmentContent', 'setShowAssessmentContent', false),
  withState('showingLauncher', 'setShowingLauncher', () =>
    googleAnalytics.active ? googleAnalytics.getVariation() !== 'absent' : true
  ),
  withState('skipContentEntry', 'setSkipContentEntry', false),
  withState('showingBubbles', 'setShowingBubbles', () =>
    googleAnalytics.active ? googleAnalytics.getVariation() !== 'absent' : true
  ),
  withState('disappear', 'setDisappear', false),
  lifecycle({
    componentDidMount() {
      const { data, pathFromNav, setPersona, setPluginState, setShowingContent } = this.props
      const { flowType, open: autoOpen, persona } = setup(data, pathFromNav)
      setPersona(persona)
      mixpanel.track('Loaded Plugin', {
        autoOpen,
        flowType,
        hash: location.hash,
        hostname: location.hostname,
        personaName: persona.name,
        personaRef: persona.id,
      })

      getFrekklsConfig().onShow(autoOpen)

      if (autoOpen) {
        data.flow.flowType === 'outro' ? setPluginState('closed') : setShowingContent(true)
      } else {
        mixpanel.time_event('Toggled Plugin')
      }
    },
    componentDidUpdate(prevProps) {
      const { showAssessmentContent, showingContent, setSkipContentEntry } = this.props
      if (showAssessmentContent !== prevProps.showAssessmentContent && !showAssessmentContent) {
        setSkipContentEntry(true)
      }
      if (showingContent === prevProps.showingContent) return
      if (showingContent) {
        document.documentElement.classList.add('trnd-open')
      } else {
        setSkipContentEntry(false)
        document.documentElement.classList.remove('trnd-open')
      }
    },
    componentWillUnmount() {
      timeout.clear('exitOnMobile')
    },
  }),
  branch(({ persona }) => !persona, renderNothing),
  withProps({
    position: getFrekklsConfig().position,
  }),
  withHandlers({
    onToggleContent: ({
      data,
      disappear,
      setDisappear,
      setIsUnmounting,
      setPluginState,
      setShowAssessmentContent,
      setShowingBubbles,
      setShowingContent,
      showingContent,
    }) => () => {
      if (data.flow && data.flow.flowType === 'outro') return
      mixpanel.track('Toggled Plugin', { hostname: location.hostname, action: showingContent ? 'close' : 'open' })
      mixpanel.time_event('Toggled Plugin')

      setShowingBubbles(false)

      if (showingContent) {
        setPluginState('closed')
        timeout.set('hideLauncher', () => setDisappear(true), 10000)
      } else {
        setPluginState('default')
        timeout.clear('hideLauncher')
      }

      if (showingContent && isSmall()) {
        setIsUnmounting(true)
        timeout.set(
          'exitOnMobile',
          () => {
            setIsUnmounting(false)
            setShowingContent(false)
            setShowAssessmentContent(false)
          },
          400
        )
      } else {
        setShowingContent(disappear ? false : !showingContent)
        setShowAssessmentContent(false)
      }
    },
    outroButtonsClick: () => value => {
      mixpanel.track('Clicked Outro Button', { hostname: location.hostname, value })
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(AppBase)
