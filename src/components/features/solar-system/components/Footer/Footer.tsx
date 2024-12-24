import { Box, HStack, Link, Text } from '@chakra-ui/react'

function Footer() {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      p={3}
      bg="rgba(0, 0, 0, 0.3)"
      backdropFilter="blur(10px)"
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
      display="flex"
      justifyContent="center"
      alignItems="center"
      color="whiteAlpha.700"
      fontSize="sm"
      zIndex={1000}
      _hover={{ color: "whiteAlpha.900" }}
      transition="all 0.3s ease"
    >
      <HStack spacing={3} divider={<Box borderLeft="1px solid" borderColor="whiteAlpha.300" height="15px" />}>
        <Link
          href="https://www.raisulhasib.dev"
          isExternal
          _hover={{ color: "white", textDecoration: "none" }}
        >
          <Text>Developed with ❤️ by Raisul Amin Hasib</Text>
        </Link>
        <Text>© {new Date().getFullYear()}</Text>
      </HStack>
    </Box>
  )
} 

export default Footer;