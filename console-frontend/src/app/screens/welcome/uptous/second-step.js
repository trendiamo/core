import auth from 'auth'
import Button from 'shared/button'
import FormHelperText from 'shared/form-elements/form-helper-text'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import TagsSelector from './tags-selector'
import { apiMeUpdate, apiRequest, apiTagsList } from 'utils'
import { Form } from 'shared/form-elements'
import { Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const FormFooter = styled.div`
  padding-top: 1.5rem;
`

const StyledTypography = styled(Typography)`
  margin-top: 16px;
`

const StyledFormHelperText = styled(FormHelperText)`
  margin-top: 16px;
`

const SecondStep = () => {
  const [productCategoryTags, setProductCategoryTags] = useState([])
  const [positiveImpactAreaTags, setPositiveImpactAreaTags] = useState([])

  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      ;(async () => {
        const { json, errors, requestError } = await apiRequest(apiTagsList, [])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!requestError && !errors) {
          setProductCategoryTags(json.filter(tag => tag.tagType === 'product_category'))
          setPositiveImpactAreaTags(json.filter(tag => tag.tagType === 'positive_impact_area'))
        }
      })()
    },
    [enqueueSnackbar]
  )

  const positiveImpactAreaList = useMemo(() => positiveImpactAreaTags.filter(tag => tag.active).map(tag => tag.id), [
    positiveImpactAreaTags,
  ])
  const productCategoryList = useMemo(() => productCategoryTags.filter(tag => tag.active).map(tag => tag.id), [
    productCategoryTags,
  ])

  const selectedTagIds = useMemo(
    () => {
      return positiveImpactAreaList.concat(productCategoryList)
    },
    [positiveImpactAreaList, productCategoryList]
  )

  const onFormSubmit = useCallback(
    async event => {
      event.preventDefault()
      setIsFormSubmitting(true)
      const user = { tagIds: selectedTagIds }
      const { json, errors, requestError } = await apiRequest(apiMeUpdate, [{ user }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) {
        auth.setUser(json)
        window.location.href = routes.root()
      }
      setIsFormSubmitting(false)
    },
    [enqueueSnackbar, selectedTagIds]
  )

  const areTagsEmpty = useMemo(() => positiveImpactAreaList.length === 0 || productCategoryList.length === 0, [
    positiveImpactAreaList.length,
    productCategoryList.length,
  ])

  return (
    <Form isFormPristine onSubmit={onFormSubmit}>
      <StyledTypography variant="body2">
        {'Please answer the following questions to help us understand what you are about.'}
      </StyledTypography>
      <StyledTypography variant="h6">{'What kind of products would you like to promote?'}</StyledTypography>
      <StyledFormHelperText>{'Please select tags that describe those products best.'}</StyledFormHelperText>
      <TagsSelector setTags={setProductCategoryTags} tags={productCategoryTags} />
      <StyledTypography variant="h6">{'In which area do you create positive impact?'}</StyledTypography>
      <StyledFormHelperText>{'Please select tags that describe your values best.'}</StyledFormHelperText>
      <TagsSelector setTags={setPositiveImpactAreaTags} tags={positiveImpactAreaTags} />
      <FormFooter>
        <Button
          color="primaryGradient"
          disabled={isFormSubmitting || areTagsEmpty}
          isFormSubmitting={isFormSubmitting}
          type="submit"
          variant="contained"
        >
          {'Done'}
        </Button>
      </FormFooter>
    </Form>
  )
}

export default SecondStep
