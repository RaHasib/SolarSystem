import { Box } from '@chakra-ui/react'
import { motion, ResolvedValues } from 'framer-motion'
import { Planet, Moon } from '../../../../../store/planetStore'
import CelestialBody from '../ClestialBody/CelestialBody'

interface EarthMoonSystemProps {
  earth: Planet
  moon: Moon
  isPlaying: boolean
  speedMultiplier: number
  currentRotations: { [key: string]: number }
  setCurrentRotations: (fn: (prev: { [key: string]: number }) => { [key: string]: number }) => void
  onEarthClick: () => void
  onMoonClick: () => void
}

function EarthMoonSystem ({
  earth,
  moon,
  isPlaying,
  speedMultiplier,
  currentRotations,
  setCurrentRotations,
  onEarthClick,
  onMoonClick
}: EarthMoonSystemProps) {
  return (
    <Box
      position="absolute"
      left="50%"
      top="50%"
      width={`${earth.orbitRadius * 2}px`}
      height={`${earth.orbitRadius * 2}px`}
      transform="translate(-50%, -50%)"
      borderRadius="50%"
      border="1px dashed rgba(255,255,255,0.2)"
      pointerEvents="none"
    >
      <motion.div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transformOrigin: 'center',
        }}
        animate={{
          rotate: isPlaying ? [
            currentRotations[earth.id] || 0, 
            ((currentRotations[earth.id] || 0) + 360)
          ] : currentRotations[earth.id] || 0
        }}
        transition={{
          duration: earth.rotationSpeed / speedMultiplier,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear",
          repeatDelay: 0
        }}
        onUpdate={(latest: ResolvedValues) => {
          if (typeof latest.rotate === 'number') {
            const rotation = Math.round(latest.rotate);
            setCurrentRotations(prev => ({
              ...prev,
              [earth.id]: ((rotation % 360) + 360) % 360
            }));
          }
        }}
      >
        {/* Earth */}
        <Box
          position="absolute"
          top="0"
          left="50%"
          transform={`translate(-50%, -${earth.size / 2}px)`}
          zIndex={130}
          pointerEvents="auto"
          onClick={(e) => {
            e.stopPropagation();
            onEarthClick();
          }}
        >
          <CelestialBody
            body={earth}
            onClick={onEarthClick}
            isPlaying={isPlaying}
          />

          {/* Moon's Orbit */}
          <Box
            position="absolute"
            left="50%"
            top="50%"
            width={`${moon.orbitRadius * 2}px`}
            height={`${moon.orbitRadius * 2}px`}
            transform="translate(-50%, -50%)"
            borderRadius="50%"
            border="1px dashed rgba(255,255,255,0.2)"
            pointerEvents="none"
          >
            <motion.div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                transformOrigin: 'center',
              }}
              animate={{
                rotate: isPlaying ? [
                  currentRotations[moon.id] || 0, 
                  ((currentRotations[moon.id] || 0) + 360)
                ] : currentRotations[moon.id] || 0
              }}
              transition={{
                duration: moon.rotationSpeed / speedMultiplier,
                repeat: isPlaying ? Infinity : 0,
                ease: "linear",
                repeatDelay: 0
              }}
              onUpdate={(latest: ResolvedValues) => {
                if (typeof latest.rotate === 'number') {
                  const rotation = Math.round(latest.rotate);
                  setCurrentRotations(prev => ({
                    ...prev,
                    [moon.id]: ((rotation % 360) + 360) % 360
                  }));
                }
              }}
            >
              <Box
                position="absolute"
                top="0"
                left="50%"
                transform={`translate(-50%, -${moon.size / 2}px)`}
                zIndex={140}
                pointerEvents="auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onMoonClick();
                }}
              >
                <CelestialBody
                  body={moon}
                  onClick={onMoonClick}
                  isPlaying={isPlaying}
                />
              </Box>
            </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Box>
  )
} 

export default EarthMoonSystem;