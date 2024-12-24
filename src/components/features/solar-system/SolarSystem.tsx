import  { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { usePlanetStore } from '../../../store/planetStore'

import OrbitingBody from './components/OrbitingBody/OrbitingBody'
import PlanetInfo from '../../features/planet-info/PlanetInfo'

import Footer from './components/Footer/Footer'
import HelpModal from './components/HelpModal/HelpModal'
import WelcomeOverlay from './components/WelcomeOverlay/WelcomeOverlay'
import CelestialBody from './components/ClestialBody/CelestialBody'
import Controls from './components/Controls/Controls'
import EarthMoonSystem from './components/EarthMoonSystem/EarthMoonSystem'
import MarsMoonSystem from './components/MarsMoonSystem/MarsMoonSystem'

function SolarSystem() {
  const { sun, planets, moons, selectedPlanet, setSelectedPlanet } = usePlanetStore()
  const [containerSize, setContainerSize] = useState(1400)
  const [isPlaying, setIsPlaying] = useState(true)
  const [scale, setScale] = useState(1)
  const [speedMultiplier, setSpeedMultiplier] = useState(2)
  const [currentRotations, setCurrentRotations] = useState<{ [key: string]: number }>({})
  const [showWelcome, setShowWelcome] = useState(true)
  const [showHelp, setShowHelp] = useState(false)

  const handleZoomIn = () => setScale(prev => {
    const newScale = Math.min(prev + 0.2, 2)
    return Number(newScale.toFixed(1))
  })

  const handleZoomOut = () => setScale(prev => {
    const newScale = Math.max(prev - 0.2, 0.5)
    return Number(newScale.toFixed(1))
  })

  const handleSpeedUp = () => setSpeedMultiplier(prev => {
    const newSpeed = Math.min(prev + 1, 3)
    return Number(newSpeed.toFixed(0))
  })

  const handleSpeedDown = () => setSpeedMultiplier(prev => {
    const newSpeed = Math.max(prev - 1, 1)
    return Number(newSpeed.toFixed(0))
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const minSize = Math.min(width, height)
      
      if (width < 768) {
        setContainerSize(minSize * 1.2)
      } else if (width < 1024) {
        setContainerSize(minSize * 1.1)
      } else {
        setContainerSize(minSize * 1)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const earth = planets.find(p => p.id === 'earth')
  const mars = planets.find(p => p.id === 'mars')
  const marsMoons = moons.filter(m => m.id === 'phobos' || m.id === 'deimos')

  return (
    <Box
      w="100vw"
      h="100vh"
      bg="purple.900"
      position="relative"
      overflow="hidden"
      backgroundImage="radial-gradient(circle, #2D3748 2px, transparent 2px)"
      backgroundSize="50px 50px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        speedMultiplier={speedMultiplier}
        handleSpeedUp={handleSpeedUp}
        handleSpeedDown={handleSpeedDown}
        scale={scale}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        setShowHelp={setShowHelp}
      />

      <Box
        position="relative"
        width={`${containerSize}px`}
        height={`${containerSize}px`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          minWidth: `${containerSize}px`,
          minHeight: `${containerSize}px`,
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        overflow="visible"
      >
        <Box
          position="absolute"
          left="50%"
          top="50%"
          style={{
            transform: 'translate(-50%, -50%)',
            zIndex: 90,
          }}
        >
          <CelestialBody
            body={sun}
            onClick={() => setSelectedPlanet(sun)}
            isPlaying={isPlaying}
          />
        </Box>

        {planets
          .filter(planet => planet.id !== 'earth' && planet.id !== 'mars')
          .map((planet, index) => (
            <OrbitingBody
              key={planet.id}
              body={planet}
              isPlaying={isPlaying}
              speedMultiplier={speedMultiplier}
              currentRotations={currentRotations}
              setCurrentRotations={setCurrentRotations}
              onClick={() => setSelectedPlanet(planet)}
              zIndex={100 + index}
            />
          ))}

        {earth && (
          <EarthMoonSystem
            earth={earth}
            moon={moons[0]}
            isPlaying={isPlaying}
            speedMultiplier={speedMultiplier}
            currentRotations={currentRotations}
            setCurrentRotations={setCurrentRotations}
            onEarthClick={() => setSelectedPlanet(earth)}
            onMoonClick={() => setSelectedPlanet(moons[0])}
          />
        )}

        {mars && (
          <MarsMoonSystem
            mars={mars}
            moons={marsMoons}
            isPlaying={isPlaying}
            speedMultiplier={speedMultiplier}
            currentRotations={currentRotations}
            setCurrentRotations={setCurrentRotations}
            onMarsClick={() => setSelectedPlanet(mars)}
            onMoonClick={(moon) => setSelectedPlanet(moon)}
          />
        )}
      </Box>

      {selectedPlanet && <PlanetInfo />}
      <WelcomeOverlay showWelcome={showWelcome} />
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      {!selectedPlanet && <Footer />}
    </Box>
  )
} 

export default SolarSystem;