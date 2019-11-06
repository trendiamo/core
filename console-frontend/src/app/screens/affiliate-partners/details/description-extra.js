import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core'

const TermsContainer = styled.div`
  margin: 14px 0;
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
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
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
        <Typography variant="h6">{'Sample Product Requests'}</Typography>
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
const TermsAndConditions = ({ brand }) => {
  const termsRef = useRef(null)
  const [expanded, setExpanded] = useState(false)

  const onChange = useCallback((_el, value) => setExpanded(value), [])

  return (
    <TermsContainer ref={termsRef}>
      <StyledExpansionPanel expanded={expanded} onChange={onChange}>
        <ExpansionPanelSummary aria-controls="panel-tc-content" expandIcon={<ExpandMoreIcon />} id="panel-tc-header">
          <Typography variant="h6">{'Terms and Conditions'}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ExpansionPanelContent dangerouslySetInnerHTML={{ __html: brand.termsAndConditions }} />
        </ExpansionPanelDetails>
      </StyledExpansionPanel>
    </TermsContainer>
  )
}

const DescriptionExtra = ({ brand }) => {
  if (brand.isPreview) return null

  return (
    <>
      <SampleProductInstructions />
      <TermsAndConditions brand={brand} />
    </>
  )
}

export default DescriptionExtra
