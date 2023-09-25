import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const baseStyle = defineStyle({
    borderRadius: '8px',
    p: '5px 10px',
    _disabled: {
      opacity: 0.5,
      cursor: 'inherit'
    }
});

const sizes = {
  md: defineStyle({
    fontSize: 'sm',
    fontWeight: '500',
  }),
};

const fillVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.600`,
    color: '#fff',
    _dark: {
      bg: `${c}.500`,
      color: 'gray.900',
    },
    _hover: {
      bg: `${c}.650`,
      _dark: {
        bg: `${c}.550`,
      },
      _disabled: {
        bg: `${c}.600`,
        _dark: {
          bg: `${c}.500`,
        },
      }
    },
    _active: {
      bg: `${c}.700`,
      _dark: {
        bg: `${c}.600`,
      }
    },
  };
});

const outlineVariant = defineStyle((props) => {
  const { colorScheme: c } = props;
  return {
    color: `${c}.600`,
    _dark: {
      color: 'gray.100',
      borderColor: 'gray.100'
    },
    _hover: {
      color: `${c}.650`,
      bg: 'none',
      _dark: {
        color: 'gray.300',
        borderColor: 'gray.300'
      },
      _disabled: {
        color: `${c}.600`,
        _dark: {
          color: 'gray.100',
          borderColor: 'gray.100'
        },
      }
    },
    _active: {
      color: `${c}.700`,
      bg: 'none',
      _dark: {
        color: 'gray.350',
        borderColor: 'gray.350'
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