import { VStack, Text, HStack, List, ListItem } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { usePlanetStore } from '../../../../../store/planetStore'
import { Planet, Sun, Moon } from '../../../../../store/planetStore'

const MotionListItem = motion(ListItem)

function Facts () {
  const { selectedPlanet } = usePlanetStore()

  if (!selectedPlanet) return null

  return (
    <VStack align="stretch" spacing={4}>
      <HStack spacing={2} px={4}>
        <Text fontSize="xl" fontWeight="bold">
          ✨
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          Cool Facts
        </Text>
      </HStack>
      <List spacing={3}>
        {(selectedPlanet as Planet | Sun | Moon).facts?.map((fact, index) => (
          <MotionListItem
            key={index}
            p={4}
            bg="whiteAlpha.100"
            borderRadius="xl"
            position="relative"
            overflow="hidden"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            _hover={{
              bg: 'whiteAlpha.200',
              transform: 'translateX(8px)',
            }}
            style={{ transition: 'all 0.2s ease-in-out' }}
            _after={{
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              width: '4px',
              height: '100%',
              background: selectedPlanet.gradient,
              opacity: 0.7,
            }}
          >
            {fact}
          </MotionListItem>
        ))}
      </List>
    </VStack>
  )
}

export default Facts;
