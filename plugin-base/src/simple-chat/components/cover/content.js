import React from 'react'
import styled from 'styled-components'
import VideoButton from './video-button'

const Name = styled.div`
  color: ${({ header }) => header.textColor || '#333'};
  position: absolute;
  font-size: ${({ header }) => (header.isBig ? 48 : 20)}px;
  font-weight: ${({ header }) => (header.isBig ? '500' : '700')};
  backface-visibility: hidden;
  opacity: 1;
  transition: opacity 1s 0.4s, color 0.4s ease-in-out;
  top: 0;
  ${({ minimized }) =>
    minimized &&
    `
    transition: 0.4s all ease-out;
    opacity: 0;
    top: -10px;
  `}
`

const NameHelper = styled.div`
  font-size: ${({ header }) => (header.isBig ? 48 : 20)}px;
  font-weight: ${({ header }) => (header.isBig ? '500' : '700')};
  max-height: 50px;
  opacity: 0;
  transition: max-height 0.8s ease-out, margin-bottom 0.4s;
  user-select: none;
  margin-bottom: 5px;
  ${({ minimized }) =>
    minimized &&
    `
    margin-bottom: 0;
    max-height: 0;
    transition: 0.4s all;
  `}
`

const NameMinimized = styled.div`
  color: ${({ header }) => header.textColor || '#333'};
  font-size: 16px;
  font-weight: 700;
  backface-visibility: hidden;
  max-height: 0;
  transition: 0.4s all;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
  ${({ minimized }) =>
    minimized &&
    `
    max-height: 50px;
    opacity: 1;
    transition: 1s all;
    transition-delay: 0.0s;
  `}
`

const SubheaderContainer = styled.div`
  font-size: 14px;
  backface-visibility: hidden;
  color: ${({ header }) => header.textColor || '#333'};
  transition: all 0.4s ease-in-out;
`

const TextContainer = styled.div`
  width: ${({ header }) => (header.isBig ? 350 : 200)}px;
  left: 20px;
  z-index: 100;
  position: absolute;
`

const HeaderContainer = styled.div`
  position: relative;
`

export const PersonaName = styled.div`
  color: #fff;
  display: inline-block;
`

const Header = ({ minimized, header, config }) => (
  <HeaderContainer>
    <NameMinimized header={header} minimized={minimized}>
      {header.title || header.productTitle}
    </NameMinimized>
    <Name header={header} minimized={minimized} style={config && config.titleStyle}>
      {header.title || header.productTitle}
    </Name>
    <NameHelper header={header} minimized={minimized} style={config && config.titleStyle}>
      {header.title || header.productTitle}
    </NameHelper>
  </HeaderContainer>
)

const Subheader = ({ header, minimized }) => (
  <SubheaderContainer header={header} minimized={minimized}>
    {header.personaInstagramHandle && 'presented by '}
    <b>{header.personaInstagramHandle || header.subtitle}</b>
  </SubheaderContainer>
)

const Content = ({ minimized, header, config, clickActions }) => (
  <TextContainer header={header} minimized={minimized} style={config && config.contentContainerStyle}>
    <Header config={config} header={header} minimized={minimized} />
    {(header.personaInstagramHandle || header.subtitle) && <Subheader header={header} minimized={minimized} />}
    {header.video && <VideoButton clickActions={clickActions} video={header.video} />}
  </TextContainer>
)

export default Content
