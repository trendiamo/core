import styled from 'styled-components'
import { h } from 'preact'
import { timeout } from 'plugin-base'
import { useCallback, useEffect, useState } from 'preact/hooks'

const Title = styled.div`
  font-size: 14px;
  text-align: center;
  user-select: none;
  color: #363636;
  z-index: 1;
  letter-spacing: 0.6px;
  width: 100%;
  height: 30px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
`

const Background = styled.div`
  width: 100%;
  height: 120px;
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
  border-radius: 12px;
  background-color: #fff;
  height: 150px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.4s linear;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  @keyframes _frekkls_selected_asmt_item_highlight {
    0% {
      box-shadow: 0 1px 15px 1px #ff6816;
      opacity: 0.5;
    }
    25% {
      box-shadow: 0 1px 25px 1px #ff6816;
      opacity: 1;
    }
    35% {
      box-shadow: 0 1px 25px 1px #ff6816;
      opacity: 1;
    }
    100% {
      box-shadow: 0 1px 15px 1px #ff6816;
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
      border-radius: 12px;
      animation: _frekkls_selected_asmt_item_highlight 1.2s linear infinite;
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
  }
`

const Container = styled.div`
  width: 50%;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 10px;

  svg {
    height: 50px;
    width: 50px;
    fill: #00adef;
  }
`

const Content = styled.div`
  overflow: hidden;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  align-items: ${({ imageUrl }) => (imageUrl ? 'start' : 'center')};
  justify-content: ${({ imageUrl }) => (imageUrl ? 'flex-end' : 'space-evenly')};
  ${({ imageUrl }) =>
    imageUrl &&
    `
  &:after {
    content: '';
    border-radius: 12px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  `}
`

const TileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const AssessmentStepOption = ({ hideAll, highlight, imageUrl, nothingSelected, onClick, title }) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = useCallback(() => {
    if (hideAll) return
    setIsClicked(!isClicked)
    onClick({ type: 'assessmentStepOption', item: { title, imageUrl } })
  }, [hideAll, imageUrl, isClicked, onClick, title])

  useEffect(() => () => timeout.clear('pluginClickItem'), [])

  return (
    <Container>
      <Box
        highlight={highlight}
        imageUrl={imageUrl}
        isClicked={isClicked && !nothingSelected}
        listSelected={hideAll}
        onClick={handleClick}
      >
        <Content imageUrl={imageUrl}>
          <Background>{imageUrl && <TileImage isClicked={isClicked && !nothingSelected} src={imageUrl} />}</Background>
          <Title imageUrl={imageUrl} isClicked={isClicked && !nothingSelected}>
            {title}
          </Title>
        </Content>
      </Box>
    </Container>
  )
}

export default AssessmentStepOption
