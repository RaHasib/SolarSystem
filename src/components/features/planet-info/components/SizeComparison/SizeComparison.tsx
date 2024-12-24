import { Box, VStack, Text, HStack, Badge } from '@chakra-ui/react'
import { usePlanetStore, Planet, Sun, Moon } from '../../../../../store/planetStore'

function SizeComparison () {
  const { selectedPlanet } = usePlanetStore()

  if (!selectedPlanet) return null

  const celestialBody = selectedPlanet as Planet | Sun | Moon
  const isSun = celestialBody.id === 'sun'

  return (
    <Box p={4} bg="whiteAlpha.100" borderRadius="xl">
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between" mb={isSun ? 2 : 0}>
          <Text fontSize="sm" color="whiteAlpha.700">
            Size compared to Earth
          </Text>
          <Badge 
            colorScheme={isSun ? "yellow" : celestialBody.size > 28 ? "orange" : "blue"}
            variant="subtle"
            ml={isSun ? 4 : 0}
          >
            {isSun 
              ? `${('volumeComparedToEarth' in celestialBody ? (celestialBody.volumeComparedToEarth / 1000000).toFixed(2) : 0)}M× larger`
              : celestialBody.size > 28 
                ? `${(celestialBody.size / 28).toFixed(1)}x larger` 
                : `${(28 / celestialBody.size).toFixed(1)}x smaller`
            }
          </Badge>
        </HStack>
        
        <Box position="relative" h={isSun ? "120px" : "80px"}>
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

          {/* Selected Planet/Sun */}
          <VStack 
            position="absolute" 
            bottom={isSun ? "20px" : "0"}
            left={isSun ? "180px" : "120px"}
            spacing={1}
            alignItems="flex-start"
          >
            <Text 
              fontSize="xs"
              textShadow={isSun ? "0 0 10px rgba(255,165,0,0.5)" : undefined}
              color={isSun ? "yellow.100" : "white"}
            >
              {celestialBody.name}
              <Text as="span" ml={2}>
                ({('stats' in celestialBody && celestialBody.stats?.diameter) || 'N/A'})
              </Text>
            </Text>
            <Box
              w={isSun ? "100px" : `${celestialBody.size}px`}
              h={isSun ? "100px" : `${celestialBody.size}px`}
              borderRadius="full"
              bgGradient={celestialBody.gradient}
              boxShadow={isSun ? "0 0 40px rgba(255,165,0,0.6)" : "lg"}
              position="relative"
              _after={isSun ? {
                content: '""',
                position: 'absolute',
                inset: '-10px',
                borderRadius: 'full',
                background: 'radial-gradient(circle, rgba(255,165,0,0.2) 0%, transparent 70%)'
              } : undefined}
            />
          </VStack>
        </Box>

        {/* Additional Context */}
        <Text fontSize="xs" color="whiteAlpha.600" fontStyle="italic">
          {isSun 
            ? `The Sun is so massive that about 1.3 million Earths could fit inside it!`
            : (() => {
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
              })()
          }
        </Text>
      </VStack>
    </Box>
  )
} 

export default SizeComparison;
