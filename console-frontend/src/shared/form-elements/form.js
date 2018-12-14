import Notification from 'shared/notification'
import Prompt from './prompt'
import React from 'react'

const Form = ({ children, isFormPristine, errors, formRef, ...props }) => (
  <React.Fragment>
    <form action="" ref={formRef} {...props}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <Notification data={errors} />
      {children}
    </form>
  </React.Fragment>
)

export default Form
