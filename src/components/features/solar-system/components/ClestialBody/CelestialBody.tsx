import { motion } from 'framer-motion'
import { createElement } from 'react'
import { IconContext } from 'react-icons'
import { Sun, Planet, Moon } from '../../../../../store/planetStore'

interface CelestialBodyProps {
  body: Sun | Planet | Moon
  onClick: () => void
  isPlaying: boolean
  size?: number
}

function CelestialBody ({ body, onClick, isPlaying, size }: CelestialBodyProps) {
  const isSun = 'type' in body && body.type === 'sun'

  return (
    <motion.div
      style={{
        width: `${size || body.size}px`,
        height: `${size || body.size}px`,
        borderRadius: '50%',
        background: body.gradient,
        boxShadow: isSun ? '0 0 50px #FFA500' : '0 0 15px rgba(255,255,255,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      animate={isSun && isPlaying ? 
        { scale: [1, 1.05, 1] } : 
        { scale: 1 }
      }
      transition={{
        duration: 4,
        repeat: isPlaying && isSun ? Infinity : 0,
        ease: "easeInOut",
        repeatType: "reverse"
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: isSun ? '0 0 70px #FFA500' : '0 0 30px rgba(255,255,255,0.8)',
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }}
    >
      <IconContext.Provider value={{ 
        color: 'white', 
        size: `${(size || body.size) / 2}px`,
        style: { pointerEvents: 'none' }
      }}>
        {createElement(body.icon)}
      </IconContext.Provider>
    </motion.div>
  )
} 

export default CelestialBody;