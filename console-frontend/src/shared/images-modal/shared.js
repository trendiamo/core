import Button from 'shared/button'
import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'

export const DialogActionsContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`

export const StyledButton = styled(props => <Button {...omit(props, ['withUploader'])} />)`
  margin-right: 12px;
  ${({ withUploader }) =>
    withUploader &&
    `
    padding: 0;
    label {
      padding: 8px 16px;
    }
  `}
`
