import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { buttonTheme } from './components/Button';
import { modalTheme } from './components/Modal';

const theme = extendTheme({
    components: {
        Button: buttonTheme,
        Modal: modalTheme
    },
    styles: {
        global: (props) => ({
            body: {
                bg: mode('gray.100', 'gray.700')(props),
                color: mode('gray.700', 'gray.100')(props),
                fontFamily: `'Montserrat', sans-serif`
            },
        }),
    },
    colors: {
        red: {
            50: '#ffe5e7',
            100: '#fbb9bb',
            200: '#f38c8c',
            300: '#ed5f68',
            400: '#e73148',
            500: '#ce1839',
            600: '#a01236',
            700: '#730c2e',
            800: '#460520',
            900: '#1d000e'
        }
    },
    initialColorMode: 'light',
    useSystemColorMode: false,
})

export default theme;