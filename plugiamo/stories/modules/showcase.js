/* eslint-disable local-rules/no-relative-parent-imports */
import history from 'ext/history'
import Plugin from '../plugin'
import { h } from 'preact'
import { Main } from '../components'
import { ShowcaseBase } from 'app/content/showcase'

const spotlights = [
  {
    id: 1,
    text: 'This is good',
    persona: {
      name: 'Jon Snow',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    },
  },
  {
    id: 2,
    text: 'This is good',
    persona: {
      name: 'Bran Stark',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
    },
  },
  {
    id: 3,
    text: 'This is good',
    persona: {
      name: 'Rickon Stark',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
    },
  },
  {
    id: 4,
    text: 'This is good',
    persona: {
      name: 'Robb Stark',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/men/4.jpg',
      },
    },
  },
  {
    id: 5,
    text: 'This is good',
    persona: {
      name: 'Ned Stark',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/men/5.jpg',
      },
    },
  },
  {
    id: 6,
    text: 'This is good',
    persona: {
      name: 'Sansa Stark',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
    },
  },
  {
    id: 7,
    text: 'This is good',
    persona: {
      name: 'Arya Stark',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/women/2.jpg',
      },
    },
  },
  {
    id: 8,
    text: 'This is good',
    persona: {
      name: 'Catelyn Stark',
      profilePic: {
        url: 'https://randomuser.me/api/portraits/women/3.jpg',
      },
    },
  },
]

// If we want navigation, we'll need onRouteChange, routeToShowcase, isTransitioning
history.location = '/showcase/1'
const routeToSpotlight = () => (history.location = '/showcase/1/spotlight/1')

const Outro = () => (
  <div>
    <Main>
      <p>{'Guide users to interesting products.'}</p>
    </Main>
    <Plugin
      Component={
        <ShowcaseBase
          history={history}
          routeToSpotlight={routeToSpotlight}
          spotlights={spotlights}
          subtitle="We can help you"
          title="Need advice from us?"
        />
      }
    />
  </div>
)

export default Outro
