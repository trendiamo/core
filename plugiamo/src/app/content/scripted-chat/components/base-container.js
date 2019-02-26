import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'

const ContainerDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background-color: #ebeef2;
  @keyframes _frekkls_message_appear {
    0% {
      opacity: 0;
      transform: translate(-20px, 0);
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes _frekkls_option_hide {
    0% {
      opacity: 1;
    }
    30% {
      visibility: hidden;
      transform: translateX(20px);
      max-height: 60px;
      opacity: 0;
    }
    100% {
      max-height: 0;
      visibility: hidden;
      opacity: 0;
    }
  }
`

const Container = ({ handleWheel, children }) => <ContainerDiv onWheel={handleWheel}>{children}</ContainerDiv>

export default compose(
  withHandlers({
    handleWheel: ({ contentRef }) => event => {
      const base = contentRef().base
      const delta = event.deltaY || event.detail || event.wheelDelta

      if (delta < 0 && base.scrollTop == 0) {
        event.preventDefault()
      }

      if (delta > 0 && base.scrollHeight - base.clientHeight - base.scrollTop <= 1) {
        event.preventDefault()
      }
    },
  })
)(Container)
