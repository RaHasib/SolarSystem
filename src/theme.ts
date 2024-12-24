import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'purple.900',
        color: 'white',
        margin: 0,
        overflow: 'hidden',
      },
    },
  },
}) 