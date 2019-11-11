import isEqual from 'lodash.isequal'
import { useCallback, useEffect, useMemo, useReducer } from 'react'

const useForm = ({ formObjectTransformer, loadFormObject, saveFormObject }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'merge') {
        return { ...state, ...action.value }
      } else if (action.type === 'mergeForm') {
        return { ...state, form: { ...state.form, ...action.value } }
      } else if (action.type === 'mergeFormCallback') {
        return { ...state, form: { ...state.form, ...action.callback(state.form) } }
      } else {
        throw new Error()
      }
    },
    { form: {}, initialForm: {}, isFormLoading: true, isFormSubmitting: false }
  )
  const setForm = useCallback(form => dispatch({ type: 'merge', value: { form } }), [dispatch])
  const mergeForm = useCallback(value => dispatch({ type: 'mergeForm', value }), [dispatch])
  const mergeFormCallback = useCallback(callback => dispatch({ type: 'mergeFormCallback', callback }), [dispatch])
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
      if (!json || json.error || json.errors) {
        setIsFormSubmitting(false)
        return json
      }
      const formObject = formObjectTransformer(json)
      setInitialForm(formObject)
      setForm(formObject)
      return formObject
    },
    [formObjectTransformer, saveFormObject, setForm, setInitialForm, setIsFormSubmitting, state.form]
  )

  const setFieldValue = useCallback(
    event =>
      mergeForm({ [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }),
    [mergeForm]
  )

  useEffect(() => {
    ;(async () => {
      const json = await loadFormObject()
      const formObject = formObjectTransformer(json)
      setInitialForm(formObject)
      setForm(formObject)
      setIsFormLoading(false)
    })()
  }, [formObjectTransformer, loadFormObject, setInitialForm, setForm, setIsFormLoading])

  useEffect(() => {
    setIsFormSubmitting(false)
  }, [state.initialForm, setIsFormSubmitting])

  return {
    form: state.form,
    isFormLoading: state.isFormLoading,
    isFormPristine,
    isFormSubmitting: state.isFormSubmitting,
    mergeForm,
    mergeFormCallback,
    onFormSubmit,
    setFieldValue,
    setForm,
  }
}

export default useForm
