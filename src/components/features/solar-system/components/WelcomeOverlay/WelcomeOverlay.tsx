import { Box, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'

interface WelcomeOverlayProps {
  showWelcome: boolean
}

function WelcomeOverlay ({ showWelcome }: WelcomeOverlayProps) {
  if (!showWelcome) return null

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={2000}
      bg="rgba(0, 0, 0, 0.3)"
    >
      <motion.div
        style={{
          width: "90%",
          maxWidth: "600px",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "2rem",
          textAlign: "center",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
          type: "spring",
          damping: 20,
          stiffness: 100
        }}
      >
        <VStack spacing={4}>
          <Text
            fontSize={["2xl", "3xl", "4xl"]}
            fontWeight="bold"
            bgGradient="linear(to-r, blue.400, purple.500, pink.400)"
            bgClip="text"
            letterSpacing="tight"
            textShadow="0 0 20px rgba(255,255,255,0.1)"
          >
            Welcome to Our Solar System
          </Text>
          <Text 
            color="whiteAlpha.900" 
            fontSize={["sm", "md"]}
            maxWidth="400px"
            lineHeight="tall"
            letterSpacing="wide"
          >
            Embark on a journey through space and discover the wonders of our cosmic neighborhood
          </Text>
          <Text
            color="whiteAlpha.800"
            fontSize="sm"
            fontStyle="italic"
          >
            Click on any planet to learn more
          </Text>
        </VStack>
      </motion.div>
    </Box>
  )
} 

export default WelcomeOverlay;