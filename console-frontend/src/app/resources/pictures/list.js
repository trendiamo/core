import BlankStateTemplate from 'shared/blank-state'
import React from 'react'
import routes from 'app/routes'
import { ActiveColumn, EnhancedList, Picture, TableCell, Text } from 'shared/table-elements'
import { apiPictureDestroy, apiPictureList } from 'utils'

const columns = [
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

const tooltipTextActive = (navigationItems, personas, productPicks) => {
  const itemsInUse = []
  if (navigationItems.length > 0)
    itemsInUse.push(`${navigationItems.length} navigation item${navigationItems.length > 1 ? 's' : ''}`)
  if (personas.length > 0) itemsInUse.push(`${personas.length} persona${personas.length > 1 ? 's' : ''}`)
  if (productPicks.length > 0)
    itemsInUse.push(`${productPicks.length} product pick${productPicks.length > 1 ? 's' : ''}`)
  return `Used for ${[itemsInUse.slice(0, -1).join(', '), itemsInUse.slice(-1)[0]].join(
    itemsInUse.length < 2 ? '' : ' and '
  )}`
}

const PicturesRow = ({ record: { url, navigationItems, personas, productPicks }, highlightInactive }) => (
  <>
    <TableCell>
      <Picture disabled={highlightInactive} src={url} />
    </TableCell>
    <TableCell width="100%">
      <Text disabled={highlightInactive} style={{ wordBreak: 'break-all' }}>
        {url}
      </Text>
    </TableCell>
    <ActiveColumn
      highlightInactive={highlightInactive}
      symbolTextActive="In use"
      symbolTextInactive="Not in use"
      tooltipTextActive={tooltipTextActive(navigationItems, personas, productPicks)}
      tooltipTextInactive="Not used yet"
    />
  </>
)

const PicturesList = () => (
  <EnhancedList
    api={{ fetch: apiPictureList, destroy: apiPictureDestroy }}
    BlankState={BlankState}
    buttonText="Upload new"
    columns={columns}
    defaultSorting={{ column: 'status', direction: 'asc' }}
    helpStep="pictures"
    highlightInactive={['navigationItems', 'personas', 'productPicks']}
    ResourceRow={PicturesRow}
    routes={{ create: routes.pictureCreate, edit: routes.pictureEdit }}
    title="Pictures Gallery"
  />
)

export default PicturesList
