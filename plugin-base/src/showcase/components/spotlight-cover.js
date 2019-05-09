import PersonaInstagram from 'shared/persona-instagram'
import React from 'react'
import styled from 'styled-components'
import { BackButton } from 'shared'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps } from 'recompose'
import { CoverImg, CoverInner, PaddedCover, PersonaDescription } from 'shared/cover/components'
import { imgixUrl } from 'tools'
import { transition, withTextTyping } from 'ext'

const FlexDiv = styled.div`
  display: flex;
`

const PersonaName = styled.div`
  color: #fff;
  display: inline-block;
`

const SpotlightCover = compose(
  withHandlers(() => {
    let imgRef, nameRef
    return {
      landElements: () => () => {
        if (!transition.isLiftingElements) return
        if (imgRef) transition.landElement('img', imgRef)
        if (nameRef) transition.landElement('name', nameRef)
      },
      setImgRef: () => ref => (imgRef = ref),
      setNameRef: () => ref => (nameRef = ref),
    }
  }),
  lifecycle({
    componentDidMount() {
      const { landElements } = this.props
      landElements()
    },
  }),
  withProps(({ spotlightId, spotlights }) => ({
    spotlight: spotlights.find(e => e.id == spotlightId),
  })),
  branch(({ spotlight }) => !spotlight, renderNothing),
  withTextTyping(({ spotlight }) => spotlight.persona.description, 500)
)(({ backButtonLabel, isLeaving, routeToShowcase, setImgRef, setNameRef, spotlight, currentDescription }) => (
  <CoverInner>
    <BackButton isLeaving={isLeaving} label={backButtonLabel} onClick={routeToShowcase} />
    <FlexDiv>
      <CoverImg imgRef={setImgRef} src={imgixUrl(spotlight.persona.profilePic.url, { fit: 'crop', w: 45, h: 45 })} />
      <PaddedCover>
        <PersonaName ref={setNameRef}>{spotlight.persona.name}</PersonaName>
        <PersonaInstagram url={spotlight.persona.instagramUrl} />
        <PersonaDescription text={spotlight.persona.description} typingText={currentDescription} />
      </PaddedCover>
    </FlexDiv>
  </CoverInner>
))

export default SpotlightCover
