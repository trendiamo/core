/* eslint-disable local-rules/no-relative-parent-imports */
import Launcher from 'app/launcher/pulsating'
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

const PulsatingLauncherComp = ({ persona, onToggleContent, showingContent }) => (
  <Launcher onToggleContent={onToggleContent} persona={persona} showingContent={showingContent} />
)

const PulsatingLauncher = () => (
  <div>
    <Main>
      <p>
        {'This effect is created to make our plugin more visible and call for attention.'}
        <br />
        {' The main concept consists of 2 parts:'}
      </p>
      <ul>
        <li>
          <InlineCode>{'Launcher'}</InlineCode>
          {' image scaling;'}
        </li>
        <li>
          {'Ripple-like effect behind the '}
          <InlineCode>{'Launcher'}</InlineCode>
          {' image.'}
        </li>
      </ul>
      <h2>{'General features:'}</h2>
      <h4>{'Sizes:'}</h4>
      <ul>
        <li>
          {`Iframe size is 100px. When changing this value keep in mind that the users cannot click through iframes.
            That means that it can complicate clicking on buttons or other components of the parent website.`}
        </li>
      </ul>
      <h4>{'Behavior'}</h4>
      <ul>
        <li>{'The effect disappears when the content of the plugin opens.'}</li>
      </ul>
    </Main>
    <Plugin Component={<InnerContent>{'plugin content goes here'}</InnerContent>} Launcher={PulsatingLauncherComp} />
  </div>
)

export default PulsatingLauncher
