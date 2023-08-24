import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const main = definePartsStyle({
  field: {
    border: '1px solid',
    borderColor: 'gray.300',
    _dark: {
      borderColor: 'gray.600',
      bg: 'none',
    },
    fontSize: 'sm'
  }
})

export const inputTheme = defineMultiStyleConfig({ 
  variants: { main },
  defaultProps: {
    variant: 'main'
  }
})