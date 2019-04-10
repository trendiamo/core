import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { isEqual } from 'lodash'

const withForm = initialForm => BaseComponent =>
  compose(
    withState('initialForm', 'setInitialForm', initialForm),
    withState('form', 'setForm', ({ initialForm }) => initialForm),
    withState('isFormLoading', 'setIsFormLoading', true),
    withState('isFormSubmitting', 'setIsFormSubmitting', false),
    withProps(({ form, initialForm }) => ({
      isFormPristine: isEqual(form, initialForm),
    })),
    withHandlers({
      onFormSubmit: ({
        formObjectTransformer,
        setForm,
        form,
        saveFormObject,
        setInitialForm,
        setIsFormSubmitting,
      }) => async event => {
        event.preventDefault()
        setIsFormSubmitting(true)
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
        const {
          afterFormMount,
          formObjectTransformer,
          loadFormObject,
          setForm,
          setInitialForm,
          setIsFormLoading,
        } = this.props
        const json = await loadFormObject()
        const formObject = formObjectTransformer(json)
        setInitialForm(formObject)
        setForm(formObject)
        setIsFormLoading(false)
        if (afterFormMount) afterFormMount(formObject)
      },
      componentDidUpdate(prevProps) {
        const { setIsFormSubmitting, initialForm } = this.props
        prevProps.initialForm !== initialForm && setIsFormSubmitting(false)
      },
    })
  )(BaseComponent)

export default withForm
