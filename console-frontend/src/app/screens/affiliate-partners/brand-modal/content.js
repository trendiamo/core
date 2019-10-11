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

const ExpansionPanelContent = styled.div`
  > p:first-child {
    margin-top: 0;
  }
`

const onZendeskHelpClick = () => {
  if (!window.zE) return
  const plugin = document.querySelector('.frekkls-container')
  if (plugin) plugin.remove()
  window.zE('webWidget', 'show')
  window.zE('webWidget', 'toggle')
}

const TextButton = styled.button`
  font-family: Lato, 'Helvetica', 'Arial', sans-serif;
  font-size: 16px;
  background: none;
  border: 0;
  margin: 0;
  padding: 0;
  outline: none;
  text-decoration: underline;
  cursor: pointer;
  color: #00e;
`

const StyledExpansionPanel = styled(ExpansionPanel)`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  &,
  &:first-child,
  &:last-child {
    border-radius: 0;
  }
`

/* eslint-disable react/jsx-max-depth */
const SampleProductInstructions = () => (
  <div>
    <StyledExpansionPanel>
      <ExpansionPanelSummary aria-controls="panel-spi-content" expandIcon={<ExpandMoreIcon />} id="panel-spi-header">
        <Typography variant="h5">{'Sample Product Requests'}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ExpansionPanelContent>
          <p>
            {'If you are interested in receiving a free sample product you can apply by sending an email to '}
            <a href="mailto:support@uptous.co">{'support@uptous.co'}</a>
            {' or by filling out '}
            <TextButton onClick={onZendeskHelpClick}>{'this form'}</TextButton>
            {' with the following information:'}
          </p>
          <ul>
            <li>{'Name of the Brand'}</li>
            <li>{'Link to the Product'}</li>
            <li>{'Text describing the content you will create with the product and how you will post it.'}</li>
          </ul>
          <p>
            {
              'Using email: Please, use the same email address you used for your Uptous account as the sender address and put "Sample Product Request" as the subject.'
            }
          </p>
          <p>{'Using the form: Please select "Sample Product Request" as the subject.'}</p>
          <p>{'Applications that miss any information mentioned above will be declined.'}</p>
        </ExpansionPanelContent>
      </ExpansionPanelDetails>
    </StyledExpansionPanel>
  </div>
)
/* eslint-enable react/jsx-max-depth */

const TermsAndConditions = styled(({ brand, className, expanded, onChange, termsRef }) => (
  <div className={className} ref={termsRef}>
    <StyledExpansionPanel expanded={expanded} onChange={onChange}>
      <ExpansionPanelSummary aria-controls="panel-tc-content" expandIcon={<ExpandMoreIcon />} id="panel-tc-header">
        <Typography variant="h5">{'Terms and Conditions'}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <ExpansionPanelContent dangerouslySetInnerHTML={{ __html: brand.termsAndConditions }} />
      </ExpansionPanelDetails>
    </StyledExpansionPanel>
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
            <>
              <SampleProductInstructions />
              <TermsAndConditions brand={brand} expanded={tcExpanded} onChange={onTCEPchange} termsRef={termsRef} />
            </>
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
