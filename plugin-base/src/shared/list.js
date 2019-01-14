import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { IconChevronRight } from 'icons'
import { timeout } from 'ext'

const ListChevron = styled(IconChevronRight)`
  height: 16px;
  width: 16px;
  margin: 10px;
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

// 101px makes it so 3 lines of text fit with no need for scroll
const ListContent = styled.div`
  height: 101px;
  padding: 8px 0 8px 10px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .Win32 & {
    letter-spacing: -0.2px;
  }
`

// 101px makes it so 3 lines of text fit with no need for scroll
const ListImg = styled.img`
  width: 101px;
  height: 101px;
  display: block;
  border-radius: 8px 0 0 8px;
  object-fit: cover;
`

const ListItem = compose(
  withState('isClicked', 'setIsClicked', false),
  lifecycle({
    componentWillUnmount() {
      timeout.clear('listItem')
    },
  }),
  withHandlers({
    onClick: ({ onClick, setIsClicked }) => event => {
      setIsClicked(true)
      timeout.set('listItem', () => setIsClicked(false), 300)
      return onClick(event)
    },
  })
)(styled.li`
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  cursor: pointer;
  color: ${({ isClicked }) => (isClicked ? 'white' : '#4a4a4a')};
  transition: background-color 0.4s linear;
  background-color: ${({ isClicked }) => (isClicked ? '#00adef' : 'white')};
`)

export { List, ListContent, ListImg, ListChevron, ListItem }
