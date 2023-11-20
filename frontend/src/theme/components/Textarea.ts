import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const baseStyle = defineStyle({
    fontSize: 'sm',
    bg: 'none',
})

const main = defineStyle({
    border: '1px solid',
    borderColor: 'gray.300',
    _dark: {
        borderColor: 'gray.600',
    },
  })

export const textareaTheme = defineStyleConfig({
    baseStyle,
    variants: {main},
    defaultProps: {
        variant: 'main'
    }
})