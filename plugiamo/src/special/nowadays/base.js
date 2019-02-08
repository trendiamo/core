import ChatLogUi from './chat-log-ui'
import CtaButton from './cta-button'
import styled from 'styled-components'
import { BelowCover, Cover } from './cover'
import { compose, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const ColFlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 100%;
`

const Base = ({ handleScroll, module, onToggleContent, minimized, setPluginState, touch }) => (
  <ColFlexDiv>
    <ColFlexDiv>
      <Cover header={module.header} minimized={minimized} />
      <BelowCover onScroll={!module.header.minimized && handleScroll} touch={touch}>
        <ChatLogUi module={module} />
      </BelowCover>
    </ColFlexDiv>
    <CtaButton ctaButton={module.ctaButton} onToggleContent={onToggleContent} setPluginState={setPluginState} />
  </ColFlexDiv>
)

export default compose(
  withState('minimized', 'setMinimized', ({ module }) => module.header.minimized),
  withState('touch', 'setTouch', true),
  withHandlers({
    handleScroll: ({ setMinimized, minimized, setTouch, touch }) => event => {
      if (event.target.scrollTop <= 0 && minimized) {
        setMinimized(false)
      } else {
        touch && setMinimized(true)
      }
      if (event.target.scrollTop <= 0 && minimized) {
        setTouch(false)
        setTimeout(() => {
          setTouch(true)
        }, 50)
      }
    },
  })
)(Base)
