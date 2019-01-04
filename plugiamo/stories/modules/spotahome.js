/* eslint-disable local-rules/no-relative-parent-imports */
import Plugin from '../plugin'
import SpotahomeBase from 'special/spotahome/base'
import { h } from 'preact'
import { Main } from '../components'

const cards = [
  {
    id: 280397,
    url: 'https://www.spotahome.com/madrid/for-rent:apartments/280397',
    title: 'Great 2-bedroom apartment for rent in La Latina, Madrid',
    type: 'apartment',
    mainPhotoUrl: 'https://placeimg.com/480/480/arch?1',
    monthlyPrice: {
      type: 'fixed',
      minimumPrice: 1800,
      fixedPrice: 1800,
      pricesByMonth: null,
    },
  },
  {
    id: 280398,
    url: 'https://www.spotahome.com/madrid/for-rent:apartments/280398',
    title: 'Modest apartment in sunny Madrid',
    type: 'apartment',
    mainPhotoUrl: 'https://placeimg.com/480/480/arch?2',
    monthlyPrice: {
      type: 'fixed',
      minimumPrice: 1750,
      fixedPrice: 1750,
      pricesByMonth: null,
    },
  },
]

const Outro = () => (
  <div>
    <Main>
      <p>{'Special module for the spotahome website. Shows the search results from previous search.'}</p>
    </Main>
    <Plugin
      Component={<SpotahomeBase cards={cards} search="move-in=2019-01-04&move-out=2019-07-02&budget=200-800" />}
    />
  </div>
)

export default Outro
