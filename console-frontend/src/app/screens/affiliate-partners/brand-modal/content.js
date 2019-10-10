import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Footer from './footer'
import Header from './header'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core'

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
  flex: 1;
`

const TermsAndConditionsContent = styled.div``

const TermsAndConditions = styled(({ brand, className, expanded, onChange, termsRef }) => (
  <div className={className} ref={termsRef}>
    <ExpansionPanel expanded={expanded} onChange={onChange}>
      <ExpansionPanelSummary aria-controls="panel1a-content" expandIcon={<ExpandMoreIcon />} id="panel1a-header">
        <Typography variant="h5">{'Terms and Conditions'}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TermsAndConditionsContent dangerouslySetInnerHTML={{ __html: brand.termsAndConditions }} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
))`
  margin-top: 2rem;
  margin-bottom: 1rem;
`

const Content = ({
  brand,
  createInterest,
  createAffiliation,
  handleClose,
  selectedAffiliation,
  interests,
  removeInterest,
}) => {
  const contentRef = useRef(null)
  const termsRef = useRef(null)
  const headerRef = useRef(null)
  const timeoutRef = useRef(null)

  const [tcExpanded, setTcExpanded] = useState(false)
  const onTCEPchange = useCallback((_el, value) => setTcExpanded(value), [])

  const scrollToTermsAndConditions = useCallback(
    () => {
      if (!contentRef.current || !termsRef.current || !headerRef.current) return
      onTCEPchange(null, true)
      timeoutRef.current = setTimeout(
        () =>
          contentRef.current.scrollTo({
            top: termsRef.current.offsetTop + headerRef.current.clientHeight + 55,
            behaviour: 'smooth',
          }),
        300
      )
    },
    [onTCEPchange]
  )

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const interest = useMemo(() => interests && brand && interests.find(interest => interest.brand.id === brand.id), [
    brand,
    interests,
  ])

  return (
    <MainContainer>
      <ContentScrollContainer ref={contentRef}>
        <Header brand={brand} headerRef={headerRef} />
        <ContentContainer>
          <BrandDescription dangerouslySetInnerHTML={{ __html: brand.fullDescription }} />
          {!brand.isPreview && (
            <TermsAndConditions brand={brand} expanded={tcExpanded} onChange={onTCEPchange} termsRef={termsRef} />
          )}
        </ContentContainer>
      </ContentScrollContainer>
      <Footer
        brand={brand}
        createAffiliation={createAffiliation}
        createInterest={createInterest}
        handleClose={handleClose}
        interest={interest}
        removeInterest={removeInterest}
        scrollToTermsAndConditions={scrollToTermsAndConditions}
        selectedAffiliation={selectedAffiliation}
      />
    </MainContainer>
  )
}

export default Content
