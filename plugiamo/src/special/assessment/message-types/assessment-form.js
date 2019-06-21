import styled from 'styled-components'
import { h } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'

const FieldInput = styled.input`
  font-family: Roboto, sans-serif;
  background: #fff;
  width: 100%;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #555;
  padding: 5px 15px;
  font-size: 14px;
  color: #333;
  outline: none;
  margin-bottom: 4px;
  margin-top: 4px;
`

const MultilineField = styled.textarea`
  font-family: Roboto, sans-serif;
  resize: none;
  background: #fff;
  width: 100%;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #555;
  padding: 0px 15px;
  padding-top: 11px;
  font-size: 14px;
  color: #333;
  outline: none;
  margin-bottom: 4px;
  margin-top: 4px;
`

const Container = styled.div`
  width: 100%;
`

const Field = ({ setField, form, field }) => {
  const currentFormValue = useMemo(() => form[field.name].value, [field.name, form])

  const onChange = useCallback(event => setField(field.name, event.target.value), [field.name, setField])

  if (field.multiline) {
    return <MultilineField onChange={onChange} placeholder={field.placeholder} value={currentFormValue} />
  }

  return <FieldInput onChange={onChange} placeholder={field.placeholder} value={currentFormValue} />
}

const AssessmentForm = ({ data, onChange }) => {
  const formObject = []
  data.forEach(item => (formObject[item.name] = { value: '', required: item.required }))
  const [form, setForm] = useState(formObject)

  const setField = useCallback(
    (name, value) => {
      const newForm = { ...form }
      newForm[name].value = value
      setForm(newForm)
      onChange({ type: 'changeAssessmentForm', item: newForm })
    },
    [form, onChange]
  )

  return (
    <Container>
      {data.map(field => (
        <Field field={field} form={form} key={field.name} multiline={data.multiline} setField={setField} />
      ))}
    </Container>
  )
}

export default AssessmentForm
