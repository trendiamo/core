import Footer from './footer'
import Header from './header'
import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'

const BrandDescription = styled.div`
  color: #1b3b50;
`

const ContentContainer = styled.div`
  overflow-x: hidden;
  padding: 10px 60px 20px;
  margin-top: 70px;
  position: relative;
`

const ContentScrollContainer = styled.div`
  max-height: calc(100vh - 315px);
  overflow-y: auto;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TermsAndConditionsContent = styled.div``

const TermsAndConditions = ({ brand, termsRef }) => (
  <div ref={termsRef}>
    <h2>{'Terms and Conditions'}</h2>
    <TermsAndConditionsContent dangerouslySetInnerHTML={{ __html: brand.termsAndConditions }} />
  </div>
)

const Content = ({ brand, createAffiliation, handleClose }) => {
  const contentRef = useRef(null)
  const termsRef = useRef(null)

  const scrollToTermsAndConditions = useCallback(() => {
    if (!contentRef.current || !termsRef.current) return
    contentRef.current.scrollTo(0, termsRef.current.offsetTop + 350)
  }, [])

  return (
    <MainContainer>
      <ContentScrollContainer ref={contentRef}>
        <Header brand={brand} />
        <ContentContainer>
          <BrandDescription dangerouslySetInnerHTML={{ __html: brand.fullDescription }} />
          <TermsAndConditions brand={brand} termsRef={termsRef} />
        </ContentContainer>
      </ContentScrollContainer>
      <Footer
        brand={brand}
        createAffiliation={createAffiliation}
        handleClose={handleClose}
        scrollToTermsAndConditions={scrollToTermsAndConditions}
      />
    </MainContainer>
  )
}

export default Content
