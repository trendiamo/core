import { h } from 'preact'
import styled from 'styled-components'

const OptionsWrapper = styled.div`
  align-content: baseline;
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
`

const Title = styled.div`
  font-size: 14px;
  text-align: center;
  user-select: none;
`

const Box = styled.div`
  border-radius: 15px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.11);
  background-color: #fff;
  height: 120px;
  padding: 0.75rem;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: ${({ imageUrl }) => (imageUrl ? 'start' : 'center')};
  justify-content: ${({ imageUrl }) => (imageUrl ? 'flex-end' : 'space-evenly')};

  position: relative;
  transition: background-color 0.4s linear;

  overflow: hidden;

  &::after {
    content: '';
    border-radius: 15px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${({ imageUrl }) =>
      imageUrl
        ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(0, 0, 0, 0.7) 100%)'
        : 'none'};
  }

  ${Title} {
    color: ${({ imageUrl }) => (imageUrl ? '#f0f0f0' : '#000')};
    z-index: 1;
    letter-spacing: 0.6px;
    font-weight: 500;
  }
`

const Background = styled.div`
  background-image: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : 'none')};
  background-size: cover;
  transition: transform 0.2s linear;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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

  :active {
    ${Box} {
      background-color: #00adef;
      color: white;
    }

    ${Background} {
      transform: scale(1.2);
    }

    svg {
      fill: #fff;
    }

    ${Title} {
      color: #fff;
    }
  }
`

const OptionButton = ({ title, Icon, imageUrl }) => (
  <Container>
    <Box imageUrl={imageUrl}>
      {imageUrl && <Background imageUrl={imageUrl} />}
      {Icon && <Icon />}
      <Title>{title}</Title>
    </Box>
  </Container>
)

export { OptionButton, OptionsWrapper }
export default OptionButton
