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
`

const Base = ({ handleScroll, module, onToggleContent, minimized, setPluginState }) => (
  <ColFlexDiv>
    <ColFlexDiv>
      <Cover header={module.header} minimized={minimized} />
      <BelowCover onScroll={!module.header.minimized && handleScroll}>
        <ChatLogUi module={module} />
      </BelowCover>
    </ColFlexDiv>
    <CtaButton ctaButton={module.ctaButton} onToggleContent={onToggleContent} setPluginState={setPluginState} />
  </ColFlexDiv>
)

export default compose(
  withState('minimized', 'setMinimized', ({ module }) => module.header.minimized),
  withHandlers({
    handleScroll: ({ setMinimized, minimized }) => () => {
      if (event.target.scrollTop === 0) {
        setMinimized(false)
      } else {
        !minimized && setMinimized(true)
      }
    },
  })
)(Base)
