import React, { useContext, useEffect, useMemo, useRef } from 'react'
import SellerInstagram from 'shared/seller-instagram'
import styled from 'styled-components'
import { BackButton } from 'shared'
import { CoverImg, CoverInner, PaddedCover, SellerDescription } from 'shared/cover/components'
import { sellerPicUrl } from 'tools'
import { ThemeContext, transition, useTextTyping } from 'ext'

const FlexDiv = styled.div`
  display: flex;
`

const SellerName = styled.div`
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

  const currentDescription = useTextTyping(spotlight ? spotlight.seller.description : '', 500)

  const theme = useContext(ThemeContext)

  if (!spotlight) return null

  return (
    <CoverInner>
      <BackButton isLeaving={isLeaving} label={backButtonLabel} onClick={routeToShowcase} />
      <FlexDiv>
        <CoverImg ref={imgRef} src={sellerPicUrl(spotlight.seller, spotlight.useSellerAnimation, { w: 45, h: 45 })} />
        <PaddedCover>
          <SellerName ref={nameRef} theme={theme}>
            {spotlight.seller.name}
          </SellerName>
          <SellerInstagram url={spotlight.seller.instagramUrl} />
          <SellerDescription text={spotlight.seller.description} theme={theme} typingText={currentDescription} />
        </PaddedCover>
      </FlexDiv>
    </CoverInner>
  )
}

export default SpotlightCover
