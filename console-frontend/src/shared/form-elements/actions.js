import ActionsMenu from './simple-menu'
import React from 'react'
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
  <React.Fragment>
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
          {actions.map((action, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <FlexDiv key={index}>
              <SaveButton
                color={action.color}
                disabled={saveDisabled}
                isFormPristine={isFormPristine}
                isFormSubmitting={isFormSubmitting}
                message={action.label}
                onClick={event => onFormSubmit(event, action.label)}
                tooltipEnabled={tooltipEnabled}
                tooltipText={tooltipText}
              />
            </FlexDiv>
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
  </React.Fragment>
)

export default withWidth()(Actions)
