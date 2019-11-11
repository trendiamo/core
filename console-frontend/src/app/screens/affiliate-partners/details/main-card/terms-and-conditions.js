import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import React from 'react'
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

const StyledExpansionPanel = styled(ExpansionPanel)`
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);

  &,
  &:first-child,
  &:last-child {
    border-radius: 0;
  }
`

/* eslint-enable react/jsx-max-depth */
const TermsAndConditions = ({ brand, onTermsAndConditionsChange, termsAndConditionsExpanded, termsRef }) => {
  if (brand.isPreview) return null

  return (
    <TermsContainer ref={termsRef}>
      <StyledExpansionPanel expanded={termsAndConditionsExpanded} onChange={onTermsAndConditionsChange}>
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

export default TermsAndConditions