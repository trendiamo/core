import Footer from './footer'
import Header from './header'
import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const BrandDescription = styled.div`
  color: #272932;
  h2 {
    font-size: 20px;
  }
`

const ContentContainer = styled.div`
  overflow-x: hidden;
  padding: 12px 24px;
  position: relative;
  @media (min-width: 960px) {
    padding: 10px 60px 20px;
  }
  margin-top: 70px;
  font-family: Lato, 'Helvetica', 'Arial', sans-serif;
`

const ContentScrollContainer = styled.div`
  overflow-y: auto;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const TermsAndConditionsContent = styled.div``

const TermsAndConditions = ({ brand, termsRef }) => (
  <div ref={termsRef}>
    <Typography variant="h5">{'Terms and Conditions'}</Typography>
    <TermsAndConditionsContent dangerouslySetInnerHTML={{ __html: brand.termsAndConditions }} />
  </div>
)

const Content = ({ brand, removeAffiliation, createAffiliation, handleClose, selectedAffiliation, isLoading }) => {
  const contentRef = useRef(null)
  const termsRef = useRef(null)
  const headerRef = useRef(null)

  const scrollToTermsAndConditions = useCallback(() => {
    if (!contentRef.current || !termsRef.current || !headerRef.current) return
    contentRef.current.scrollTo(0, termsRef.current.offsetTop + headerRef.current.clientHeight + 55)
  }, [])

  return (
    <MainContainer>
      <ContentScrollContainer ref={contentRef}>
        <Header brand={brand} headerRef={headerRef} />
        <ContentContainer>
          <BrandDescription dangerouslySetInnerHTML={{ __html: brand.fullDescription }} />
          <TermsAndConditions brand={brand} termsRef={termsRef} />
        </ContentContainer>
      </ContentScrollContainer>
      <Footer
        brand={brand}
        createAffiliation={createAffiliation}
        handleClose={handleClose}
        isLoading={isLoading}
        removeAffiliation={removeAffiliation}
        scrollToTermsAndConditions={scrollToTermsAndConditions}
        selectedAffiliation={selectedAffiliation}
      />
    </MainContainer>
  )
}

export default Content
