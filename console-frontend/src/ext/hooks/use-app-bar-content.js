import { StoreContext } from 'ext/hooks/store'
import { useContext, useEffect } from 'react'

const setPageTitle = ({ title }) => {
  if (!title) return
  document.title = `${title} - Frekkls Admin`
}

const useAppBarContent = appBarContent => {
  const { store, setStore } = useContext(StoreContext)
  useEffect(
    () => {
      setPageTitle(appBarContent)
      setStore({ ...store, appBarContent })
    },
    [appBarContent]
  )
}

export default useAppBarContent
