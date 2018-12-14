import React from 'react'
import SaveButton from './save-button'

const Actions = ({ onFormSubmit, saveDisabled, saveClassName }) => (
  <React.Fragment>
    <SaveButton className={saveClassName} disabled={saveDisabled} onClick={onFormSubmit} />
  </React.Fragment>
)

export default Actions
