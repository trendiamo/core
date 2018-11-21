/* eslint-disable local-rules/no-relative-parent-imports */
import BackButton from 'shared/back-button'
import Cover, { BelowCover } from 'app/content/cover'
import Plugin from '../plugin'
import { action } from '@storybook/addon-actions'
import { h } from 'preact'
import { InlineCode, Main, Note } from '../components'

const CoverFixedPositionLogic = () => (
  <div>
    <Main>
      <p>
        {"Some of the plugins's screens will have a "}
        <InlineCode>{'Cover'}</InlineCode>
        {
          '. This is a component that shows at the top, and may or may not have a back button on it. Also, the close button in full screen mode will be shown stacked over the '
        }
        <InlineCode>{'Cover'}</InlineCode>
        {' (if there is one), given that both are shown at the top of the '}
        <InlineCode>{'Content'}</InlineCode>
        {'.'}
      </p>
      <p>
        {'The '}
        <InlineCode>{'Cover'}</InlineCode>
        {
          ' should stay fixed at the top if the screen height is 650px or more - This is the screen height at which the plugin itself is shown with its full height. If the screen height is less than that, then the cover should scroll so that users can see more of the content.'
        }
      </p>
      <Note>
        {
          'TODO: Do we want to still make it fixed on the small screen heights, but at a reduced height, fitting only the back button and close button (both of which might not be there), and maybe showing a one-line title (persona name, or whatever applies). This is particularly useful to serve as back-drop for the close button in full-screen, as that one currently scrolls with the content as well.'
        }
      </Note>
    </Main>
    <Plugin
      Component={
        <div>
          <Cover>
            <BackButton onClick={action('back')} />
            {'This is the cover'}
          </Cover>
          <BelowCover>
            <div style={{ padding: '1rem' }}>
              {Array.from(Array(5)).map(e => (
                <p key={e} style={{ marginTop: 0 }}>
                  {
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                  }
                </p>
              ))}
            </div>
          </BelowCover>
        </div>
      }
    />
  </div>
)

export default CoverFixedPositionLogic
