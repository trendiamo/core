import Notification from 'shared/notification'
import Prompt from './prompt'
import React from 'react'

const Form = ({ children, promptMessage, isFormPristine, errors, formRef, ...props }) => (
  <React.Fragment>
    <form action="" ref={formRef} {...props}>
      <Prompt message={promptMessage} when={!isFormPristine} />
      <Notification data={errors} />
      {children}
    </form>
  </React.Fragment>
)

export default Form
