import React from 'react'
import SaveButton from './save-button'

const Actions = ({ onFormSubmit, saveDisabled }) => (
  <React.Fragment>
    <SaveButton disabled={saveDisabled} onClick={onFormSubmit} />
  </React.Fragment>
)

export default Actions
