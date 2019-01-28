import BlankStateTemplate from 'shared/blank-state'
import Divider from '@material-ui/core/Divider'
import HistoryIcon from '@material-ui/icons/History'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MUIList from '@material-ui/core/List'
import MUIListItem from '@material-ui/core/ListItem'
import React from 'react'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import { branch, compose, renderComponent, withHandlers } from 'recompose'
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
    <BlankStateTemplate description="No URLs were generated yet." imageSource="/img/background/img-box-inactive.png" />
  </>
)

const UrlListItems = ({ urlHistory, copyToClipboard }) => (
  <>
    {urlHistory &&
      urlHistory.map(generatedUrl => (
        <Tooltip key={generatedUrl.id} placement="top-end" title="Copy to Clipboard">
          <ListItem button onClick={copyToClipboard}>
            <ListItemText primary={generatedUrl.url} />
          </ListItem>
        </Tooltip>
      ))}
  </>
)

const UrlList = ({ urlHistory, copyToClipboard }) => (
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

export default compose(
  withHandlers({
    copyToClipboard: () => event => {
      navigator.clipboard.writeText(event.target.textContent)
    },
  }),
  branch(({ urlHistory }) => !(urlHistory && urlHistory.length), renderComponent(BlankState))
)(UrlList)
