import isEqual from 'lodash.isequal'
import React, { forwardRef, useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IconChevronRight } from 'icons'
import { ThemeContext, timeout } from 'ext'

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

const List = ({ children, objectForResetCheck }) => {
  const [listSelected, setListSelected] = useState(false)
  const [currentObject, setCurrentObject] = useState(null)

  useEffect(() => {
    if (objectForResetCheck !== undefined && !isEqual(currentObject, objectForResetCheck)) {
      setListSelected(false)
      setCurrentObject(objectForResetCheck)
    }
  }, [currentObject, objectForResetCheck])

  return (
    <Ul>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, { setListSelected, listSelected, index })
      )}
    </Ul>
  )
}

// 101px makes it so 3 lines of text fit with no need for scroll
const ListContent = styled.div`
  overflow-y: auto;
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: ${({ withoutImage }) => (withoutImage ? '16px' : '110px')};
  right: 30px;
  .Win32 & {
    letter-spacing: -0.2px;
  }
  ${({ withoutImage }) =>
    withoutImage &&
    `
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}
`

const Li = styled.li`
  position: relative;
  border-radius: ${({ theme }) => (theme.roundEdges ? '8px' : 0)};
  box-shadow: ${({ isClicked, highlight }) =>
    isClicked && !highlight ? '0 3px 25px rgba(0, 0, 0, 0.3)' : '0 2px 12px rgba(0, 0, 0, 0.26)'};
  padding-left: 100px;
  ${({ listSelected, highlight, isClicked }) => listSelected && !highlight && !isClicked && 'opacity: 0;'}
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  cursor: pointer;
  height: ${({ bordered }) => (bordered ? '90px' : '101px')};
  color: #4a4a4a;
  background-color: #fff;
  backface-visibility: hidden;
  transition: all 0.3s ease-out;
  ${({ bordered }) => bordered && 'border: 2px solid #fa0;'}
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
        border-radius: ${({ theme }) => (theme.roundEdges ? '8px' : 0)};
        animation: _frekkls_selected_item_highlight 1.2s linear infinite;
        animation-delay: 0.125s;
      }`}
`

const ListItem = ({ bordered, children, highlight, listSelected, onClick, setListSelected }) => {
  const [isClicked, setIsClicked] = useState(false)

  useEffect(
    () => () => {
      timeout.clear('pluginClickItem')
    },
    []
  )

  useEffect(() => {
    if (isClicked && !listSelected) setIsClicked(false)
  }, [isClicked, listSelected])

  const newOnClick = useCallback(() => {
    if (!listSelected) {
      setIsClicked(true)
      setListSelected(true)
      timeout.set('pluginClickItem', onClick, highlight ? 300 : 10)
    }
  }, [highlight, listSelected, onClick, setListSelected])

  const theme = useContext(ThemeContext)

  return (
    <Li
      bordered={bordered}
      highlight={highlight}
      isClicked={isClicked}
      listSelected={listSelected}
      onClick={newOnClick}
      theme={theme}
    >
      {children}
    </Li>
  )
}

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100px;
  overflow: hidden;
  border-radius: ${({ theme }) => (theme.roundEdges ? '8px 0 0 8px' : 0)};
`
const SingleImage = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
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
  width: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s;
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

const ListImg = forwardRef(({ img, animation }, ref) => {
  const theme = useContext(ThemeContext)

  return (
    <ImageContainer ref={ref} theme={theme}>
      <SingleImage src={img} />
      {animation && <AnimatedImage src={animation} />}
    </ImageContainer>
  )
})

export { List, ListContent, ListImg, ListChevron, ListItem, SingleImage, AnimatedImage }
