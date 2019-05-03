import { isEqual } from 'lodash'
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'

const useForm = ({ afterFormMount, defaultForm, formObjectTransformer, loadFormObject, saveFormObject }) => {
  const [initialForm, setInitialForm] = useState(defaultForm)
  const [form, dispatch] = useReducer((state, action) => {
    if (action.type === 'merge') {
      return { ...state, ...action.value }
    } else {
      throw new Error()
    }
  }, initialForm)
  const setForm = useCallback(value => dispatch({ type: 'merge', value }), [dispatch])

  const [isFormLoading, setIsFormLoading] = useState(true)
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  const isFormPristine = useMemo(() => isEqual(form, initialForm), [form, initialForm])
  const onFormSubmit = useCallback(
    async event => {
      event.preventDefault()
      setIsFormSubmitting(true)
      const json = await saveFormObject(form)
      if (json.error || json.errors) return json
      const formObject = formObjectTransformer(json)
      setInitialForm(formObject)
      setForm(formObject)
      return formObject
    },
    [form, formObjectTransformer, saveFormObject, setIsFormSubmitting, setInitialForm, setForm]
  )
  const setFieldValue = useCallback(
    event => {
      setForm({ [event.target.name]: event.target.value })
    },
    [setForm]
  )
  useEffect(
    () => {
      const initForm = async () => {
        const json = await loadFormObject()
        const formObject = formObjectTransformer(json)
        setInitialForm(formObject)
        setForm(formObject)
        setIsFormLoading(false)
        if (afterFormMount) afterFormMount(formObject)
      }
      initForm()
    },
    [afterFormMount, formObjectTransformer, loadFormObject, setInitialForm, setForm, setIsFormLoading]
  )
  useEffect(() => setIsFormSubmitting(false), [initialForm, setIsFormSubmitting])

  return {
    form,
    isFormLoading,
    isFormPristine,
    isFormSubmitting,
    onFormSubmit,
    setFieldValue,
    setForm,
    setIsFormSubmitting,
  }
}

export default useForm
