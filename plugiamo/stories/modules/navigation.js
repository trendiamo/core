/* eslint-disable local-rules/no-relative-parent-imports */
import Plugin from '../plugin'
import { h } from 'preact'
import { Main } from '../components'
import { Navigation as NavigationComp } from 'plugin-base'

const navigationItems = [
  {
    id: 1,
    text: 'Lisbon',
    url: '',
    picture: {
      url: 'https://placeimg.com/300/300/arch?1',
    },
  },
  {
    id: 2,
    text: 'Barcelona',
    url: '',
    picture: {
      url: 'https://placeimg.com/300/300/arch?2',
    },
  },
  {
    id: 3,
    text: 'Madrid',
    url: '',
    picture: {
      url: 'https://placeimg.com/300/300/arch?3',
    },
  },
  {
    id: 4,
    text: 'Berlin',
    url: '',
    picture: {
      url: 'https://placeimg.com/300/300/arch?4',
    },
  },
]

const Navigation = () => (
  <div>
    <Main>
      <p>{'Show some tiles which take the user to other pages - this could be used to apply filters in some cases.'}</p>
    </Main>
    <Plugin Component={<NavigationComp navigationItems={navigationItems} />} />
  </div>
)

export default Navigation
