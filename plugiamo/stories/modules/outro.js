/* eslint-disable local-rules/no-relative-parent-imports */
import Plugin from '../plugin'
import { h } from 'preact'
import { Main } from '../components'

const data = {
  flowType: 'outro',
  launcher: {
    chatBubble: {
      message: 'Awesome! 🤩 Was I helpful?',
      timeStart: 0.5,
      timeEnd: null,
      hideBarAfter: 0.2,
      timeOfElevation: 1.6,
    },
    chatBubbleExtra: {
      buttons: [
        {
          message: 'Not really.',
          value: 'no',
          appearsAfter: 0,
        },
        {
          message: 'Yes, thanks!',
          value: 'yes',
          appearsAfter: 0.2,
        },
      ],
      timeStart: 2.5,
      timeEnd: null,
      timeStartDuration: 0.4,
    },
  },
}

const Outro = () => (
  <div>
    <Main>
      <p>
        {
          'Show a success message after the user completes an action successfully. Typically this means a purchase was made.'
        }
      </p>
    </Main>
    <Plugin data={data} />
  </div>
)

export default Outro
