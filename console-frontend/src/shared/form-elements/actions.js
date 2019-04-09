import React from 'react'
import SaveButton from './save-button'
import Tooltip from '@material-ui/core/Tooltip'

const Actions = ({ onFormSubmit, saveDisabled, saveClassName, isFormPristine }) => (
  <React.Fragment>
    {isFormPristine ? (
      <Tooltip placement="bottom-start" title="no changes detected">
        <div>
          <SaveButton className={saveClassName} disabled={saveDisabled} onClick={onFormSubmit} />
        </div>
      </Tooltip>
    ) : (
      <SaveButton className={saveClassName} disabled={saveDisabled} onClick={onFormSubmit} />
    )}
  </React.Fragment>
)

export default Actions
