import ActionsMenu from './simple-menu'
import Button from 'shared/button'
import React, { useCallback, useMemo } from 'react'
import SaveButton from './save-button'
import styled from 'styled-components'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Tooltip } from '@material-ui/core'

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

const Actions = ({
  isFormSubmitting,
  isFormPristine,
  isRejecting,
  isSubmitting,
  message,
  onFormSubmit,
  onPreviewClick,
  onRejectClick,
  onSubmitClick,
  previewEnabled,
  rejectEnabled,
  saveAndCreateNewEnabled,
  saveDisabled,
  submitEnabled,
  tooltipEnabled,
  tooltipTextSubmit,
  tooltipText,
  width,
}) => {
  const actions = useMemo(
    () =>
      [
        saveAndCreateNewEnabled && {
          label: 'Save & New',
          color: 'actions',
          disabled: saveDisabled,
          onClick: onFormSubmit,
        },
        previewEnabled && { label: 'Preview', color: 'actions', onClick: onPreviewClick },
        !rejectEnabled && {
          label: message || 'Save',
          color: 'primaryGradient',
          disabled: saveDisabled,
          onClick: onFormSubmit,
        },
        submitEnabled && {
          label: 'Submit',
          color: 'primaryGradient',
          onClick: onSubmitClick,
          disabled: !isFormPristine || isSubmitting,
        },
        rejectEnabled && { label: 'Reject', color: 'error', disabled: isRejecting, onClick: onRejectClick },
      ].filter(item => item),
    [
      isFormPristine,
      isRejecting,
      isSubmitting,
      message,
      onFormSubmit,
      onPreviewClick,
      onRejectClick,
      onSubmitClick,
      previewEnabled,
      rejectEnabled,
      saveAndCreateNewEnabled,
      saveDisabled,
      submitEnabled,
    ]
  )

  if (!isWidthUp('sm', width)) return <ActionsMenu actions={actions} disabled={isFormSubmitting} />

  return (
    <>
      <Container>
        {saveAndCreateNewEnabled &&
          actions.map(action => (
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
        {previewEnabled && (
          <FlexDiv>
            <Button color="actions" onClick={onPreviewClick}>
              {'Preview'}
            </Button>
          </FlexDiv>
        )}
        {!saveAndCreateNewEnabled && !rejectEnabled && (
          <FlexDiv>
            <SaveButton
              disabled={saveDisabled}
              isFormPristine={isFormPristine}
              isFormSubmitting={isFormSubmitting}
              message={message}
              onClick={onFormSubmit}
              tooltipEnabled={tooltipEnabled}
              tooltipText={tooltipText}
            />
          </FlexDiv>
        )}
        {submitEnabled && (
          <Tooltip placement="bottom-start" title={tooltipTextSubmit}>
            <FlexDiv>
              <Button
                color="primaryGradient"
                disabled={!isFormPristine || isSubmitting}
                isFormSubmitting={isSubmitting}
                onClick={onSubmitClick}
              >
                {'Submit'}
              </Button>
            </FlexDiv>
          </Tooltip>
        )}
        {rejectEnabled && (
          <FlexDiv>
            <Button
              color="error"
              disabled={isRejecting}
              isFormSubmitting={isRejecting}
              message="Reject"
              onClick={onRejectClick}
            >
              {'Reject'}
            </Button>
          </FlexDiv>
        )}
      </Container>
    </>
  )
}

export default withWidth()(Actions)
