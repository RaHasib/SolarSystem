import { VStack, HStack, Text, IconButton, Tooltip } from '@chakra-ui/react'
import { FaPlay, FaPause, FaPlus, FaMinus, FaQuestion } from 'react-icons/fa'

interface ControlsProps {
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  speedMultiplier: number
  handleSpeedUp: () => void
  handleSpeedDown: () => void
  scale: number
  handleZoomIn: () => void
  handleZoomOut: () => void
  setShowHelp: (show: boolean) => void
}

function Controls ({
  isPlaying,
  setIsPlaying,
  speedMultiplier,
  handleSpeedUp,
  handleSpeedDown,
  scale,
  handleZoomIn,
  handleZoomOut,
  setShowHelp
}: ControlsProps) {
  return (
    <VStack
      position="fixed"
      left="4"
      top="50%"
      transform="translateY(-50%)"
      spacing={4}
      zIndex={1000}
    >
      <IconButton
        aria-label={isPlaying ? 'Pause' : 'Play'}
        icon={isPlaying ? <FaPause /> : <FaPlay />}
        onClick={() => setIsPlaying(!isPlaying)}
        colorScheme="whiteAlpha"
        size="lg"
        borderRadius="full"
        _hover={{ transform: 'scale(1.1)' }}
      />
      <VStack>
        <Text color="white" fontSize="sm" fontWeight="bold">
          Speed: {speedMultiplier}x
        </Text>
        <HStack>
          <IconButton
            aria-label="Decrease Speed"
            icon={<FaMinus />}
            onClick={handleSpeedDown}
            colorScheme="whiteAlpha"
            size="lg"
            borderRadius="full"
            _hover={{ transform: 'scale(1.1)' }}
            isDisabled={speedMultiplier <= 1}
          />
          <IconButton
            aria-label="Increase Speed"
            icon={<FaPlus />}
            onClick={handleSpeedUp}
            colorScheme="whiteAlpha"
            size="lg"
            borderRadius="full"
            _hover={{ transform: 'scale(1.1)' }}
            isDisabled={speedMultiplier >= 3}
          />
        </HStack>
      </VStack>
      <VStack>
        <Text color="white" fontSize="sm" fontWeight="bold">
          Zoom: {(scale * 100).toFixed(0)}%
        </Text>
        <HStack>
          <IconButton
            aria-label="Zoom Out"
            icon={<FaMinus />}
            onClick={handleZoomOut}
            colorScheme="whiteAlpha"
            size="lg"
            borderRadius="full"
            _hover={{ transform: 'scale(1.1)' }}
            isDisabled={scale <= 0.3}
          />
          <IconButton
            aria-label="Zoom In"
            icon={<FaPlus />}
            onClick={handleZoomIn}
            colorScheme="whiteAlpha"
            size="lg"
            borderRadius="full"
            _hover={{ transform: 'scale(1.1)' }}
            isDisabled={scale >= 2}
          />
        </HStack>
      </VStack>
      <Tooltip label="How to use" placement="right">
        <IconButton
          aria-label="Help"
          icon={<FaQuestion />}
          onClick={() => setShowHelp(true)}
          colorScheme="whiteAlpha"
          size="lg"
          borderRadius="full"
          _hover={{ transform: 'scale(1.1)' }}
        />
      </Tooltip>
    </VStack>
  )
} 

export default Controls;