import React from 'react'
import { compose } from 'recompose'
import { Admin, Resource } from 'react-admin'
import { ExpositionsList } from './expositions'

const App = ({ data, dataProvider, ExpositionsList }) => (
  <Admin dataProvider={dataProvider}>
    <Resource name="expositions" list={ExpositionsList} />
  </Admin>
)
export default compose()(App)
