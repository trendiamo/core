import styled from 'styled-components'

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  * + & {
    margin-top: 12px;
  }
  @media (min-width: 960px) {
    width: auto;
    * + & {
      margin-top: 0px;
    }
  }
`

export default ButtonContainer
