import styled from 'styled-components'

export const FlashMessage = styled.div`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-width: 1px;
  border-style: solid;
  color: white;
  border-color: ${({ success, warning }) => (success ? '#056938' : warning ? '#b8a91f' : '#aaa')};
  background-color: ${({ success, warning }) => (success ? '#00964d' : warning ? '#d1c024' : '#bbb')};
`
