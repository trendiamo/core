import BlankStateTemplate from 'shared/blank-state'
import Divider from '@material-ui/core/Divider'
import HistoryIcon from '@material-ui/icons/History'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MUIList from '@material-ui/core/List'
import MUIListItem from '@material-ui/core/ListItem'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import { Header } from 'shared/form-elements'

const List = styled(MUIList)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`

const ListItem = styled(MUIListItem)`
  &:hover {
    cursor: copy;
  }
`

const BlankState = () => (
  <>
    <BlankStateTemplate
      buttonText="Create new"
      description="No URLs were generated yet."
      imageSource="/img/background/img-box-inactive.png"
    />
  </>
)

const UrlListItems = ({ urlHistory, copyToClipboard }) => (
  <>
    {urlHistory.map(generatedUrl => (
      <Tooltip key={generatedUrl.id} placement="top-end" title="Copy to Clipboard">
        <ListItem button onClick={copyToClipboard}>
          <ListItemText primary={generatedUrl.url} />
        </ListItem>
      </Tooltip>
    ))}
  </>
)

const UrlList = ({ urlHistory }) => {
  const copyToClipboard = useCallback(event => {
    navigator.clipboard.writeText(event.target.textContent)
  }, [])

  if (urlHistory.length === 0) return <BlankState />

  return (
    <>
      <List component="nav">
        <Header variant="h6">{'Url History'}</Header>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
      </List>
      <Divider />
      <MUIList component="nav">
        <UrlListItems copyToClipboard={copyToClipboard} urlHistory={urlHistory} />
      </MUIList>
    </>
  )
}

export default UrlList
