import { createContext } from 'react'

export const defaultTheme = {
  themeColor: '#232323',
  textColor: 'white',
  roundEdges: true,
}

const ThemeContext = createContext(defaultTheme)

export default ThemeContext
