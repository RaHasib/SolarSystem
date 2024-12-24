import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  VStack,
  Box,
  Text
} from '@chakra-ui/react'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

function HelpModal ({ isOpen, onClose }: HelpModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent 
        bg="rgba(23, 25, 35, 0.95)" 
        color="white"
        mx={4}
        borderWidth="1px"
        borderColor="whiteAlpha.200"
      >
        <ModalHeader borderBottomWidth="1px" borderColor="whiteAlpha.200">
          How to Use
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={6}>
          <VStack align="stretch" spacing={6}>
            <Box>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                Navigation
              </Text>
              <VStack align="stretch" spacing={2} pl={4}>
                <Text>• Click on any planet to view detailed information</Text>
                <Text>• Use the zoom controls to get a closer look</Text>
              </VStack>
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                Animation Controls
              </Text>
              <VStack align="stretch" spacing={2} pl={4}>
                <Text>• Play/Pause button stops all planetary motion</Text>
                <Text>• Speed controls adjust rotation speeds (1x-3x)</Text>
              </VStack>
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                Tips
              </Text>
              <VStack align="stretch" spacing={2} pl={4}>
                <Text>• Hover over planets to highlight them</Text>
                <Text>• Click the info card's close button to return to the view</Text>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter borderTopWidth="1px" borderColor="whiteAlpha.200">
          <Button 
            colorScheme="whiteAlpha" 
            onClick={onClose}
            _hover={{ bg: 'whiteAlpha.300' }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
} 

export default HelpModal;