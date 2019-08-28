import Footer from './footer'
import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'

const BrandDescription = styled.div`
  color: #1b3b50;
`

const ContentContainer = styled.div`
  overflow-x: hidden;
  padding: 10px 60px 20px;
  margin-top: 70px;
  max-height: 300px;
  position: relative;
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
    contentRef.current.scrollTo(0, termsRef.current.offsetTop)
  }, [])

  return (
    <div>
      <ContentContainer ref={contentRef}>
        <BrandDescription dangerouslySetInnerHTML={{ __html: brand.fullDescription }} />
        <TermsAndConditions brand={brand} termsRef={termsRef} />
      </ContentContainer>
      <Footer
        brand={brand}
        createAffiliation={createAffiliation}
        handleClose={handleClose}
        scrollToTermsAndConditions={scrollToTermsAndConditions}
      />
    </div>
  )
}

export default Content
