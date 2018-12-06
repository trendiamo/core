import React from 'react'
import styled from 'styled-components'
import { Divider, FlexBar, Header } from 'shared/form-elements'
import { Card as MuiCard, CardContent as MuiCardContent } from '@material-ui/core'

const Card = styled(MuiCard)`
  & + * {
    margin-top: 10px;
  }
`

const CardContent = styled(MuiCardContent)`
  padding: 16px 24px;
  &:last-child {
    padding-bottom: 16px;
  }
`

const FormCard = ({ title, children, actions }) => (
  <Card>
    <CardContent>
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
    </CardContent>
  </Card>
)

export default FormCard
