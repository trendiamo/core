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
      onFormSubmit: ({ formObjectTransformer, setForm, form, saveFormObject, setInitialForm }) => async event => {
        event.preventDefault()
        const json = await saveFormObject(form)
        if (json.error || json.errors) return json
        const formObject = formObjectTransformer(json)
        setInitialForm(formObject)
        setForm(formObject)
        return formObject
      },
      setFieldValue: ({ form, setForm }) => event => {
        setForm({ ...form, [event.target.name]: event.target.value })
      },
    }),
    lifecycle({
      async componentDidMount() {
        const { formObjectTransformer, loadFormObject, setForm, setInitialForm, setIsFormLoading } = this.props
        const json = await loadFormObject()
        const formObject = formObjectTransformer(json)
        setInitialForm(formObject)
        setForm(formObject)
        setIsFormLoading(false)
      },
    })
  )(BaseComponent)

export default withForm
