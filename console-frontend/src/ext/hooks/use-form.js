import { isEqual } from 'lodash'
import { useCallback, useEffect, useMemo, useReducer } from 'react'

const useForm = ({ afterFormMount, defaultForm, formObjectTransformer, loadFormObject, saveFormObject }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'mergeForm') {
        return { ...state, form: { ...state.form, ...action.value } }
      } else if (action.type === 'merge') {
        return { ...state, ...action.value }
      } else {
        throw new Error()
      }
    },
    { form: defaultForm, initialForm: defaultForm, isFormLoading: true, isFormSubmitting: false }
  )
  const mergeForm = useCallback(value => dispatch({ type: 'mergeForm', value }), [dispatch])
  const setForm = useCallback(form => dispatch({ type: 'merge', value: { form } }), [dispatch])
  const setInitialForm = useCallback(initialForm => dispatch({ type: 'merge', value: { initialForm } }), [dispatch])
  const setIsFormLoading = useCallback(isFormLoading => dispatch({ type: 'merge', value: { isFormLoading } }), [
    dispatch,
  ])
  const setIsFormSubmitting = useCallback(
    isFormSubmitting => dispatch({ type: 'merge', value: { isFormSubmitting } }),
    [dispatch]
  )

  const isFormPristine = useMemo(() => isEqual(state.form, state.initialForm), [state.form, state.initialForm])
  const onFormSubmit = useCallback(
    async event => {
      event.preventDefault()
      setIsFormSubmitting(true)
      const json = await saveFormObject(state.form)
      if (json.error || json.errors) return json
      const formObject = formObjectTransformer(json)
      setInitialForm(formObject)
      setForm(formObject)
      return formObject
    },
    [setIsFormSubmitting, saveFormObject, state.form, formObjectTransformer, setInitialForm, setForm]
  )
  const setFieldValue = useCallback(
    event => {
      mergeForm({ [event.target.name]: event.target.value })
    },
    [mergeForm]
  )
  useEffect(
    () => {
      ;(async () => {
        const json = await loadFormObject()
        const formObject = formObjectTransformer(json)
        setInitialForm(formObject)
        setForm(formObject)
        setIsFormLoading(false)
        if (afterFormMount) afterFormMount(formObject)
      })()
    },
    [afterFormMount, formObjectTransformer, loadFormObject, setInitialForm, setForm, setIsFormLoading]
  )
  useEffect(() => setIsFormSubmitting(false), [state.initialForm, setIsFormSubmitting])

  return {
    form: state.form,
    isFormLoading: state.isFormLoading,
    isFormPristine,
    isFormSubmitting: state.isFormSubmitting,
    mergeForm,
    onFormSubmit,
    setFieldValue,
    setForm,
    setIsFormSubmitting,
  }
}

export default useForm
