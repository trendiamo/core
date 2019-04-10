import React from 'react'
import SaveButton from './save-button'

const Actions = ({ tooltipEnabled, isFormSubmitting, onFormSubmit, saveDisabled, isFormPristine, tooltipText }) => (
  <React.Fragment>
    <SaveButton
      disabled={saveDisabled}
      isFormPristine={isFormPristine}
      isFormSubmitting={isFormSubmitting}
      onClick={onFormSubmit}
      tooltipEnabled={tooltipEnabled}
      tooltipText={tooltipText}
    />
  </React.Fragment>
)

export default Actions
