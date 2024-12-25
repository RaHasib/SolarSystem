import { Box } from '@chakra-ui/react'
import { useMemo } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  delay: number
}

function StarField() {
  const stars = useMemo(() => {
    const newStars: Star[] = []
    for (let i = 0; i < 50; i++) {
      newStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() < 0.8 ? 1 : 2,
        opacity: Math.random() * 0.3 + 0.2,
        delay: Math.random() * 4
      })
    }
    return newStars
  }, [])

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex={0}
      overflow="hidden"
      pointerEvents="none"
    >
      {stars.map((star, index) => (
        <Box
          key={index}
          position="absolute"
          left={`${star.x}%`}
          top={`${star.y}%`}
          width={`${star.size}px`}
          height={`${star.size}px`}
          borderRadius="full"
          bg="white"
          opacity={star.opacity}
          animation={`twinkle ${3 + star.delay}s infinite`}
          sx={{
            '@keyframes twinkle': {
              '0%, 100%': { opacity: star.opacity },
              '50%': { opacity: star.opacity * 0.4 }
            }
          }}
        />
      ))}
    </Box>
  )
}

export default StarField 