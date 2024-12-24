import { Box, VStack, Text, HStack, Badge } from '@chakra-ui/react'
import { usePlanetStore, Planet, Sun, Moon } from '../../../../../store/planetStore'

function SizeComparison () {
  const { selectedPlanet } = usePlanetStore()

  if (!selectedPlanet) return null

  const celestialBody = selectedPlanet as Planet | Sun | Moon

  return (
    <Box p={4} bg="whiteAlpha.100" borderRadius="xl">
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Text fontSize="sm" color="whiteAlpha.700">
            Size compared to Earth
          </Text>
          <Badge 
            colorScheme={celestialBody.size > 28 ? "orange" : "blue"}
            variant="subtle"
          >
            {celestialBody.size > 28 
              ? `${(celestialBody.size / 28).toFixed(1)}x larger` 
              : `${(28 / celestialBody.size).toFixed(1)}x smaller`
            }
          </Badge>
        </HStack>
        
        <Box position="relative" h="80px">
          {/* Earth Reference */}
          <VStack 
            position="absolute" 
            bottom="0" 
            left="0"
            spacing={1}
            alignItems="flex-start"
          >
            <Text fontSize="xs" color="whiteAlpha.600">
              Earth (12,742 km)
            </Text>
            <Box
              w="28px"
              h="28px"
              borderRadius="full"
              bg="blue.400"
              border="2px solid"
              borderColor="whiteAlpha.400"
            />
          </VStack>

          {/* Selected Planet */}
          <VStack 
            position="absolute" 
            bottom="0" 
            left="120px"
            spacing={1}
            alignItems="flex-start"
          >
            <Text fontSize="xs">
              {celestialBody.name} ({('stats' in celestialBody && celestialBody.stats?.diameter) || 'N/A'})
            </Text>
            <Box
              w={`${celestialBody.size}px`}
              h={`${celestialBody.size}px`}
              borderRadius="full"
              bgGradient={celestialBody.gradient}
              boxShadow="lg"
            />
          </VStack>
        </Box>

        {/* Additional Context */}
        <Text fontSize="xs" color="whiteAlpha.600" fontStyle="italic">
          {(() => {
            if ('stats' in celestialBody && celestialBody.stats?.diameter) {
              const diameter = parseInt(celestialBody.stats.diameter.replace(/,/g, '').split(' ')[0]);
              const earthDiameter = 12742;
              
              if (celestialBody.size > 28) {
                const ratio = Math.floor(Math.pow(diameter / earthDiameter, 3));
                return `You could fit about ${ratio} Earths inside ${celestialBody.name}!`;
              } else if (celestialBody.size < 28) {
                const ratio = Math.floor(Math.pow(earthDiameter / diameter, 3));
                return `${celestialBody.name} would fit inside Earth about ${ratio} times!`;
              }
            }
            return `${celestialBody.name} is about the same size as Earth!`;
          })()}
        </Text>
      </VStack>
    </Box>
  )
} 

export default SizeComparison;
