import { compose, withHandlers, withProps } from 'recompose'

const enhanceList = (apiResourceList, apiResourceDestroy, mapProps) => ResourceList =>
  compose(
    withProps(props => mapProps(props)),
    withHandlers({
      setQuery: ({ setInfo, rowsPerPage, order, orderBy }) => async page => {
        const query = {
          range: JSON.stringify([page * rowsPerPage, (page + 1) * rowsPerPage - 1]),
          sort: JSON.stringify([orderBy, order]),
        }
        return await apiResourceList(setInfo, query)
      },
    }),
    withHandlers({
      deleteResources: ({
        selectedIds,
        setInfo,
        setResources,
        setQuery,
        page,
        setResourcesCount,
        setSelectedIds,
      }) => async () => {
        await apiResourceDestroy({ ids: selectedIds }, setInfo)
        const resourceResponse = await setQuery(page)
        setResources(resourceResponse.json)
        setResourcesCount(resourceResponse.count)
        setSelectedIds([])
      },
      handleSelectAll: ({ setSelectedIds, resources, setIsSelectAll }) => event => {
        setSelectedIds(event.target.checked ? resources.map(resource => resource.id) : [])
        setIsSelectAll(event.target.checked)
      },
      handleRequestSort: ({
        setOrderBy,
        setOrder,
        order,
        orderBy,
        setQuery,
        page,
        setResources,
        setResourcesCount,
      }) => async columnName => {
        if (columnName === 'avatar') return
        setOrderBy(columnName)
        setOrder(orderBy === columnName && order === 'desc' ? 'asc' : 'desc')
        const resourceResponse = await setQuery(page)
        setResources(resourceResponse.json)
        setResourcesCount(resourceResponse.count)
      },
      handleChangeRowsPerPage: ({ setResources, setRowsPerPage, setInfo, order, orderBy }) => async event => {
        const query = { range: JSON.stringify([0, event.target.value - 1]), sort: JSON.stringify([orderBy, order]) }
        const resourceResponse = await apiResourceList(setInfo, query)
        setRowsPerPage(event.target.value)
        setResources(resourceResponse.json)
      },
      handleChangePage: ({ setPage, setQuery, setResources }) => async (event, page) => {
        const resourceResponse = await setQuery(page)
        setResources(resourceResponse.json)
        setPage(page)
      },
    })
  )(ResourceList)

export default enhanceList
