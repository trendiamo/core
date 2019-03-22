/* eslint-disable local-rules/no-relative-parent-imports */
import Plugin from '../plugin'
import { h } from 'preact'
import { history, Showcase as ShowcaseBase } from 'plugin-base'
import { Main } from '../components'

const spotlights = [
  {
    id: 1,
    text: 'This is good',
    persona: {
      name: 'Jon Snow',
      description: '',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    },
    translation: { selectedBy: 'Selected By' },
  },
  {
    id: 2,
    text: 'This is good',
    persona: {
      name: 'Bran Stark',
      description: '',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
    },
    translation: { selectedBy: 'Selected By' },
  },
  {
    id: 3,
    text: 'This is good',
    persona: {
      name: 'Rickon Stark',
      description: '',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
    },
    translation: { selectedBy: 'Selected By' },
  },
  {
    id: 4,
    text: 'This is good',
    persona: {
      name: 'Robb Stark',
      description: '',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/men/4.jpg',
      },
    },
    translation: { selectedBy: 'Selected By' },
  },
  {
    id: 5,
    text: 'This is good',
    persona: {
      name: 'Ned Stark',
      description: '',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/men/5.jpg',
      },
    },
    translation: { selectedBy: 'Selected By' },
  },
  {
    id: 6,
    text: 'This is good',
    persona: {
      name: 'Sansa Stark',
      description: '',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
    },
    translation: { selectedBy: 'Selected By' },
  },
  {
    id: 7,
    text: 'This is good',
    persona: {
      name: 'Arya Stark',
      description: '',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
    },
    translation: { selectedBy: 'Selected By' },
  },
  {
    id: 8,
    text: 'This is good',
    persona: {
      name: 'Catelyn Stark',
      description: '',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/women/3.jpg',
      },
    },
    translation: { selectedBy: 'Selected By' },
  },
]

// If we want navigation, we'll need onRouteChange, routeToShowcase, isTransitioning
history.location = '/showcase/1'

const Showcase = () => (
  <div>
    <Main>
      <p>{'Guide users to interesting products.'}</p>
    </Main>
    <Plugin
      Component={
        <ShowcaseBase
          callbacks={{
            onSpotlightClick: () => () => 0,
            onProductClick: () => () => 0,
          }}
          history={history}
          spotlights={spotlights}
          subtitle="We can help you"
          title="Need advice from us?"
        />
      }
    />
  </div>
)

export default Showcase
