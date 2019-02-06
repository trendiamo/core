import CartButton from './cart-button'
import ChatLogUi from './chat-log-ui'
import styled from 'styled-components'
import { BelowCover, Cover } from './cover'
import { compose, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const ColFlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
`

const Base = ({ handleScroll, module, onToggleContent, scrolled }) => (
  <ColFlexDiv>
    <Cover header={module.header} scrolled={scrolled} />
    <BelowCover onScroll={handleScroll}>
      <ChatLogUi module={module} onToggleContent={onToggleContent} />
      <CartButton buttonType={module.cartButton} />
    </BelowCover>
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
