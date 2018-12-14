import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import { Divider, FlexBar, Header } from 'shared/form-elements'

const FormContainer = ({ title, children, actions }) => (
  <PaperContainer>
    {title && (
      <>
        <FlexBar>
          <Header variant="subtitle1">{title}</Header>
          {actions}
        </FlexBar>
        <Divider />
      </>
    )}
    {children}
  </PaperContainer>
)

export default FormContainer
