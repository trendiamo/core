import styled from 'styled-components'

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 959px) {
    width: 100%;
    * + & {
      margin-top: 12px;
    }
  }
`

export default ButtonContainer
