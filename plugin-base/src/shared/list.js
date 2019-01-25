import isEqual from 'lodash.isequal'
import React from 'react'
import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { IconChevronRight } from 'icons'
import { timeout } from 'ext'

const ListChevron = styled(IconChevronRight)`
  height: 16px;
  width: 16px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`

const Ul = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const List = compose(
  withState('listSelected', 'setListSelected', false),
  withState('currentObject', 'setCurrentObject', null),
  withHandlers({
    selectInList: ({ setListSelected }) => () => {
      setListSelected(true)
    },
  }),
  lifecycle({
    componentDidUpdate() {
      const { currentObject, objectForResetCheck, setListSelected, setCurrentObject } = this.props
      if (objectForResetCheck !== undefined && !isEqual(currentObject, objectForResetCheck)) {
        setListSelected(false)
        setCurrentObject(objectForResetCheck)
      }
    },
  })
)(({ children, selectInList, listSelected }) => (
  <Ul>
    {React.Children.map(children, (child, index) => React.cloneElement(child, { selectInList, listSelected, index }))}
  </Ul>
))

// 101px makes it so 3 lines of text fit with no need for scroll
const ListContent = styled.div`
  height: 101px;
  padding: 8px 36px 8px 10px;
  overflow-y: auto;
  .Win32 & {
    letter-spacing: -0.2px;
  }
`

const ListItem = compose(
  withState('isClicked', 'setIsClicked', false),
  lifecycle({
    componentWillUnmount() {
      timeout.clear('listItem')
      timeout.clear('pluginClickItem')
    },
    componentDidUpdate() {
      const { listSelected, isClicked, setIsClicked } = this.props
      if (isClicked && !listSelected) {
        setIsClicked(false)
      }
    },
  }),
  withHandlers({
    onClick: ({ onClick, setIsClicked, selectInList, listSelected, highlight }) => () => {
      if (!listSelected) {
        setIsClicked(true)
        selectInList()
        timeout.set(
          'pluginClickItem',
          () => {
            return onClick()
          },
          highlight ? 300 : 10
        )
      }
    },
  })
)(styled.li`
  position: relative;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  padding-left: 100px;
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  cursor: pointer;
  color: ${({ isClicked, highlight }) => (isClicked && !highlight ? 'white' : '#4a4a4a')};
  transition: background-color 0.4s linear;
  background-color: ${({ isClicked, highlight }) => (isClicked && !highlight ? '#00adef' : 'white')};
  backface-visibility: hidden;
  @keyframes _frekkls_selected_item_highlight {
    0% {
      box-shadow: 0 1px 15px 1px #00adef;
      opacity: 0.5;
    }
    25% {
      box-shadow: 0 1px 25px 1px #00adef;
      opacity: 1;
    }
    35% {
      box-shadow: 0 1px 25px 1px #00adef;
      opacity: 1;
    }
    100% {
      box-shadow: 0 1px 15px 1px #00adef;
      opacity: 0.5;
    }
  }
  ${({ listSelected, isClicked, highlight }) =>
    !isClicked &&
    listSelected &&
    highlight &&
    `
    transform: translate(-140px, 0);
    opacity: 0;
    transition: all 0.35s cubic-bezier(0.89, -0.47, 0.63, 0.79);
  `}
  ${({ isClicked, highlight }) =>
    isClicked &&
    highlight &&
    `
    transition: 0.6s all;
    &:after{
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      z-index: 1;
      border-radius: 8px;
      animation: _frekkls_selected_item_highlight 1.2s linear infinite;
      animation-delay: 0.125s;
    }`}
`)

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100px;
  overflow: hidden;
  border-radius: 8px 0 0 8px;
`
const SingleImage = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  object-fit: cover;
`
const AnimatedImage = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  opacity: 0;
  transition: opacity 1s;
  opacity: 1;
  animation: _frekkls_item_img_shared_animation 1s;
  animation-fill-mode: forwards;
  li:hover & {
    opacity: 1;
  }
  li & {
    animation: none;
    opacity: 0;
  }
  @keyframes _frekkls_item_img_shared_animation {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

const ListImg = ({ picture, animation, imgRef }) => (
  <ImageContainer ref={imgRef}>
    <SingleImage src={picture} />
    {animation && <AnimatedImage src={animation} />}
  </ImageContainer>
)

export { List, ListContent, ListImg, ListChevron, ListItem, SingleImage, AnimatedImage }
