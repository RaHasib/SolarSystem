import { Box, VStack, Text, HStack, Grid, Tooltip, Stat, StatLabel, StatNumber } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaThermometerHalf, FaWeight, FaRuler, FaClock } from 'react-icons/fa'
import { usePlanetStore, Planet, Sun, Moon } from '../../../../../store/planetStore'

const MotionBox = motion(Box)

function Stats () {
  const { selectedPlanet } = usePlanetStore()

  if (!selectedPlanet) return null

  const celestialBody = selectedPlanet as Planet | Sun | Moon

  return (
    <MotionBox
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <VStack spacing={4} align="stretch">
        <HStack spacing={2} px={4}>
          <Text fontSize="xl" fontWeight="bold">
            📊
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            Quick Stats
          </Text>
        </HStack>

        <Grid templateColumns="repeat(2, 1fr)" gap={4} p={4}>
          <Tooltip label="Average Temperature" placement="top">
            <Stat
              bg="whiteAlpha.100"
              p={3}
              borderRadius="xl"
              _hover={{ bg: 'whiteAlpha.200' }}
              transition="all 0.2s"
            >
              <HStack spacing={2}>
                <FaThermometerHalf />
                <StatLabel>Temperature</StatLabel>
              </HStack>
              <StatNumber fontSize="md" mt={1}>
                {'stats' in celestialBody ? celestialBody.stats?.temperature || 'N/A' : 'N/A'}
              </StatNumber>
            </Stat>
          </Tooltip>

          <Tooltip label="Planet Mass" placement="top">
            <Stat
              bg="whiteAlpha.100"
              p={3}
              borderRadius="xl"
              _hover={{ bg: 'whiteAlpha.200' }}
              transition="all 0.2s"
            >
              <HStack spacing={2}>
                <FaWeight />
                <StatLabel>Mass</StatLabel>
              </HStack>
              <StatNumber fontSize="md" mt={1}>
                {'stats' in celestialBody ? celestialBody.stats?.mass || 'N/A' : 'N/A'}
              </StatNumber>
            </Stat>
          </Tooltip>

          <Tooltip label="Planet Diameter" placement="top">
            <Stat
              bg="whiteAlpha.100"
              p={3}
              borderRadius="xl"
              _hover={{ bg: 'whiteAlpha.200' }}
              transition="all 0.2s"
            >
              <HStack spacing={2}>
                <FaRuler />
                <StatLabel>Diameter</StatLabel>
              </HStack>
              <StatNumber fontSize="md" mt={1}>
                {'stats' in celestialBody ? celestialBody.stats?.diameter || 'N/A' : 'N/A'}
              </StatNumber>
            </Stat>
          </Tooltip>

          <Tooltip label="Length of Day" placement="top">
            <Stat
              bg="whiteAlpha.100"
              p={3}
              borderRadius="xl"
              _hover={{ bg: 'whiteAlpha.200' }}
              transition="all 0.2s"
            >
              <HStack spacing={2}>
                <FaClock />
                <StatLabel>Day Length</StatLabel>
              </HStack>
              <StatNumber fontSize="md" mt={1}>
                {'stats' in celestialBody ? celestialBody.stats?.dayLength || 'N/A' : 'N/A'}
              </StatNumber>
            </Stat>
          </Tooltip>
        </Grid>
      </VStack>
    </MotionBox>
  )
} 

export default Stats;
