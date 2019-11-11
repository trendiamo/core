import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import HostnamesForm from 'shared/hostnames-form'
import Layout from './layout'
import React, { useCallback } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import useForm from 'ext/hooks/use-form'
import { apiAccountCreate, apiRequest, atLeastOneNonBlankCharInputProps } from 'utils'
import { Field, Form } from 'shared/form-elements'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const SaveButton = styled(Button)`
  margin-top: 1rem;
`

const loadFormObject = () => {
  return {
    name: '',
    brandName: '',
    brandDescription: '',
    brandLogoUrl: '',
    websitesAttributes: [{ hostnames: [''] }],
  }
}

const formObjectTransformer = json => {
  return {
    name: json.name || '',
    brandName: json.brandName || '',
    brandDescription: json.brandDescription || '',
    brandLogoUrl: json.brandLogoUrl || '',
    hostnames: json.websitesAttributes[0].hostnames || [''],
  }
}

const NewAccount = ({ history }) => {
  const { enqueueSnackbar } = useSnackbar()

  const saveFormObject = useCallback(
    async form => {
      const { json, errors, requestError } = await apiRequest(apiAccountCreate, [
        {
          account: {
            name: form.name,
            websitesAttributes: [
              {
                name: form.name,
                hostnames: form.hostnames,
              },
            ],
          },
        },
      ])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) {
        enqueueSnackbar('Successfully created account', { variant: 'success' })
      }
      return json
    },
    [enqueueSnackbar]
  )

  const {
    form,
    isFormLoading,
    isFormPristine,
    isFormSubmitting,
    onFormSubmit,
    setFieldValue,
    mergeFormCallback,
  } = useForm({
    formObjectTransformer,
    loadFormObject,
    saveFormObject,
  })

  const newOnFormSubmit = useCallback(
    async event => {
      const result = await onFormSubmit(event)
      if (!result || result.error || result.errors) return
      history.push(routes.accounts())
      return result
    },
    [history, onFormSubmit]
  )

  const addHostnameSelect = useCallback(() => {
    mergeFormCallback(form => ({ hostnames: [...form.hostnames, ''] }))
  }, [mergeFormCallback])

  const deleteHostname = useCallback(
    index => {
      mergeFormCallback(form => {
        const newHostnames = [...form.hostnames]
        newHostnames.splice(index, 1)
        return { hostnames: newHostnames }
      })
    },
    [mergeFormCallback]
  )

  const editHostnameValue = useCallback(
    (index, newValue) => {
      mergeFormCallback(form => {
        const newHostnames = [...form.hostnames]
        newHostnames[index] = newValue
        return { ...form, hostnames: newHostnames }
      })
    },
    [mergeFormCallback]
  )

  if (isFormLoading) return <CircularProgress />

  return (
    <Layout>
      <Form isFormPristine={isFormPristine} onSubmit={newOnFormSubmit}>
        <h2>{'New Account'}</h2>
        <Field
          autoFocus
          inputProps={atLeastOneNonBlankCharInputProps}
          label="Name"
          name="name"
          onChange={setFieldValue}
          required
          value={form.name}
        />
        <HostnamesForm
          addHostnameSelect={addHostnameSelect}
          deleteHostname={deleteHostname}
          editHostnameValue={editHostnameValue}
          form={form}
          isFormLoading={isFormLoading}
        />
        <SaveButton
          color="primaryGradient"
          disabled={isFormSubmitting || isFormLoading || isFormPristine}
          type="submit"
          variant="contained"
        >
          {'Save'}
        </SaveButton>
      </Form>
    </Layout>
  )
}

export default withRouter(NewAccount)
