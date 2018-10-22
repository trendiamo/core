import compose from 'recompose/compose'
import MuiToolbar from '@material-ui/core/Toolbar'
import { SaveButton } from 'react-admin'
import withWidth from '@material-ui/core/withWidth'
import React, { Children } from 'react'
const valueOrDefault = (value, defaultValue) => (typeof value === 'undefined' ? defaultValue : value)
const Toolbar = ({
  basePath,
  children,
  handleSubmit,
  handleSubmitWithRedirect,
  invalid,
  pristine,
  redirect,
  saving,
  submitOnEnter,
  ...rest
}) => (
  <MuiToolbar disableGutters {...rest}>
    {Children.count(children) === 0 ? (
      <div>
        <SaveButton
          handleSubmitWithRedirect={handleSubmitWithRedirect}
          invalid={invalid}
          redirect={redirect}
          saving={saving}
          submitOnEnter={submitOnEnter}
        />
      </div>
    ) : (
      Children.map(
        children,
        button =>
          button
            ? React.cloneElement(button, {
                basePath,
                handleSubmit: valueOrDefault(button.props.handleSubmit, handleSubmit),
                handleSubmitWithRedirect: valueOrDefault(
                  button.props.handleSubmitWithRedirect,
                  handleSubmitWithRedirect
                ),
                invalid,
                pristine,
                saving,
                submitOnEnter: valueOrDefault(button.props.submitOnEnter, submitOnEnter),
              })
            : null
      )
    )}
  </MuiToolbar>
)
Toolbar.defaultProps = {
  submitOnEnter: true,
}
const enhance = compose(withWidth())
export default enhance(Toolbar)
