import React, {createContext, memo, useContext} from 'react';
import {useColorMode,useColorModeValue} from '@chakra-ui/react';
import {themeProviderType, themSwitcherProps} from './ThemeSwitcherTypes'



const ThemeProvider = createContext <themeProviderType|null>(null);

const ThemeSwitcher = memo(( {children}: themSwitcherProps) => {

    const { colorMode, toggleColorMode } = useColorMode();

    const bodybg = useColorModeValue('#F3F3F3', '#282525');
    const cardBg = useColorModeValue('#FFFFFF', '#181818');
    const cardText = useColorModeValue('#000000','#FFFFFF')
    const cardLightText =  useColorModeValue('#807D7D','#807D7D')

   const colorProp = {
       bodybg,
       cardBg,
       cardText,
       cardLightText
   }

  return (
      <ThemeProvider.Provider value={{colorProp}}>
           {children}
      </ThemeProvider.Provider>
  )
}
)

const useDarkModeTheme = ()=> useContext(ThemeProvider) as themeProviderType;

export {ThemeSwitcher, useDarkModeTheme}