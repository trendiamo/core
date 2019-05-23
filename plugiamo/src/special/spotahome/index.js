import AppBase from 'app/base'
import Base from './base'
import Launcher from 'app/launcher'
import mixpanel from 'ext/mixpanel'
import withHotkeys, { escapeKey } from 'ext/recompose/with-hotkeys'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { gql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { optionsFromHash } from 'app/setup'
import { request } from 'graphql-request'

const saveSearch = value => localStorage.setItem('__frekkls-saved-search', value)
const getSavedSearch = () => localStorage.getItem('__frekkls-saved-search')
const hasSavedSearch = () => !!getSavedSearch()

const persona = {
  id: 'spotahome-persona',
  name: 'Alejandro',
  description: "Hi! I'm a co-founder of Spotahome and I can help you find your place in Madrid!",
  profilePic: { url: 'https://console-assets.ams3.digitaloceanspaces.com/manual/spotahome/alejandro.jpg' },
}

const query = gql`
  query Homecards($ids: [Int], $locale: String = "en") {
    homecards(homecardIds: $ids, locale: $locale) {
      id
      title
      type
      mainPhotoUrl
      url
      monthlyPrice {
        type
        minimumPrice
        fixedPrice
      }
    }
  }
`

const SpotAHome = ({ cards, onToggleContent, showingContent }) => (
  <AppBase
    Component={<Base cards={cards} search={getSavedSearch()} />}
    Launcher={Launcher}
    onToggleContent={onToggleContent}
    persona={persona}
    showingContent={showingContent}
  />
)

export default compose(
  branch(() => location.pathname.match(/\/madrid/), () => saveSearch(location.search.substr(1))),
  branch(() => location.pathname !== '/', renderNothing),
  branch(() => !hasSavedSearch(), renderNothing),
  withState('data', 'setData', { loading: true }),
  withState('showingContent', 'setShowingContent', false),
  withHandlers({
    fetchResults: ({ setData }) => () => {
      const search = getSavedSearch()
      fetch(`/api/fe/marketplace/markers/madrid?${search}&sortBy=WeightedParams-beleg`, {
        headers: new Headers({ 'Content-Type': 'application/json' }),
      })
        .then(response => response.json())
        .then(results => {
          if (!results.ok) return
          const ids = results.data.slice(0, 6).map(e => e.id)
          request('/marketplace/graphql', query, { ids, locale: 'en' })
            .then(data => setData(data))
            .catch(error => setData({ error }))
        })
    },
  }),
  lifecycle({
    componentDidMount() {
      const { fetchResults, setShowingContent } = this.props
      const autoOpen = optionsFromHash().open
      mixpanel.track('Loaded Plugin', {
        autoOpen,
        flowType: 'Spotahome',
        hash: location.hash,
        hostname: location.hostname,
        personaName: persona.name,
        personaRef: persona.id,
      })

      if (autoOpen) {
        setShowingContent(true)
      } else {
        mixpanel.time_event('Toggled Plugin')
      }

      fetchResults()
    },
    componentDidUpdate(prevProps) {
      const { showingContent } = this.props
      if (showingContent === prevProps.showingContent) return
      if (showingContent) {
        document.documentElement.classList.add('trnd-open')
      } else {
        document.documentElement.classList.remove('trnd-open')
      }
    },
  }),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withProps(({ data }) => ({
    cards: data.homecards.slice(0, 6),
  })),
  withHandlers({
    onToggleContent: ({ setShowingContent, showingContent }) => () => {
      mixpanel.track('Toggled Plugin', { hostname: location.hostname, action: showingContent ? 'close' : 'open' })
      mixpanel.time_event('Toggled Plugin')
      return setShowingContent(!showingContent)
    },
  }),
  withHotkeys({
    [escapeKey]: ({ onToggleContent, showingContent }) => () => {
      if (showingContent) onToggleContent()
    },
  })
)(SpotAHome)
