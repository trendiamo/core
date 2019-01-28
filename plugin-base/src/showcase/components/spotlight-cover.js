import BackButton from 'shared/back-button'
import PersonaInstagram from 'shared/persona-instagram'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps } from 'recompose'
import { CoverImg, CoverInner, PaddedCover, PersonaDescription } from 'shared/cover'
import { transition, withTextTyping } from 'ext'

const FlexDiv = styled.div`
  display: flex;
`

const SpotlightCover = compose(
  withHandlers(() => {
    let imgRef, nameRef
    return {
      landElements: () => () => {
        if (!transition.isLiftingElements) return
        if (imgRef) transition.landElement('img', imgRef.base || imgRef)
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
)(({ isLeaving, routeToShowcase, setImgRef, setNameRef, spotlight, currentDescription }) => (
  <CoverInner>
    <BackButton isLeaving={isLeaving} onClick={routeToShowcase} />
    <FlexDiv>
      <CoverImg imgRef={setImgRef} src={spotlight.persona.profilePic.url} />
      <PaddedCover>
        <span ref={setNameRef}>{spotlight.persona.name}</span>
        <PersonaInstagram url={spotlight.persona.instagramUrl} />
        <PersonaDescription text={spotlight.persona.description} typingText={currentDescription} />
      </PaddedCover>
    </FlexDiv>
  </CoverInner>
))

export default SpotlightCover
