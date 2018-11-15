import { MAIN_BREAKPOINT } from 'config'

export const isSmall = () => window.innerWidth < MAIN_BREAKPOINT
export const isLarge = () => !isSmall()
