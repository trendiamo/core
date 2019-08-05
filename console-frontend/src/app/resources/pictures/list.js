import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import { ActiveColumn, EnhancedList, Picture, TableCell, Text } from 'shared/table-elements'
import { apiPictureDestroy, apiPictureList } from 'utils'

const columns = [
  { name: 'id', label: 'id', sortable: true },
  { name: 'picture' },
  { name: 'file_format', label: 'type', sortable: true },
  { name: 'url', label: 'url', sortable: true },
  { name: 'active', label: 'status', sortable: true },
]

const BlankState = () => <BlankStateTemplate imageSource="/img/background/img-welcome.png" title="No pictures yet" />

const tooltipTextActive = ({ sellers, productPicks, simpleChatMessages }) => {
  const itemsInUse = []
  if (sellers.length > 0) itemsInUse.push(`${sellers.length} seller${sellers.length > 1 ? 's' : ''}`)
  if (productPicks.length > 0)
    itemsInUse.push(`${productPicks.length} product pick${productPicks.length > 1 ? 's' : ''}`)
  if (simpleChatMessages.length > 0)
    itemsInUse.push(`${simpleChatMessages.length} simple chat message${simpleChatMessages.length > 1 ? 's' : ''}`)
  return `Used for ${[itemsInUse.slice(0, -1).join(', '), itemsInUse.slice(-1)[0]].join(
    itemsInUse.length < 2 ? '' : ' and '
  )}`
}

const PicturesRow = ({ record, highlightInactive }) => (
  <>
    <TableCell width="5%">
      <Picture disabled={highlightInactive} src={record.url} />
    </TableCell>
    <TableCell width="10%">
      <Text disabled={highlightInactive}>{record.fileFormat.toUpperCase()}</Text>
    </TableCell>
    <TableCell width="85%">
      <Text disabled={highlightInactive} style={{ wordBreak: 'break-all' }}>
        {record.url}
      </Text>
    </TableCell>
    <ActiveColumn
      highlightInactive={highlightInactive}
      symbolTextActive="In use"
      symbolTextInactive="Not in use"
      tooltipTextActive={tooltipTextActive(record)}
      tooltipTextInactive="Not used yet"
    />
  </>
)

const api = { fetch: apiPictureList, destroy: apiPictureDestroy }
const picturesRoutes = {}
const canEditResource = ({ sellers, productPicks, simpleChatMessages }) =>
  (sellers + productPicks + simpleChatMessages).length < 1
const defaultSorting = { column: 'active', direction: 'asc' }
const highlightInactive = ['sellers', 'productPicks', 'simpleChatMessages']

const PicturesList = () => (
  <EnhancedList
    api={api}
    BlankState={BlankState}
    canEditResource={canEditResource}
    columns={columns}
    defaultSorting={defaultSorting}
    helpStep="pictures"
    highlightInactive={highlightInactive}
    ResourceRow={PicturesRow}
    routes={picturesRoutes}
    title="Image Gallery"
  />
)

export default PicturesList
