import isEqual from 'lodash.isequal'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { timeout } from 'ext'

const TilesWrapperDiv = styled.div`
  align-content: baseline;
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
`

const TilesWrapper = ({ children, objectForResetCheck }) => {
  const [listSelected, setListSelected] = useState(false)
  const [currentObject, setCurrentObject] = useState(null)

  useEffect(
    () => {
      if (objectForResetCheck !== undefined && !isEqual(currentObject, objectForResetCheck)) {
        setListSelected(false)
        setCurrentObject(objectForResetCheck)
      }
    },
    [currentObject, objectForResetCheck]
  )

  return (
    <TilesWrapperDiv>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, { setListSelected, listSelected, index })
      )}
    </TilesWrapperDiv>
  )
}

const Title = styled.div`
  font-size: 14px;
  text-align: center;
  user-select: none;
  color: ${({ imageUrl }) => (imageUrl ? '#f0f0f0' : '#000')};
  ${({ isClicked }) => isClicked && ' color: #fff '}
  z-index: 1;
  letter-spacing: 0.6px;
  font-weight: 500;
`

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-image: ${({ imageUrl }) => (imageUrl ? `url('${imageUrl}')` : 'none')};
  background-size: cover;
  transition: transform 0.2s linear;
  backface-visibility: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
    opacity: 0;
    transition: opacity 0.3s;
  }
`

const Box = styled.div`
  border-radius: 15px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.11);
  background-color: #fff;
  height: 120px;
  cursor: pointer;

  position: relative;
  transition: background-color 0.4s linear;

  @keyframes _frekkls_selected_nav_item_highlight {
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
    z-index: 5;
    &:after{
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      z-index: 5;
      border-radius: 15px;
      animation: _frekkls_selected_nav_item_highlight 1.2s linear infinite;
      animation-delay: 0.125s;
    }`}

  ${({ isClicked, imageUrl }) =>
    isClicked &&
    `
      background-color: #00adef;
      color: white;
      svg {
        fill: ${!imageUrl && '#fff'};
      }
  `}

  :hover {
    ${Background} {
      transform: ${({ isClicked }) => !isClicked && 'scale(1.1)'};
      &:after {
        opacity: ${({ isClicked }) => !isClicked && '0.2'};
      }
    }
    ${Title} {
      color: ${({ imageUrl }) => imageUrl && '#fff'};
    }
  }
`

const Container = styled.div`
  width: 50%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-bottom: 1rem;

  svg {
    height: 50px;
    width: 50px;
    fill: #00adef;
  }
`

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  border-radius: 15px;
  padding: 0.75rem;

  display: flex;
  flex-direction: column;
  align-items: ${({ imageUrl }) => (imageUrl ? 'start' : 'center')};
  justify-content: ${({ imageUrl }) => (imageUrl ? 'flex-end' : 'space-evenly')};
  ${({ imageUrl }) =>
    imageUrl &&
    `
  &:after {
    content: '';
    border-radius: 15px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.7) 100%);
  }
  `}
`

const Tile = ({ highlight, Icon, imageUrl, listSelected, onClick, setListSelected, title }) => {
  const [isClicked, setIsClicked] = useState(false)

  useEffect(
    () => () => {
      timeout.clear('pluginClickItem')
    },
    []
  )

  useEffect(
    () => {
      if (isClicked && !listSelected) setIsClicked(false)
    },
    [isClicked, listSelected]
  )

  const newOnClick = useCallback(
    () => {
      if (!listSelected) {
        setIsClicked(true)
        setListSelected(true)
        timeout.set('pluginClickItem', onClick, highlight ? 300 : 10)
      }
    },
    [highlight, listSelected, onClick, setListSelected]
  )

  return (
    <Container>
      <Box
        highlight={highlight}
        imageUrl={imageUrl}
        isClicked={isClicked}
        listSelected={listSelected}
        onClick={newOnClick}
      >
        <Content imageUrl={imageUrl}>
          {imageUrl && <Background imageUrl={imageUrl} isClicked={isClicked} />}
          {Icon && <Icon />}
          <Title imageUrl={imageUrl} isClicked={isClicked}>
            {title}
          </Title>
        </Content>
      </Box>
    </Container>
  )
}

export { Tile, TilesWrapper }
export default Tile
