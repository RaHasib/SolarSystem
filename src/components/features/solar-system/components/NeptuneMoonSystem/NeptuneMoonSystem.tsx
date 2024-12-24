import { Box } from '@chakra-ui/react'
import { motion, ResolvedValues } from 'framer-motion'
import { Planet, Moon } from '../../../../../store/planetStore'
import CelestialBody from '../ClestialBody/CelestialBody'

interface NeptuneMoonSystemProps {
  neptune: Planet
  moons: Moon[]
  isPlaying: boolean
  speedMultiplier: number
  currentRotations: { [key: string]: number }
  setCurrentRotations: (fn: (prev: { [key: string]: number }) => { [key: string]: number }) => void
  onNeptuneClick: () => void
  onMoonClick: (moon: Moon) => void
}

function NeptuneMoonSystem({
  neptune,
  moons,
  isPlaying,
  speedMultiplier,
  currentRotations,
  setCurrentRotations,
  onNeptuneClick,
  onMoonClick
}: NeptuneMoonSystemProps) {
  return (
    <Box
      position="absolute"
      left="50%"
      top="50%"
      width={`${Number(neptune.orbitRadius) * 2}px`}
      height={`${Number(neptune.orbitRadius) * 2}px`}
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
            currentRotations[neptune.id] || 0,
            ((currentRotations[neptune.id] || 0) + 360)
          ] : currentRotations[neptune.id] || 0
        }}
        transition={{
          duration: Number(neptune.rotationSpeed) / speedMultiplier,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear",
          repeatDelay: 0
        }}
        onUpdate={(latest: ResolvedValues) => {
          if (typeof latest.rotate === 'number') {
            const rotation = Math.round(latest.rotate);
            setCurrentRotations(prev => ({
              ...prev,
              [neptune.id]: ((rotation % 360) + 360) % 360
            }));
          }
        }}
      >
        {/* Neptune */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform={`translate(-50%, -50%) translateY(-${Number(neptune.orbitRadius)}px)`}
          zIndex={150}
          pointerEvents="auto"
          onClick={onNeptuneClick}
        >
          {/* Neptune's faint rings */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            width={`${Number(neptune.size) * 1.8}px`}
            height={`${Number(neptune.size) * 0.4}px`}
            transform="translate(-50%, -50%)"
            borderRadius="50%"
            border="1px solid rgba(255,255,255,0.1)"
            transform-origin="center"
            style={{
              transform: "translate(-50%, -50%) rotate(-5deg)",
              background: "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.05) 100%)"
            }}
          />

          <CelestialBody
            body={neptune}
            onClick={onNeptuneClick}
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
                    // Triton orbits in the opposite direction
                    ((currentRotations[moon.id] || 0) + (moon.id === 'triton' ? -360 : 360))
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

export default NeptuneMoonSystem; 