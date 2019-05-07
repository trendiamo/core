import styled from 'styled-components'

const BelowCover = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (min-height: 500px) {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
`

export default BelowCover
