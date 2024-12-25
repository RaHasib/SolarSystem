import { Box } from '@chakra-ui/react'
import { motion, ResolvedValues } from 'framer-motion'
import { Planet, Moon } from '../../../../../../store/planetStore'
import CelestialBody from '../../ClestialBody/CelestialBody'

interface SaturnMoonSystemProps {
  saturn: Planet
  moons: Moon[]
  isPlaying: boolean
  speedMultiplier: number
  currentRotations: { [key: string]: number }
  setCurrentRotations: (fn: (prev: { [key: string]: number }) => { [key: string]: number }) => void
  onSaturnClick: () => void
  onMoonClick: (moon: Moon) => void
}

function SaturnMoonSystem({
  saturn,
  moons,
  isPlaying,
  speedMultiplier,
  currentRotations,
  setCurrentRotations,
  onSaturnClick,
  onMoonClick
}: SaturnMoonSystemProps) {
  return (
    <Box
      position="absolute"
      left="50%"
      top="50%"
      width={`${Number(saturn.orbitRadius) * 2}px`}
      height={`${Number(saturn.orbitRadius) * 2}px`}
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
            currentRotations[saturn.id] || 0,
            ((currentRotations[saturn.id] || 0) + 360)
          ] : currentRotations[saturn.id] || 0
        }}
        transition={{
          duration: Number(saturn.rotationSpeed) / speedMultiplier,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear",
          repeatDelay: 0
        }}
        onUpdate={(latest: ResolvedValues) => {
          if (typeof latest.rotate === 'number') {
            const rotation = Math.round(latest.rotate);
            setCurrentRotations(prev => ({
              ...prev,
              [saturn.id]: ((rotation % 360) + 360) % 360
            }));
          }
        }}
      >
        {/* Saturn with Rings */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform={`translate(-50%, -50%) translateY(-${Number(saturn.orbitRadius)}px)`}
          zIndex={150}
          pointerEvents="auto"
          onClick={onSaturnClick}
        >
          {/* Saturn's Rings */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            width={`${Number(saturn.size) * 2.5}px`}
            height={`${Number(saturn.size) * 0.8}px`}
            transform="translate(-50%, -50%)"
            borderRadius="50%"
            border="2px solid rgba(255,255,255,0.3)"
            transform-origin="center"
            style={{
              transform: "translate(-50%, -50%) rotate(-20deg)",
              background: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)"
            }}
          />
          
          <CelestialBody
            body={saturn}
            onClick={onSaturnClick}
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

export default SaturnMoonSystem; 