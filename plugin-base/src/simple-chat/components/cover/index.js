import defaultHeaderConfig from './header-config'
import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { BackButton, Cover as CoverBase, PersonaInstagram } from 'shared'
import { CoverImg, PaddedCover, PersonaDescription } from 'shared/cover/components'
import { personaPicUrl } from 'tools'
import { ThemeContext, useTextTyping } from 'ext'

const PersonaName = styled.div`
  color: ${({ theme }) => theme.textColor};
  display: inline-block;
`

const FlexDiv = styled.div`
  display: flex;
`

const Cover = ({ backButtonConfig, backButtonLabel, FlowBackButton, headerConfig, persona, showBackButton, step }) => {
  const currentDescription = useTextTyping(persona.description, 300)

  const newHeaderConfig = useMemo(() => ({ ...defaultHeaderConfig, ...headerConfig }), [headerConfig])

  const theme = useContext(ThemeContext)

  return (
    <CoverBase headerConfig={newHeaderConfig}>
      {showBackButton &&
        (FlowBackButton ? (
          <FlowBackButton />
        ) : (
          <BackButton backButtonConfig={backButtonConfig} label={backButtonLabel} />
        ))}
      <FlexDiv>
        <CoverImg src={personaPicUrl(persona, step.simpleChat.usePersonaAnimation, { w: 45, h: 45 })} />
        <PaddedCover>
          <PersonaName theme={theme}>{persona.name}</PersonaName>
          <PersonaInstagram url={persona.instagramUrl} />
          <PersonaDescription text={persona.description} typingText={currentDescription} />
        </PaddedCover>
      </FlexDiv>
    </CoverBase>
  )
}

export default Cover
