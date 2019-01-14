import BackButton from 'shared/back-button'
import React from 'react'
import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withProps } from 'recompose'
import { CoverImg, PaddedCover, PersonaDescription } from 'shared/cover'
import { TopSlideAnimation } from 'shared/animate'
import { transition } from 'ext'

const FlexDiv = styled.div`
  display: flex;
`

const SpotlightCover = compose(
  withHandlers(() => {
    let imgRef, nameRef
    return {
      landElements: () => () => {
        if (!transition.isLiftingElements) return
        transition.landElement('img', imgRef.base || imgRef)
        transition.landElement('name', nameRef)
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
  withProps(({ id, spotlights }) => ({
    spotlight: spotlights.find(e => e.id == id),
  }))
)(({ isLeaving, routeToShowcase, setImgRef, setNameRef, spotlight }) => (
  <FlexDiv>
    <CoverImg ref={setImgRef} src={spotlight.persona.profilePic.url} />
    <PaddedCover>
      <span ref={setNameRef}>{spotlight.persona.name}</span>
      <TopSlideAnimation delay={250 * 1}>
        <PersonaDescription>{spotlight.text}</PersonaDescription>
      </TopSlideAnimation>
    </PaddedCover>
    <BackButton isLeaving={isLeaving} onClick={routeToShowcase} />
  </FlexDiv>
))

export default SpotlightCover
