import { StoreContext } from 'ext/hooks/store'
import { useContext, useEffect } from 'react'

const setPageTitle = ({ title }) => {
  if (!title) return
  document.title = `${title} - Frekkls Admin`
}

const useAppBarContent = appBarContent => {
  const { setStore } = useContext(StoreContext)
  useEffect(
    () => {
      setPageTitle(appBarContent)
      setStore({ appBarContent })
    },
    [appBarContent, setStore]
  )
}

export default useAppBarContent
