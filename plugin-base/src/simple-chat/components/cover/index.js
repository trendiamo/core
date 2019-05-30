import defaultHeaderConfig from './header-config'
import React from 'react'
import styled from 'styled-components'
import { BackButton, Cover as CoverBase, PersonaInstagram } from 'shared'
import { compose, withProps } from 'recompose'
import { CoverImg, PaddedCover, PersonaDescription } from 'shared/cover/components'
import { imgixUrl } from 'tools'
import { withTextTyping } from 'ext'

const PersonaName = styled.div`
  color: #fff;
  display: inline-block;
`

const FlexDiv = styled.div`
  display: flex;
`

const Cover = ({
  persona,
  backButtonLabel,
  FlowBackButton,
  currentDescription,
  headerConfig,
  backButtonConfig,
  showBackButton,
}) => (
  <CoverBase headerConfig={headerConfig}>
    {showBackButton &&
      (FlowBackButton ? (
        <FlowBackButton />
      ) : (
        <BackButton backButtonConfig={backButtonConfig} label={backButtonLabel} />
      ))}
    <FlexDiv>
      <CoverImg
        src={
          persona.profilePic &&
          persona.profilePic.url &&
          imgixUrl(persona.profilePic.url, { fit: 'crop', w: 45, h: 45 })
        }
      />
      <PaddedCover>
        <PersonaName>{persona.name}</PersonaName>
        <PersonaInstagram url={persona.instagramUrl} />
        <PersonaDescription text={persona.description} typingText={currentDescription} />
      </PaddedCover>
    </FlexDiv>
  </CoverBase>
)

export default compose(
  withProps(({ headerConfig }) => ({
    headerConfig: { ...defaultHeaderConfig, ...headerConfig },
  })),
  withTextTyping(({ persona }) => persona.description, 300)
)(Cover)
