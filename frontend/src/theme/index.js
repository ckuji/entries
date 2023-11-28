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
            550: '#30888a',
            650: '#2b6a6e'
        },
        gray: {
            350: '#b4bfcf'
        },
        orange: {
            650: '#ad4823'
        },
        greenBand: {
            50: '#e0ffe0',
            100: '#b1ffb1',
            200: '#80ff80',
            300: '#4fff4e',
            400: '#25ff20',
            500: '#14e60c',
            550: '#0bcc08',
            600: '#08b304',
            700: '#008000',
            800: '#004d00',
            900: '#001b00'
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
    breakpoints: {
        base: "0px",
        xs: "320px",
        sm: "480px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
      }
})

export default theme;