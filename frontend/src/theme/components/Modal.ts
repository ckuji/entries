import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
    header: {
        mt: '5px',
        textAlign: 'center'
    },
    dialog: {
        borderRadius: '10px',
        minW: '500px'
    },
    footer: {
        justifyContent: 'flex-start'
    },
    closeButton: {
        top: '-40px',
        right: '0'
    }
})

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
})