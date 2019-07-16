import BlankStateTemplate from 'shared/blank-state'
import React, { useMemo } from 'react'
import { ActiveColumn, EnhancedList, Picture, TableCell, Text } from 'shared/table-elements'
import { apiPictureDestroy, apiPictureList } from 'utils'

const columns = [
  { name: 'id', label: 'id', sortable: true },
  { name: 'picture' },
  { name: 'type', label: 'type', sortable: true },
  { name: 'url', label: 'url', sortable: true },
  { name: 'status', label: 'status', sortable: true },
]

const BlankState = () => <BlankStateTemplate imageSource="/img/background/img-welcome.png" title="No pictures yet" />

const tooltipTextActive = ({ personas, productPicks, simpleChatMessages }) => {
  const itemsInUse = []
  if (personas.length > 0) itemsInUse.push(`${personas.length} persona${personas.length > 1 ? 's' : ''}`)
  if (productPicks.length > 0)
    itemsInUse.push(`${productPicks.length} product pick${productPicks.length > 1 ? 's' : ''}`)
  if (simpleChatMessages.length > 0)
    itemsInUse.push(`${simpleChatMessages.length} simple chat message${simpleChatMessages.length > 1 ? 's' : ''}`)
  return `Used for ${[itemsInUse.slice(0, -1).join(', '), itemsInUse.slice(-1)[0]].join(
    itemsInUse.length < 2 ? '' : ' and '
  )}`
}

const PicturesRow = ({ record, highlightInactive }) => {
  const recordType = useMemo(
    () =>
      record.url
        .split('.')
        .pop()
        .toUpperCase(),
    [record.url]
  )

  return (
    <>
      <TableCell width="5%">
        <Picture disabled={highlightInactive} src={record.url} />
      </TableCell>
      <TableCell width="10%">
        <Text disabled={highlightInactive}>{recordType}</Text>
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
}

const api = { fetch: apiPictureList, destroy: apiPictureDestroy }
const picturesRoutes = {}
const canEditResource = ({ personas, productPicks, simpleChatMessages }) =>
  (personas + productPicks + simpleChatMessages).length < 1
const defaultSorting = { column: 'status', direction: 'asc' }
const highlightInactive = ['personas', 'productPicks', 'simpleChatMessages']

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
    title="Pictures Gallery"
  />
)

export default PicturesList
