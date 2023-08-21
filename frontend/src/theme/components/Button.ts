import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const baseStyle = defineStyle({
    borderRadius: '8px',
    p: '5px 10px'
});

const sizes = {
  md: defineStyle({
    fontSize: '14px',
    fontWeight: '500',
    minW: '200px'
  }),
};

const fillVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.500`,
    color: 'white',
    _dark: {
      bg: `${c}.200`,
      color: 'gray.800',
    },
    _hover: {
      bg: `${c}.600`,
      _dark: {
        bg: `${c}.300`,
      },
    },
    _active: {
      bg: `${c}.700`,
      _dark: {
        bg: `${c}.400`,
      }
    },
  };
});

const outlineVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    color: `${c}.700`,
    _dark: {
      color: 'gray.100',
    },
    _hover: {
      color: `${c}.600`,
      _dark: {
        color: 'gray.200',
      },
    },
    _active: {
      bg: `${c}.200`,
      _dark: {
        bg: `${c}.500`,
      }
    },
  };
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    fill: fillVariant,
    outline: outlineVariant
  },
  defaultProps: {
    size: 'md',
    colorScheme: "blue"
  },
})