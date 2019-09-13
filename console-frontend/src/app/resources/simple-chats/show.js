import CircularProgress from 'shared/circular-progress'
import PluginPreview from './form/plugin-preview'
import React, { useCallback, useMemo, useState } from 'react'
import routes from 'app/routes'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions } from 'shared/form-elements'
import { apiRequest, apiSimpleChatReject, apiSimpleChatShow } from 'utils'
import { canRejectResource } from './list'
import { formObjectTransformer } from './form/data-utils'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const ShowSimpleChatPreview = ({ history, match }) => {
  const [showingContent, setShowingContent] = useState(true)

  const { enqueueSnackbar } = useSnackbar()

  const loadFormObject = useCallback(
    () => {
      return (async () => {
        const id = match.params.simpleChatId
        const { json, requestError } = await apiRequest(apiSimpleChatShow, [id])
        if (requestError) {
          enqueueSnackbar(requestError, { variant: 'error' })
          history.push(routes.simpleChatsList())
        }
        return json
      })()
    },
    [enqueueSnackbar, history, match.params.simpleChatId]
  )

  const { form, isFormLoading } = useForm({ formObjectTransformer, loadFormObject })

  const onToggleContent = useCallback(
    value => {
      setShowingContent(value !== undefined ? value : !showingContent)
    },
    [showingContent]
  )

  const onRejectClick = useCallback(
    async () => {
      const id = match.params.simpleChatId
      const { json, errors, requestError } = await apiRequest(apiSimpleChatReject, [id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        history.push(routes.simpleChatsList())
        enqueueSnackbar('Simple Chat successfully rejected', { variant: 'success' })
      }
      return json
    },
    [enqueueSnackbar, history, match.params.simpleChatId]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: canRejectResource(form) && (
        <Actions disabled={isFormLoading} onRejectClick={onRejectClick} rejectEnabled />
      ),
      backRoute: routes.simpleChatsList(),
      title: 'Simple Chat Preview',
    }),
    [form, isFormLoading, onRejectClick]
  )
  useAppBarContent(appBarContent)

  if (isFormLoading) return <CircularProgress />

  return <PluginPreview form={form} onToggleContent={onToggleContent} showingContent={showingContent} />
}

export default withRouter(ShowSimpleChatPreview)
