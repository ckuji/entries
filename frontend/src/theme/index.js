import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }

const theme = extendTheme({
    styles: {
        global: (props) => ({
            body: {
                bg: mode('gray.100', 'gray.700')(props),
                color: mode('gray.700', 'gray.100')(props),
                fontFamily: `'Montserrat', sans-serif`
            },
        }),
    },
    config
})

export default theme;