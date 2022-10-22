import { createContext } from "react";
import { useColorMode } from '@chakra-ui/react'

export const ColorModeContext = createContext(undefined)
export function ColorModeContextProvider({children}) {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <ColorModeContext.Provider value={{colorMode, toggleColorMode}}>
            {children}
        </ColorModeContext.Provider>
    )
}