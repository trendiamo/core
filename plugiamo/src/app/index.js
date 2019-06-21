import AppBase from './base'
import Assessment from 'special/assessment'
import AssessmentCart from 'special/assessment/cart'
import AssessmentSizeGuide from 'special/assessment/size-guide'
import getFrekklsConfig from 'frekkls-config'
import googleAnalytics from 'ext/google-analytics'
import infoMsg from 'shared/info-msg'
import mixpanel from 'ext/mixpanel'
import setup, { optionsFromHash } from './setup'
import setupFlowHistory from './setup/flow-history'
import { assessmentCart, assessmentHack, isDeliusAssessment } from 'special/assessment/utils'
import { getScrollbarWidth, isSmall } from 'utils'
import { gql, useGraphql } from 'ext/hooks/use-graphql'
import { h } from 'preact'
import { location } from 'config'
import { timeout } from 'plugin-base'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'

const isShowingDefault = googleAnalytics.active ? googleAnalytics.getVariation() !== 'absent' : true

const App = ({
  data,
  setShowAssessmentContent,
  setShowingBubbles,
  setShowingContent,
  showingBubbles,
  showingContent,
  showingLauncher,
  skipContentEntry,
}) => {
  const [pluginState, setPluginState] = useState('default')
  const [persona, setPersona] = useState(null)
  const [isUnmounting, setIsUnmounting] = useState(false)
  const [disappear, setDisappear] = useState(false)

  useEffect(() => () => timeout.clear('exitOnMobile'), [])

  useEffect(() => {
    const { flowType, open: autoOpen, persona } = setup(data, setupFlowHistory())
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
  }, [data, setShowingContent])

  const onToggleContent = useCallback(() => {
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
  }, [data.flow, disappear, setShowAssessmentContent, setShowingBubbles, setShowingContent, showingContent])

  if (!persona) return null

  return (
    <AppBase
      data={data}
      disappear={disappear}
      isUnmounting={isUnmounting}
      onToggleContent={onToggleContent}
      persona={persona}
      pluginState={pluginState}
      position={getFrekklsConfig().position}
      setDisappear={setDisappear}
      setShowAssessmentContent={setShowAssessmentContent}
      showingBubbles={showingBubbles}
      showingContent={showingContent}
      showingLauncher={showingLauncher}
      skipContentEntry={skipContentEntry}
    />
  )
}

const hostname = process.env.ASSESSMENT || location.hostname
const defaultShowingContent = isDeliusAssessment() ? hostname === 'www.pierre-cardin.de' : false

const AppHacks = ({ data }) => {
  const [showAssessmentContent, setShowAssessmentContent] = useState(false)
  const [showingBubbles, setShowingBubbles] = useState(isShowingDefault)
  const [showingContent, setShowingContent] = useState(defaultShowingContent)
  const [showingLauncher, setShowingLauncher] = useState(isShowingDefault)
  const [skipContentEntry, setSkipContentEntry] = useState(false)

  useEffect(() => {
    if (!showAssessmentContent && data.flow) {
      setSkipContentEntry(true)
    }
  }, [data.flow, showAssessmentContent])

  useEffect(() => {
    setSkipContentEntry(showingContent)
    if (getScrollbarWidth() === 0) return
    if (showingContent) {
      document.documentElement.classList.add('trnd-open')
    } else {
      document.documentElement.classList.remove('trnd-open')
    }
  }, [showingContent])

  if (showAssessmentContent || isDeliusAssessment()) {
    return (
      <Assessment
        setShowAssessmentContent={setShowAssessmentContent}
        setShowingBubbles={setShowingBubbles}
        setShowingContent={setShowingContent}
        setShowingLauncher={setShowingLauncher}
        showAssessmentContent={showAssessmentContent}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
      />
    )
  }
  if (assessmentCart()) {
    return (
      <AssessmentCart
        setShowingContent={setShowingContent}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
      />
    )
  }
  if (!data.flow && assessmentHack()) {
    return (
      <AssessmentSizeGuide
        setShowingContent={setShowingContent}
        showingBubbles={showingBubbles}
        showingContent={showingContent}
        showingLauncher={showingLauncher}
      />
    )
  }
  if (!data.flow) {
    infoMsg(`no data found for hostname ${location.hostname}`)
    return null
  }
  if (data.website.previewMode && !localStorage.getItem('trnd-plugin-enable-preview')) return null

  return (
    <App
      data={data}
      setShowAssessmentContent={setShowAssessmentContent}
      setShowingBubbles={setShowingBubbles}
      setShowingContent={setShowingContent}
      showingBubbles={showingBubbles}
      showingContent={showingContent}
      showingLauncher={showingLauncher}
      skipContentEntry={skipContentEntry}
    />
  )
}

const AppGraphql = () => {
  const variables = useMemo(
    () => ({
      hasPersona: !!optionsFromHash().persona,
      pathname:
        location.hostname === 'www.pionier-workwear.com' ? `${location.pathname}${location.search}` : location.pathname,
      personaId: optionsFromHash().persona,
      pluginPath: optionsFromHash().path,
    }),
    []
  )

  const data = useGraphql(
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
    variables
  )

  if (!data || data.loading || data.error) return null

  return <AppHacks data={data} />
}

export default AppGraphql
