import { IconChevronRight } from 'icons'
import styled from 'styled-components'

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const ListChevron = styled(IconChevronRight)`
  height: 16px;
  width: 16px;
  margin: 10px;
`

const ListContent = styled.div`
  padding: 1rem;
  flex: 1;
  color: #4a4a4a;
`

const ListItem = styled.li`
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  cursor: pointer;
`

const ListImg = styled.img`
  display: block;
  border-radius: 8px 0 0 8px;
  width: 100px;
  height: 100px;
  object-fit: cover;
`

export { List, ListChevron, ListContent, ListItem, ListImg }
