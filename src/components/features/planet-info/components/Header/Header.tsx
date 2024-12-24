import { Box, VStack, Text, Badge } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { createElement } from 'react'
import { IconContext } from 'react-icons'
import { usePlanetStore, Planet, Sun, Moon } from '../../../../../store/planetStore'

const MotionBox = motion(Box)

function Header () {
  const { selectedPlanet, moons } = usePlanetStore()

  if (!selectedPlanet) return null

  const celestialBody = selectedPlanet as Planet | Sun | Moon
  
  const isMoon = moons.some(moon => moon.id === celestialBody.id)

  return (
    <MotionBox 
      display="flex" 
      alignItems="center" 
      gap={4}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Box
        p={4}
        borderRadius="full"
        bg="whiteAlpha.100"
        boxShadow="0 0 20px rgba(255,255,255,0.1)"
        position="relative"
        minWidth="68px"
        minHeight="68px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        _after={{
          content: '""',
          position: 'absolute',
          inset: '-1px',
          borderRadius: 'full',
          padding: '1px',
          background: celestialBody.gradient,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      >
        <IconContext.Provider 
          value={{ 
            size: '40px',
            style: { 
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
              display: 'block',
              margin: 'auto'
            }
          }}
        >
          {createElement(celestialBody.icon)}
        </IconContext.Provider>
      </Box>
      <VStack align="flex-start" spacing={1}>
        <Text fontSize="2xl" fontWeight="bold">
          {celestialBody.name}
        </Text>
        <Badge
          colorScheme="purple"
          px={2}
          py={1}
          borderRadius="full"
          textTransform="none"
        >
          {celestialBody.id === 'sun' ? 'Star' : 
           isMoon ? 'Natural Satellite' : 
           'Planet'}
        </Badge>
      </VStack>
    </MotionBox>
  )
} 

export default Header;
