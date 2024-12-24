import { Box, VStack, Button, useColorModeValue, Divider } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePlanetStore } from '../../../store/planetStore'
import { FaTimes } from 'react-icons/fa'
import Header  from './components/Header/Header'
import Stats from './components/Stats/Stats'
import SizeComparison from './components/SizeComparison/SizeComparison'
import Facts from './components/Facts/Facts'
import  ExplorationStatus from './components/ExplorationStatus/ExplorationStatus'
import DidYouKnow from './components/DidYouKnow/DidYouKnow'

const MotionBox = motion(Box)

function PlanetInfo () {
  const { selectedPlanet, setSelectedPlanet } = usePlanetStore()
  const bgGradient = useColorModeValue(
    'linear(to-b, rgba(44, 52, 75, 0.97), rgba(26, 32, 44, 0.97))',
    'linear(to-b, rgba(26, 32, 44, 0.97), rgba(17, 19, 23, 0.97))'
  )

  if (!selectedPlanet) return null

  return (
    <AnimatePresence>
      <MotionBox
        position="fixed"
        right="0"
        top={['0', '0', '0']}
        w={['100%', '100%', '500px']}
        h={['100vh', '100vh', '100vh']}
        transform={['none', 'none', 'none']}
        bgGradient={bgGradient}
        backdropFilter="blur(10px)"
        p={[4, 6, 8]}
        color="white"
        boxShadow="-4px 0 25px rgba(0,0,0,0.3)"
        overflowY="auto"
        zIndex={1000}
        borderLeftWidth="1px"
        borderColor="whiteAlpha.200"
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
            borderRadius: '8px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          },
        }}
      >
        <VStack spacing={6} align="stretch">
          {/* Close Button */}
          <Box position="absolute" right="4" top="4">
            <Button
              size="sm"
              variant="ghost"
              color="whiteAlpha.700"
              onClick={() => setSelectedPlanet(null)}
              _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
              leftIcon={<FaTimes />}
            >
              Close
            </Button>
          </Box>

          <Header />
          <Divider borderColor="whiteAlpha.300" />
          <Stats />
          {selectedPlanet.id !== 'earth' && <SizeComparison />}
          <Divider borderColor="whiteAlpha.300" />
          <Facts />
          <DidYouKnow />
          <ExplorationStatus />
        </VStack>
      </MotionBox>
    </AnimatePresence>
  )
} 

export default PlanetInfo;
