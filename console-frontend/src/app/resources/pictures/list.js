import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import { ActiveColumn, EnhancedList, Picture, TableCell, Text } from 'shared/table-elements'
import { apiPictureDestroy, apiPictureList } from 'utils'

const columns = [
  { name: 'id', label: 'id', sortable: true },
  { name: 'picture' },
  { name: 'url', label: 'url', sortable: true },
  { name: 'status', label: 'status', sortable: true },
]

const BlankState = () => (
  <BlankStateTemplate
    // buttonText="Upload new"
    // description="You don't have any picture yet. Let's add some?"
    imageSource="/img/background/img-welcome.png"
    // route={routes.pictureCreate()}
    // title="Add new pictures"
    title="No pictures yet"
  />
)

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

const PicturesRow = ({ record, highlightInactive }) => (
  <>
    <TableCell>
      <Picture disabled={highlightInactive} src={record.url} />
    </TableCell>
    <TableCell width="100%">
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
