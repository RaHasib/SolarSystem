import { VStack, HStack, Text, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { usePlanetStore, Stats as StatsType } from '../../../../../store/planetStore'

const MotionBox = motion(Box)

function Stats() {
  const { selectedPlanet, moons } = usePlanetStore()

  if (!selectedPlanet || !selectedPlanet.stats) return null

  const isMoon = moons.some(moon => moon.id === selectedPlanet.id)
  
  const getFormattedDistance = () => {
    const distance = selectedPlanet.stats.distanceFromSun
    if (!distance) return null

    if (isMoon) {
      return distance 
    }
    return distance 
  }

  const stats = selectedPlanet.stats as StatsType

  return (
    <MotionBox
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <VStack
        spacing={4}
        align="stretch"
        bg="whiteAlpha.100"
        p={4}
        borderRadius="lg"
        backdropFilter="blur(10px)"
      >
        <Text fontSize="xl" fontWeight="bold" color="white">
          Stats
        </Text>
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between">
            <Text color="gray.300">Temperature</Text>
            <Text color="white">{stats.temperature}</Text>
          </HStack>
          
          <HStack justify="space-between">
            <Text color="gray.300">Mass</Text>
            <Text color="white">{stats.mass}</Text>
          </HStack>
          
          <HStack justify="space-between">
            <Text color="gray.300">Diameter</Text>
            <Text color="white">{stats.diameter}</Text>
          </HStack>
          
          <HStack justify="space-between">
            <Text color="gray.300">Day Length</Text>
            <Text color="white">{stats.dayLength}</Text>
          </HStack>

          {stats.gravity && (
            <HStack justify="space-between">
              <Text color="gray.300">Gravity</Text>
              <Text color="white">{stats.gravity}</Text>
            </HStack>
          )}

          {stats.distanceFromSun && (
            <HStack justify="space-between">
              <Text color="gray.300">
                {isMoon ? 'Orbital Distance' : 'Distance from Sun'}
              </Text>
              <Text color="white">
                {getFormattedDistance()}
              </Text>
            </HStack>
          )}

          {stats.atmosphere && stats.atmosphere.length > 0 && (
            <VStack align="stretch" spacing={1}>
              <Text color="gray.300">Atmosphere</Text>
              <Box pl={4}>
                {stats.atmosphere.map((gas, index) => (
                  <Text key={index} color="white">• {gas}</Text>
                ))}
              </Box>
            </VStack>
          )}
        </VStack>
      </VStack>
    </MotionBox>
  )
}

export default Stats
