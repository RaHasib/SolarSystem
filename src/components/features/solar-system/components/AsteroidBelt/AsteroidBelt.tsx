import { Box } from '@chakra-ui/react'
import { motion, useAnimation, AnimationControls } from 'framer-motion'
import { useMemo, useEffect } from 'react'

interface AsteroidBeltProps {
  innerRadius: number
  outerRadius: number
  isPlaying: boolean
  speedMultiplier: number
}


function AsteroidBelt({
  innerRadius,
  outerRadius,
  isPlaying,
  speedMultiplier
}: AsteroidBeltProps) {
  const controls: AnimationControls = useAnimation()

  const beltRings = useMemo(() => {
    const rings = []
    const asteroidsPerRing = 15
    const ringRadii = [
      innerRadius + (outerRadius - innerRadius) * 0.25,
      innerRadius + (outerRadius - innerRadius) * 0.5,
      innerRadius + (outerRadius - innerRadius) * 0.75,
    ]
    
    for (let r = 0; r < 3; r++) {
      const asteroids = Array.from({ length: asteroidsPerRing }).map((_, i) => {
        const angle = (360 / asteroidsPerRing) * i + (r * 8)
        const size = 2 + (r * 0.5)
        
        return {
          id: `${r}-${i}`,
          angle,
          size,
          opacity: 0.4 + (r * 0.1),
          color: r === 1 ? '#FFD700' : '#FFFFFF'
        }
      })
      rings.push({
        radius: ringRadii[r],
        asteroids,
        speed: 90 - (r * 15)
      })
    }
    return rings
  }, [innerRadius, outerRadius])

  useEffect(() => {
    if (isPlaying) {
      beltRings.forEach((ring, index) => {
        controls.start({
          rotate: 360,
          transition: {
            duration: ring.speed / speedMultiplier,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0
          }
        }).catch(() => {})
      })
    } else {
      controls.stop()
    }
  }, [isPlaying, speedMultiplier, beltRings, controls])

  return (
    <Box
      position="absolute"
      left="50%"
      top="50%"
      width={`${outerRadius * 2}px`}
      height={`${outerRadius * 2}px`}
      transform="translate(-50%, -50%)"
      pointerEvents="none"
      zIndex={95}
    >
      {beltRings.map((ring, ringIndex) => (
        <motion.div
          key={`ring-${ringIndex}`}
          initial={{ rotate: 0 }}
          animate={controls}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transformOrigin: 'center'
          }}
        >
          {ring.asteroids.map((asteroid) => (
            <Box
              key={asteroid.id}
              position="absolute"
              width={`${asteroid.size}px`}
              height={`${asteroid.size}px`}
              borderRadius="50%"
              backgroundColor={asteroid.color}
              opacity={asteroid.opacity}
              left="50%"
              top="50%"
              transform={`translate(-50%, -50%) rotate(${asteroid.angle}deg) translateX(${ring.radius}px)`}
              boxShadow={`0 0 ${asteroid.size/2}px ${asteroid.color}`}
            />
          ))}
        </motion.div>
      ))}
    </Box>
  )
}

export default AsteroidBelt 