import Prompt from './prompt'
import React from 'react'

const Form = ({ children, formRef, isFormPristine, onSubmit }) => (
  <form action="" onSubmit={onSubmit} ref={formRef}>
    <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
    {children}
  </form>
)

export default Form
