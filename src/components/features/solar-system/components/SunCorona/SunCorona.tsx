import { Box } from '@chakra-ui/react'

function SunCorona() {
  return (
    <Box
      position="absolute"
      inset="-40%"
      zIndex={-1}
      pointerEvents="none"
    >
      {/* Soft outer glow */}
      <Box
        position="absolute"
        inset="0"
        borderRadius="full"
        background="radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)"
        filter="blur(25px)"
        transform="scale(1.5)"
      />

      {/* Main glow */}
      <Box
        position="absolute"
        inset="-10%"
        borderRadius="full"
        background="radial-gradient(circle, rgba(255,200,0,0.3) 0%, rgba(255,170,0,0.2) 50%, transparent 70%)"
        filter="blur(15px)"
      />

      {/* Inner bright glow */}
      <Box
        position="absolute"
        inset="10%"
        borderRadius="full"
        background="radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)"
        filter="blur(8px)"
      />
    </Box>
  )
}

export default SunCorona 