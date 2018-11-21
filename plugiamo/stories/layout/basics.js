/* eslint-disable local-rules/no-relative-parent-imports */
import Plugin from '../plugin'
import styled from 'styled-components'
import { h } from 'preact'
import { InlineCode, Main } from '../components'

const InnerContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  color: #fff;
`

const Basics = () => (
  <div>
    <Main>
      <p>
        {'The Plugin has two main components: '}
        <InlineCode>{'Launcher'}</InlineCode>
        {' and '}
        <InlineCode>{'Content'}</InlineCode>
        {'.'}
      </p>
      <p>
        {'The '}
        <InlineCode>{'Launcher'}</InlineCode>
        {
          " consists of a circular person's picture, and shows in the bottom-right corner of the page, stacked over the content of the page - it might hide some of the page content."
        }
      </p>
      <p>
        {'To open the '}
        <InlineCode>{'Content'}</InlineCode>
        {', just click the '}
        <InlineCode>{'Launcher'}</InlineCode>
        {'. To close it, you can click the '}
        <InlineCode>{'Launcher'}</InlineCode>
        {' again, or press the esc key. The '}
        <InlineCode>{'Content'}</InlineCode>
        {' opens just above the '}
        <InlineCode>{'Launcher'}</InlineCode>
        {'.'}
      </p>
      <p>
        {'When the '}
        <InlineCode>{'Content'}</InlineCode>
        {' is open, there is a subtle shadow shown in the bottom-right corner of the page.'}
      </p>
      <p>
        {' In screens with less than 600px width, the '}
        <InlineCode>{'Content'}</InlineCode>
        {' will become full-screen instead and the '}
        <InlineCode>{'Launcher'}</InlineCode>
        {' will be hidden beneath it. There is a close button shown at the top-right corner.'}
      </p>
      <p>{'In screens with less than 300px height, the plugin will not be shown.'}</p>
      <p>{'Make sure to resize your screen here to see how it looks in different screen sizes.'}</p>
    </Main>
    <Plugin Component={<InnerContent>{'plugin content goes here'}</InnerContent>} />
  </div>
)

export default Basics
