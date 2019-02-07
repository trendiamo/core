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
  margin-bottom: 0;

  @media (min-height: 500px) {
    overflow-y: auto;
    margin-bottom: 50px;
  }
`

const Name = styled.div`
  color: #333;
  position: absolute;
  font-size: 20px;
  font-weight: 700;
  backface-visibility: hidden;
  opacity: 1;
  transition: 1s opacity;
  top: 0;
  transition-delay: 0.4s;
  ${({ scrolled }) =>
    scrolled &&
    `
    transition: 0.4s all ease-out;
    opacity: 0;
    top: -10px;
  `}
`

const NameHelper = styled.div`
  color: #333;
  font-size: 20px;
  font-weight: 700;
  max-height: 50px;
  opacity: 0;
  transition: max-height 0.8s ease-out, margin-bottom 0.4s;
  user-select: none;
  margin-bottom: 5px;
  ${({ scrolled }) =>
    scrolled &&
    `
    margin-bottom: 0;
    max-height: 0px;
    transition: 0.4s all;
  `}
`

const NameScrolled = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: 700;
  backface-visibility: hidden;
  max-height: 0;
  transition: 0.4s all;
  opacity: 0;
  ${({ scrolled }) =>
    scrolled &&
    `
    max-height: 50px;
    opacity: 1;
    transition: 1s all;
    transition-delay: 0.0s;
  `}
`

const PresentedBy = styled.div`
  font-size: 14px;
  backface-visibility: hidden;
`

const TextContainer = styled.div`
  width: 200px;
  left: 20px;
  z-index: 100;
`

const Header = styled.div`
  position: relative;
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

export const Cover = ({ header, scrolled }) => (
  <CoverBase scrolled={scrolled}>
    <ImageContainer scrolled={scrolled}>
      <CoverAnimation image={header.animationUrl} scrolled={scrolled} />
      <CoverImage image={header.imageUrl} scrolled={scrolled} />
    </ImageContainer>
    <TextContainer scrolled={scrolled}>
      <Header>
        <NameScrolled scrolled={scrolled}>{header.productTitle}</NameScrolled>
        <Name scrolled={scrolled}>{header.productTitle}</Name>
        <NameHelper scrolled={scrolled}>{header.productTitle}</NameHelper>
      </Header>
      <PresentedBy scrolled={scrolled}>
        {'presented by '}
        <b>{header.personaInstagramHandle}</b>
      </PresentedBy>
    </TextContainer>
  </CoverBase>
)
