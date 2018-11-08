const validateInfluencer = values => {
  const errors = {}
  if (!values.name) {
    errors.name = ['Required']
  }
  if (!values.description) {
    errors.description = ['Required']
  }
  return errors
}

export default validateInfluencer
