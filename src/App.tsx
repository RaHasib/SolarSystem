import { ChakraProvider } from '@chakra-ui/react'

import { theme } from './theme'
import SolarSystem from './components/features/solar-system/SolarSystem'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <SolarSystem />
    </ChakraProvider>
  )
}

export default App
