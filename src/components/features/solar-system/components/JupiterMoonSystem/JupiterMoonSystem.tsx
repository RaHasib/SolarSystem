import { Box } from '@chakra-ui/react'
import { motion, ResolvedValues } from 'framer-motion'
import { Planet, Moon } from '../../../../../store/planetStore'
import CelestialBody from '../ClestialBody/CelestialBody'

interface JupiterMoonSystemProps {
  jupiter: Planet
  moons: Moon[]
  isPlaying: boolean
  speedMultiplier: number
  currentRotations: { [key: string]: number }
  setCurrentRotations: (fn: (prev: { [key: string]: number }) => { [key: string]: number }) => void
  onJupiterClick: () => void
  onMoonClick: (moon: Moon) => void
}

function JupiterMoonSystem({
  jupiter,
  moons,
  isPlaying,
  speedMultiplier,
  currentRotations,
  setCurrentRotations,
  onJupiterClick,
  onMoonClick
}: JupiterMoonSystemProps) {
  return (
    <Box
      position="absolute"
      left="50%"
      top="50%"
      width={`${Number(jupiter.orbitRadius) * 2}px`}
      height={`${Number(jupiter.orbitRadius) * 2}px`}
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
            currentRotations[jupiter.id] || 0,
            ((currentRotations[jupiter.id] || 0) + 360)
          ] : currentRotations[jupiter.id] || 0
        }}
        transition={{
          duration: Number(jupiter.rotationSpeed) / speedMultiplier,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear",
          repeatDelay: 0
        }}
        onUpdate={(latest: ResolvedValues) => {
          if (typeof latest.rotate === 'number') {
            const rotation = Math.round(latest.rotate);
            setCurrentRotations(prev => ({
              ...prev,
              [jupiter.id]: ((rotation % 360) + 360) % 360
            }));
          }
        }}
      >
        {/* Jupiter */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform={`translate(-50%, -50%) translateY(-${Number(jupiter.orbitRadius)}px)`}
          zIndex={150}
          pointerEvents="auto"
          onClick={onJupiterClick}
        >
          <CelestialBody
            body={jupiter}
            onClick={onJupiterClick}
            isPlaying={isPlaying}
          />

          {/* Moons */}
          {moons.map((moon) => (
            <Box
              key={moon.id}
              position="absolute"
              left="50%"
              top="50%"
              width={`${Number(moon.orbitRadius) * 2}px`}
              height={`${Number(moon.orbitRadius) * 2}px`}
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
                  duration: Number(moon.rotationSpeed) / speedMultiplier,
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
                  transform={`translate(-50%, -${Number(moon.size) / 2}px)`}
                  zIndex={160}
                  pointerEvents="auto"
                  onClick={() => onMoonClick(moon)}
                >
                  <CelestialBody
                    body={moon}
                    onClick={() => onMoonClick(moon)}
                    isPlaying={isPlaying}
                  />
                </Box>
              </motion.div>
            </Box>
          ))}
        </Box>
      </motion.div>
    </Box>
  )
}

export default JupiterMoonSystem; 