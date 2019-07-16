import PersonaInstagram from 'shared/persona-instagram'
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { BackButton } from 'shared'
import { CoverImg, CoverInner, PaddedCover, PersonaDescription } from 'shared/cover/components'
import { imgixUrl, stringifyRect } from 'tools'
import { ThemeContext, transition, useTextTyping } from 'ext'

const FlexDiv = styled.div`
  display: flex;
`

const PersonaName = styled.div`
  color: ${({ theme }) => theme.textColor};
  display: inline-block;
`

const SpotlightCover = ({ backButtonLabel, isLeaving, routeToShowcase, spotlightId, spotlights }) => {
  const imgRef = useRef()
  const nameRef = useRef()

  useEffect(() => {
    if (!transition.isLiftingElements) return
    transition.landElement('img', imgRef.current)
    transition.landElement('name', nameRef.current)
  }, [])

  const spotlight = useMemo(() => spotlights.find(e => e.id == spotlightId), [spotlightId, spotlights])

  const currentDescription = useTextTyping(spotlight ? spotlight.persona.description : '', 500)

  const theme = useContext(ThemeContext)

  if (!spotlight) return null

  return (
    <CoverInner>
      <BackButton isLeaving={isLeaving} label={backButtonLabel} onClick={routeToShowcase} />
      <FlexDiv>
        <CoverImg
          ref={imgRef}
          src={imgixUrl(spotlight.persona.profilePic.url, {
            rect: stringifyRect(spotlight.persona.profilePic.picRect || spotlight.persona.picRect),
            fit: 'crop',
            w: 45,
            h: 45,
          })}
        />
        <PaddedCover>
          <PersonaName ref={nameRef} theme={theme}>
            {spotlight.persona.name}
          </PersonaName>
          <PersonaInstagram url={spotlight.persona.instagramUrl} />
          <PersonaDescription text={spotlight.persona.description} theme={theme} typingText={currentDescription} />
        </PaddedCover>
      </FlexDiv>
    </CoverInner>
  )
}

export default SpotlightCover
