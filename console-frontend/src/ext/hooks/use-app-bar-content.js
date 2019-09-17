import { showUpToUsBranding } from 'utils'
import { StoreContext } from 'ext/hooks/store'
import { useContext, useEffect } from 'react'

const setPageTitle = title => {
  if (!title) return
  const defaultTitle = showUpToUsBranding ? 'UPTOUS' : 'Frekkls Admin'
  document.title = `${title} - ${defaultTitle}`
}

const useAppBarContent = appBarContent => {
  const { setStore } = useContext(StoreContext)

  useEffect(
    () => {
      setPageTitle(appBarContent.title)
    },
    [appBarContent.title]
  )

  useEffect(
    () => {
      setStore({ appBarContent })
    },
    [appBarContent, setStore]
  )
}

export default useAppBarContent
