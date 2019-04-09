import Prompt from './prompt'
import React from 'react'

const Form = ({ children, isFormPristine, formRef, ...props }) => (
  <form action="" ref={formRef} {...props}>
    <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
    {children}
  </form>
)

export default Form
