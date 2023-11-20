import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { buttonTheme } from './components/Button';
import { modalTheme } from './components/Modal';
import { inputTheme } from './components/Input';
import { textareaTheme } from './components/Textarea';

const theme = extendTheme({
    components: {
        Button: buttonTheme,
        Modal: modalTheme,
        Input: inputTheme,
        Textarea: textareaTheme
    },
    styles: {
        global: (props) => ({
            body: {
                bg: mode('gray.100', 'gray.700')(props),
                color: mode('gray.700', 'gray.100')(props),
                fontFamily: `'Montserrat', sans-serif`,
                fontSize: 'md'
            },
        }),
    },
    colors: {
        cyan: {
            50: '#e1fdff',
            100: '#baeff8',
            200: '#90eaf2',
            300: '#68eaed',
            400: '#47e7e1',
            500: '#35cdbe',
            600: '#27a08c',
            650: '#208a73',
            700: '#19725e',
            800: '#074531',
            900: '#001910'
        },
        teal: {
            550: '#30888a'
        },
        gray: {
            350: '#b4bfcf'
        }
    },
    fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "20px",
        xl: "24px",
      },
    initialColorMode: 'light',
    useSystemColorMode: false,
})

export default theme;