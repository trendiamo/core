import ActionsMenu from './simple-menu'
import React, { useCallback } from 'react'
import SaveButton from './save-button'
import styled from 'styled-components'
import withWidth from '@material-ui/core/withWidth'

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  @media (min-width: 800px) {
    flex-flow: row;
  }
`

const FlexDiv = styled.div`
  flex: 1;
  margin: 2px 5px;
  white-space: nowrap;
`

const Action = ({ action, disabled, isFormPristine, onFormSubmit, isFormSubmitting, tooltipEnabled, tooltipText }) => {
  const onSaveClick = useCallback(event => onFormSubmit(event, action.label), [action.label, onFormSubmit])

  return (
    <FlexDiv>
      <SaveButton
        color={action.color}
        disabled={disabled}
        isFormPristine={isFormPristine}
        isFormSubmitting={isFormSubmitting}
        message={action.label}
        onClick={onSaveClick}
        tooltipEnabled={tooltipEnabled}
        tooltipText={tooltipText}
      />
    </FlexDiv>
  )
}

const actions = [{ label: 'Save', color: 'primaryGradient' }, { label: 'Save & New', color: 'actions' }]

const Actions = ({
  tooltipEnabled,
  isFormSubmitting,
  onFormSubmit,
  saveDisabled,
  isFormPristine,
  tooltipText,
  saveAndCreateNewEnabled,
  width,
}) => (
  <>
    {saveAndCreateNewEnabled ? (
      width === 'sm' || width === 'xs' ? (
        <ActionsMenu
          actions={actions}
          disabled={saveDisabled}
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          onFormSubmit={onFormSubmit}
        />
      ) : (
        <Container>
          {actions.map(action => (
            <Action
              action={action}
              disabled={saveDisabled}
              isFormPristine={isFormPristine}
              isFormSubmitting={isFormSubmitting}
              key={action.label}
              onFormSubmit={onFormSubmit}
              tooltipEnabled={tooltipEnabled}
              tooltipText={tooltipText}
            />
          ))}
        </Container>
      )
    ) : (
      <SaveButton
        disabled={saveDisabled}
        isFormPristine={isFormPristine}
        isFormSubmitting={isFormSubmitting}
        onClick={onFormSubmit}
        tooltipEnabled={tooltipEnabled}
        tooltipText={tooltipText}
      />
    )}
  </>
)

export default withWidth()(Actions)
