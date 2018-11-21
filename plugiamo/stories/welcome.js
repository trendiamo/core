import { h } from 'preact'
import { InlineCode, Link, Main, NavButton, Note } from './components'
import { linkTo } from '@storybook/addon-links'

const Welcome = () => (
  <Main>
    <h1>{'README'}</h1>
    <p>
      {'See the '}
      <InlineCode>{'Layout'}</InlineCode> <NavButton onClick={linkTo('Layout')}>{'stories'}</NavButton>
      {'.'}
    </p>
    <Note>
      <p>
        <b>{'Notes for developers:'}</b>
      </p>
      <p>{'This is a UI component dev environment for your app.'}</p>
      <p>
        {"We've added some basic stories inside the "}
        <InlineCode>{'src/stories'}</InlineCode>
        {' directory.'}
        <br />
        {'A story is a single state of one or more UI components. You can have as many stories as you want.'}
        <br />
        {'(Basically a story is like a visual test case.)'}
      </p>
      <p>
        {'Have a look at the '}
        <InlineCode>{'.storybook/webpack.config.js'}</InlineCode>
        {' to add webpack loaders and plugins you are using in this project.'}
      </p>
      <p>
        {'Usually we create stories with smaller UI components in the app.'}
        <br />
        {'Have a look at the '}
        <Link href="https://storybook.js.org/basics/writing-stories" rel="noopener noreferrer" target="_blank">
          {'Writing Stories'}
        </Link>
        {' section in the Storybook documentation.'}
      </p>
    </Note>
  </Main>
)

export default Welcome
