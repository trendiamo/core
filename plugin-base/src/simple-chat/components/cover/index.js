import defaultHeaderConfig from './header-config'
import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { BackButton, Cover as CoverBase, SellerInstagram } from 'shared'
import { CoverImg, PaddedCover, SellerDescription } from 'shared/cover/components'
import { sellerPicUrl } from 'tools'
import { ThemeContext, useTextTyping } from 'ext'

const SellerName = styled.div`
  color: ${({ theme }) => theme.textColor};
  display: inline-block;
`

const FlexDiv = styled.div`
  display: flex;
`

const Cover = ({ backButtonConfig, backButtonLabel, FlowBackButton, headerConfig, seller, showBackButton, step }) => {
  const currentDescription = useTextTyping(seller.description, 300)

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
        <CoverImg src={sellerPicUrl(seller, step.simpleChat.useSellerAnimation, { w: 45, h: 45 })} />
        <PaddedCover>
          <SellerName theme={theme}>{seller.name}</SellerName>
          <SellerInstagram url={seller.instagramUrl} />
          <SellerDescription text={seller.description} typingText={currentDescription} />
        </PaddedCover>
      </FlexDiv>
    </CoverBase>
  )
}

export default Cover
