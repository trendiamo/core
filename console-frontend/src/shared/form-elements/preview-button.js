import Button from 'shared/button'
import React from 'react'

const PreviewButton = ({ color, onClick, isFormSubmitting, message, disabled }) => (
  <Button
    color={color || 'primaryGradient'}
    disabled={disabled}
    isFormSubmitting={isFormSubmitting}
    onClick={onClick}
    type="submit"
  >
    {message || 'Preview'}
  </Button>
)

export default PreviewButton
