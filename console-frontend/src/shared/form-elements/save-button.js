import Button from 'shared/button'
import React from 'react'

const SaveButton = ({ onClick, tooltipText, tooltipEnabled, isFormSubmitting, isFormPristine, message, disabled }) => (
  <Button
    color="primaryGradient"
    disabled={disabled}
    isFormPristine={isFormPristine}
    isFormSubmitting={isFormSubmitting}
    onClick={onClick}
    tooltipEnabled={tooltipEnabled}
    tooltipPlacement="bottom-start"
    tooltipText={tooltipText}
    type="submit"
  >
    {message || 'Save'}
  </Button>
)

export default SaveButton
