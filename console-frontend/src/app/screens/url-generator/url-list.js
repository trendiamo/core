import Divider from '@material-ui/core/Divider'
import HistoryIcon from '@material-ui/icons/History'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MUIList from '@material-ui/core/List'
import MUIListItem from '@material-ui/core/ListItem'
import React from 'react'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import { compose, withHandlers } from 'recompose'
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

const UrlListItems = ({ urlHistory, copyToClipboard }) => (
  <React.Fragment>
    {urlHistory &&
      urlHistory.map(generatedUrl => (
        <Tooltip key={generatedUrl.id} placement="top-end" title="Copy to Clipboard">
          <ListItem button onClick={copyToClipboard}>
            <ListItemText primary={generatedUrl.url} />
          </ListItem>
        </Tooltip>
      ))}
  </React.Fragment>
)

const UrlList = ({ urlHistory, copyToClipboard }) => (
  <React.Fragment>
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
  </React.Fragment>
)

export default compose(
  withHandlers({
    copyToClipboard: () => event => {
      navigator.clipboard.writeText(event.target.textContent)
    },
  })
)(UrlList)
