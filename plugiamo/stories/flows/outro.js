/* eslint-disable local-rules/no-relative-parent-imports */
import OutroComp from 'app/content/outro'
import Plugin from '../plugin'
import { h } from 'preact'
import { Main } from '../components'

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
