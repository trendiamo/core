import ModalUrlGenerator from './modal-url-generator'
import React, { useEffect, useState } from 'react'
import Section from 'shared/section'
import UrlGeneratorForm from './form'
import UrlList from './url-list'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiGeneratedUrlList, apiRequest } from 'utils'
import { Grid } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const appBarContent = { title: 'URL Generator' }

const UrlGenerator = () => {
  const { enqueueSnackbar } = useSnackbar()

  useAppBarContent(appBarContent)

  const [generatedUrl, setGeneratedUrl] = useState('')
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [urlHistory, setUrlHistory] = useState([])

  useEffect(() => {
    ;(async () => {
      const { json, requestError } = await apiRequest(apiGeneratedUrlList, [])
      requestError ? enqueueSnackbar(requestError, { variant: 'error' }) : setUrlHistory(json)
    })()
  }, [enqueueSnackbar])

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

export default UrlGenerator
