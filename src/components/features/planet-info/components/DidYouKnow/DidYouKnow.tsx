import { Box, VStack, Text, HStack } from '@chakra-ui/react'
import { usePlanetStore } from '../../../../../store/planetStore'
import { Planet, Sun, Moon } from '../../../../../store/planetStore'

function DidYouKnow () {
  const { selectedPlanet } = usePlanetStore()

  if (!selectedPlanet) return null

  const celestialBody = selectedPlanet as Planet | Sun | Moon

  return (
    <VStack align="stretch" spacing={4}>
      <HStack spacing={2} px={4}>
        <Text fontSize="xl" fontWeight="bold">
          💡
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          Did You Know?
        </Text>
      </HStack>
      <Box
        p={4}
        bg="whiteAlpha.100"
        borderRadius="xl"
        position="relative"
        overflow="hidden"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100%',
          background: celestialBody.gradient,
          opacity: 0.1,
          transform: 'skew(-15deg)',
        }}
      >
        <Text>
          {'funFact' in celestialBody ? 
            celestialBody.funFact || "This celestial body holds many mysteries yet to be discovered!" :
            "This celestial body holds many mysteries yet to be discovered!"}
        </Text>
      </Box>
    </VStack>
  )
} 

export default DidYouKnow;
