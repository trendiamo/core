import styled from 'styled-components'
import { h } from 'preact'

const CoverBase = styled.div`
  background-color: #fff;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${({ scrolled }) => (scrolled ? 90 : 140)}px;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 2;
  transition: height 0.3s ease-in-out;
  box-shadow: 0px 5px 10px rgba(25, 39, 54, 0.13);
`

export const BelowCover = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 56px;

  @media (min-height: 500px) {
    overflow-y: auto;
  }
`

const Name = styled.div`
  position: absolute;
  bottom: 25px;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 3px 0;
  transition: opacity 0.3s ease-in-out;
  width: 200px;
  transition-delay: ${({ scrolled }) => (scrolled ? 0 : 0.2)}s;
  color: #333;
  opacity: ${({ scrolled }) => (scrolled ? 0 : 1)};
  backface-visibility: hidden;
`

const NameScrolled = styled.div`
  position: absolute;
  top: 18px;
  font-size: 16px;
  font-weight: 700;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  transition-delay: ${({ scrolled }) => (scrolled ? 0.2 : 0)}s;
  width: 250px;
  opacity: ${({ scrolled }) => (scrolled ? 1 : 0)};
  backface-visibility: hidden;
`

const PresentedBy = styled.div`
  position: absolute;
  bottom: ${({ scrolled }) => (scrolled ? 20 : 5)}px;
  font-size: 14px;
  width: 200px;
  transition: all 0.3s ease-in-out;
  backface-visibility: hidden;
`

const TextContainer = styled.div`
  position: absolute;
  z-index: 15;
  top: ${({ scrolled }) => (scrolled ? 10 : 33)}px;
  left: 15px;
  height: 75px;
  transition: top 0.3s ease-in-out;
`

const CoverAnimation = styled.div`
  background-image: url('${({ image }) => image}');
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: ${({ scrolled }) => (scrolled ? 200 : 140)}px;
  height: 100%;
  background-size: cover;
  transition: all 0.3s ease-in-out;
  z-index: 10;
  opacity: ${({ scrolled }) => (scrolled ? 0 : 1)};
`

const CoverImage = styled.div`
  background-image: url('${({ image }) => image}');
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: ${({ scrolled }) => (scrolled ? 200 : 140)}px;
  height: 100%;
  background-size: cover;
  transition: all 0.3s ease-in-out;
  opacity: ${({ scrolled }) => (scrolled ? 1 : 0)};
`

const ImageContainer = styled.div`
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 50px;
    left: ${({ scrolled }) => (scrolled ? 200 : 140)}px;
    background: linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0));
    z-index: 11;
    transition: all 0.3s ease-in-out;
  }
`

export const Cover = ({ persona, product, scrolled }) => (
  <CoverBase scrolled={scrolled}>
    <ImageContainer scrolled={scrolled}>
      <CoverAnimation image={persona.header.animationUrl} scrolled={scrolled} />
      <CoverImage image={persona.header.imageUrl} scrolled={scrolled} />
    </ImageContainer>
    <TextContainer scrolled={scrolled}>
      <Name scrolled={scrolled}>{product.name}</Name>
      <NameScrolled scrolled={scrolled}>{product.name}</NameScrolled>
      <PresentedBy scrolled={scrolled}>
        {'presented by '}
        <b>{persona.instagramHandle}</b>
      </PresentedBy>
    </TextContainer>
  </CoverBase>
)

// <CoverImg src={persona.profilePic.url} />
