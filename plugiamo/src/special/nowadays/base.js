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

const Base = ({ handleScroll, module, onToggleContent, scrolled, setPluginState }) => (
  <ColFlexDiv>
    <ColFlexDiv>
      <Cover header={module.header} scrolled={scrolled} />
      <BelowCover onScroll={handleScroll}>
        <ChatLogUi module={module} onToggleContent={onToggleContent} />
      </BelowCover>
    </ColFlexDiv>
    <CtaButton ctaButton={module.ctaButton} onToggleContent={onToggleContent} setPluginState={setPluginState} />
  </ColFlexDiv>
)

export default compose(
  withState('scrolled', 'setScrolled', false),
  withHandlers({
    handleScroll: ({ setScrolled, scrolled }) => () => {
      if (event.target.scrollTop === 0) {
        setScrolled(false)
      } else {
        !scrolled && setScrolled(true)
      }
    },
  })
)(Base)
