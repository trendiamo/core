import countries from 'special/assessment/form/countries'
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

const Select = styled.select`
  background-color: #fff;
  -webkit-appearance: none;
  background: #fff;
  width: 100%;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #555;
  padding: 5px 15px;
  font-size: 14px;
  color: ${({ value }) => (value ? '#333' : '#757575')};
  outline: none;
  margin-bottom: 4px;
  margin-top: 4px;
`

const CountrySelect = ({ onChange, placeholder, required, value }) => {
  return (
    <Select onBlur={onChange} onChange={onChange} required={required} value={value}>
      <option disabled selected value="">
        {placeholder}
      </option>
      {countries.map(country => (
        <option disabled={country === '--'} key={country} value={country}>
          {country}
        </option>
      ))}
    </Select>
  )
}

const Field = ({ field, value, setField }) => {
  const onChange = useCallback(event => setField(field.name, event.target.value), [field.name, setField])

  const FieldComponent = useMemo(
    () => (field.multiline ? MultilineField : field.type === 'country-select' ? CountrySelect : FieldInput),
    [field.multiline, field.type]
  )

  return <FieldComponent onChange={onChange} placeholder={field.placeholder} required={field.required} value={value} />
}

const AssessmentForm = ({ data, onChange }) => {
  const [form, setForm] = useState(
    data.reduce((res, e) => {
      res[e.name] = ''
      return res
    }, {})
  )

  const setField = useCallback(
    (name, value) => {
      const newForm = { ...form, [name]: value }
      setForm(newForm)
      onChange({ type: 'mergeAssessmentForm', item: newForm, data })
    },
    [data, form, onChange]
  )

  return (
    <Container>
      {data.map(field => (
        <Field field={field} key={field.name} setField={setField} value={form[field.name]} />
      ))}
    </Container>
  )
}

export default AssessmentForm
