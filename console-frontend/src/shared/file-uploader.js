import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`

const Label = styled.label`
  z-index: 1;
  cursor: pointer;
`

const FileUploader = ({ accept, content, inputProps, name, onChange }) => (
  <React.Fragment>
    <Input accept={accept || '*'} id={name} name={name} onChange={onChange} type="file" {...inputProps} />
    <Label htmlFor={name}>{content}</Label>
  </React.Fragment>
)

export default FileUploader
