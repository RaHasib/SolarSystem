import { Box, VStack, Text, HStack } from '@chakra-ui/react'
import { usePlanetStore } from '../../../../../store/planetStore'
import { Planet, Sun, Moon } from '../../../../../store/planetStore'

function ExplorationStatus () {
  const { selectedPlanet } = usePlanetStore()

  if (!selectedPlanet) return null

  const celestialBody = selectedPlanet as Planet | Sun | Moon
  const gradientColor = celestialBody.gradient.split(',')[0].split('(')[1]

  return (
    <VStack align="stretch" spacing={4}>
      <HStack spacing={2} px={4}>
        <Text fontSize="xl" fontWeight="bold">
          🚀
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          Exploration Status
        </Text>
      </HStack>
      <Box
        p={4}
        bg="whiteAlpha.100"
        borderRadius="xl"
        borderLeft="4px solid"
        borderLeftColor={gradientColor}
      >
        <Text>
          {'explorationStatus' in celestialBody ? 
            celestialBody.explorationStatus || 
            `Current missions are exploring ${celestialBody.name}'s mysteries.` :
            `Current missions are exploring ${celestialBody.name}'s mysteries.`}
        </Text>
      </Box>
    </VStack>
  )
} 

export default ExplorationStatus;
