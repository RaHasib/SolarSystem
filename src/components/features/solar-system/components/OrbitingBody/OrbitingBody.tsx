import { Box } from '@chakra-ui/react'
import { motion, ResolvedValues } from 'framer-motion'
import { Planet, Moon } from '../../../../../store/planetStore'
import CelestialBody from '../ClestialBody/CelestialBody'

interface OrbitingBodyProps {
  body: Planet | Moon
  isPlaying: boolean
  speedMultiplier: number
  currentRotations: { [key: string]: number }
  setCurrentRotations: (fn: (prev: { [key: string]: number }) => { [key: string]: number }) => void
  onClick: () => void
  zIndex?: number
}

function OrbitingBody ({
  body,
  isPlaying,
  speedMultiplier,
  currentRotations,
  setCurrentRotations,
  onClick,
  zIndex = 100
}: OrbitingBodyProps) {
  return (
    <Box
      position="absolute"
      left="50%"
      top="50%"
      width={`${body.orbitRadius * 2}px`}
      height={`${body.orbitRadius * 2}px`}
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
            currentRotations[body.id] || 0, 
            ((currentRotations[body.id] || 0) + 360)
          ] : currentRotations[body.id] || 0
        }}
        transition={{
          duration: body.rotationSpeed / speedMultiplier,
          repeat: isPlaying ? Infinity : 0,
          ease: "linear",
          repeatDelay: 0
        }}
        onUpdate={(latest: ResolvedValues) => {
          if (typeof latest.rotate === 'number') {
            const rotation = Math.round(latest.rotate);
            setCurrentRotations(prev => ({
              ...prev,
              [body.id]: ((rotation % 360) + 360) % 360
            }));
          }
        }}
      >
        <Box
          position="absolute"
          top="0"
          left="50%"
          transform={`translate(-50%, -${body.size / 2}px)`}
          zIndex={zIndex}
          pointerEvents="auto"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <CelestialBody
            body={body}
            onClick={onClick}
            isPlaying={isPlaying}
          />
        </Box>
      </motion.div>
    </Box>
  )
} 

export default OrbitingBody;