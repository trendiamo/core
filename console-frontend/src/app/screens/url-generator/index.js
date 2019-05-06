import ModalUrlGenerator from './modal-url-generator'
import React from 'react'
import Section from 'shared/section'
import UrlGeneratorForm from './form'
import UrlList from './url-list'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiGeneratedUrlList, apiRequest } from 'utils'
import { compose, lifecycle, withState } from 'recompose'
import { Grid } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const appBarContent = { title: 'Url Generator' }

const UrlGenerator = ({
  setGeneratedUrl,
  isModalOpened,
  setIsModalOpened,
  generatedUrl,
  urlHistory,
  setUrlHistory,
}) => {
  useAppBarContent(appBarContent)
  return (
    <>
      <ModalUrlGenerator open={isModalOpened} setOpen={setIsModalOpened} url={generatedUrl} />
      <Section>
        <Grid alignItems="center" container justify="center">
          <Grid item sm={5}>
            <UrlGeneratorForm
              setGeneratedUrl={setGeneratedUrl}
              setIsModalOpened={setIsModalOpened}
              setUrlHistory={setUrlHistory}
              urlHistory={urlHistory}
            />
          </Grid>
        </Grid>
      </Section>
      <Section>
        <UrlList urlHistory={urlHistory} />
      </Section>
    </>
  )
}

const UrlGenerator1 = compose(
  withState('generatedUrl', 'setGeneratedUrl', ''),
  withState('isModalOpened', 'setIsModalOpened', false),
  withState('urlHistory', 'setUrlHistory', []),
  lifecycle({
    async componentDidMount() {
      const { setUrlHistory, enqueueSnackbar } = this.props
      const { json, requestError } = await apiRequest(apiGeneratedUrlList, [])
      requestError ? enqueueSnackbar(requestError, { variant: 'error' }) : setUrlHistory(json)
    },
  })
)(UrlGenerator)

const UrlGenerator2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <UrlGenerator1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default UrlGenerator2
