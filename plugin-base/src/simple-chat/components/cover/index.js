import defaultHeaderConfig from './header-config'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { BackButton, Cover as CoverBase, PersonaInstagram } from 'shared'
import { CoverImg, PaddedCover, PersonaDescription } from 'shared/cover/components'
import { imgixUrl, stringifyRect } from 'tools'
import { useTextTyping } from 'ext'

const PersonaName = styled.div`
  color: #fff;
  display: inline-block;
`

const FlexDiv = styled.div`
  display: flex;
`

const Cover = ({ persona, backButtonLabel, FlowBackButton, headerConfig, backButtonConfig, showBackButton }) => {
  const currentDescription = useTextTyping(persona.description, 300)

  const newHeaderConfig = useMemo(() => ({ ...defaultHeaderConfig, ...headerConfig }), [headerConfig])

  return (
    <CoverBase headerConfig={newHeaderConfig}>
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
            imgixUrl(persona.profilePic.url, {
              rect: stringifyRect(persona.profilePic.picRect || persona.picRect),
              fit: 'crop',
              w: 45,
              h: 45,
            })
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
}

export default Cover
