/* eslint-disable local-rules/no-relative-parent-imports */
import Plugin from '../plugin'
import { h } from 'preact'
import { Main } from '../components'
import { Outro as OutroComp } from 'plugin-base'

const Outro = () => (
  <div>
    <Main>
      <p>
        {
          'Show a success message after the user completes an action successfully. Typically this means a purchase was made.'
        }
      </p>
    </Main>
    <Plugin Component={<OutroComp />} />
  </div>
)

export default Outro
