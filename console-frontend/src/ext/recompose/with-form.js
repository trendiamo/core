import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { isEqual } from 'lodash'

const withForm = initialForm => BaseComponent =>
  compose(
    withState('initialForm', 'setInitialForm', initialForm),
    withState('form', 'setForm', ({ initialForm }) => initialForm),
    withState('isFormLoading', 'setIsFormLoading', true),
    withProps(({ form, initialForm }) => ({
      isFormPristine: isEqual(form, initialForm),
    })),
    withHandlers({
      onFormSubmit: ({ afterSave, form, saveFormObject, setInitialForm }) => async event => {
        event.preventDefault()
        const result = await saveFormObject(form)
        setInitialForm(form)
        afterSave && afterSave(result)
        return result
      },
      setFieldValue: ({ form, setForm }) => event => {
        setForm({ ...form, [event.target.name]: event.target.value })
      },
    }),
    lifecycle({
      async componentDidMount() {
        const { loadFormObject, setForm, setInfo, setInitialForm, setIsFormLoading } = this.props
        const formObject = await loadFormObject(setInfo)
        setInitialForm(formObject)
        setForm(formObject)
        setIsFormLoading(false)
      },
    })
  )(BaseComponent)

export default withForm
