import { Box } from '@chakra-ui/react'
import { motion, ResolvedValues } from 'framer-motion'
import { Planet, Moon } from '../../../../../store/planetStore'
import CelestialBody from '../ClestialBody/CelestialBody'

interface UranusMoonSystemProps {
  uranus: Planet
  moons: Moon[]
  isPlaying: boolean
  speedMultiplier: number
  currentRotations: { [key: string]: number }
  setCurrentRotations: (fn: (prev: { [key: string]: number }) => { [key: string]: number }) => void
  onUranusClick: () => void
  onMoonClick: (moon: Moon) => void
}

function UranusMoonSystem({
  uranus,
  moons,
  isPlaying,
  speedMultiplier,
  currentRotations,
  setCurrentRotations,
  onUranusClick,
  onMoonClick
}: UranusMoonSystemProps) {
  return (
    <Box
      position="absolute"
      left="50%"
      top="50%"
      width={`${Number(uranus.orbitRadius) * 2}px`}
      height={`${Number(uranus.orbitRadius) * 2}px`}
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
            currentRotations[uranus.id] || 0,
            ((currentRotations[uranus.id] || 0) + 360)
          ] : currentRotations[uranus.id] || 0
        }}
        transition={{
          duration: Number(uranus.rotationSpeed) / speedMultiplier,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear",
          repeatDelay: 0
        }}
        onUpdate={(latest: ResolvedValues) => {
          if (typeof latest.rotate === 'number') {
            const rotation = Math.round(latest.rotate);
            setCurrentRotations(prev => ({
              ...prev,
              [uranus.id]: ((rotation % 360) + 360) % 360
            }));
          }
        }}
      >
        {/* Uranus */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform={`translate(-50%, -50%) translateY(-${Number(uranus.orbitRadius)}px)`}
          zIndex={150}
          pointerEvents="auto"
          onClick={onUranusClick}
        >
          {/* Uranus' Rings (very faint) */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            width={`${Number(uranus.size) * 2}px`}
            height={`${Number(uranus.size) * 0.6}px`}
            transform="translate(-50%, -50%)"
            borderRadius="50%"
            border="1px solid rgba(255,255,255,0.1)"
            transform-origin="center"
            style={{
              transform: "translate(-50%, -50%) rotate(98deg)", // Uranus' unique axial tilt
              background: "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)"
            }}
          />

          <CelestialBody
            body={uranus}
            onClick={onUranusClick}
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

export default UranusMoonSystem; 