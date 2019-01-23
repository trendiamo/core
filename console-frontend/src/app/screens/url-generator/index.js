import ModalUrlGenerator from './modal-url-generator'
import React from 'react'
import Section from 'shared/section'
import UrlGeneratorForm from './form'
import UrlList from './url-list'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { apiGeneratedUrlList, apiRequest } from 'utils'
import { compose, lifecycle, withState } from 'recompose'
import { Grid } from '@material-ui/core'
import { withSnackbar } from 'notistack'

const UrlGenerator = ({
  setGeneratedUrl,
  isModalOpened,
  setIsModalOpened,
  generatedUrl,
  urlHistory,
  setUrlHistory,
}) => (
  <React.Fragment>
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
  </React.Fragment>
)

export default compose(
  withSnackbar,
  withState('generatedUrl', 'setGeneratedUrl', ''),
  withState('isModalOpened', 'setIsModalOpened', false),
  withState('urlHistory', 'setUrlHistory', []),
  withAppBarContent({ breadcrumbs: [{ text: 'Url Generator' }] }),
  lifecycle({
    async componentDidMount() {
      const { setUrlHistory, enqueueSnackbar } = this.props
      const { json, requestError } = await apiRequest(apiGeneratedUrlList, [])
      requestError ? enqueueSnackbar(requestError, { variant: 'error' }) : setUrlHistory(json)
    },
  })
)(UrlGenerator)
